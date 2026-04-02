use std::sync::{
    atomic::{AtomicBool, Ordering},
    Arc,
};
use std::time::Duration;

use enigo::{Axis, Button, Coordinate, Direction, Mouse};
use serde::Deserialize;
use tauri::{Emitter, Manager};
use tungstenite::Message as WsMessage;

struct ExitFlag(Arc<AtomicBool>);
struct ControlEnabled(Arc<AtomicBool>);

#[derive(Debug, Deserialize)]
struct BackendClickData {
    #[serde(rename = "type")]
    button: BackendButton,
    #[serde(rename = "pressQty")]
    press_qty: u32,
}

#[derive(Debug, Deserialize)]
#[serde(rename_all = "lowercase")]
enum BackendButton {
    Left,
    Right,
}

#[derive(Debug, Deserialize)]
struct BackendScrollData {
    y: f64,
}

#[derive(Debug, Deserialize)]
struct BackendMoveData {
    x: f64,
    y: f64,
}

#[derive(Debug, Deserialize)]
#[serde(tag = "type", content = "data")]
enum BackendMessage {
    #[serde(rename = "click")]
    Click(BackendClickData),
    #[serde(rename = "right-click")]
    RightClick(BackendClickData),
    #[serde(rename = "scroll")]
    Scroll(BackendScrollData),
    #[serde(rename = "move")]
    Move(BackendMoveData),
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let app = tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet])
        .setup(|app| {
            let exit = Arc::new(AtomicBool::new(false));
            app.manage(ExitFlag(exit.clone()));
            let enabled = Arc::new(AtomicBool::new(false));
            app.manage(ControlEnabled(enabled.clone()));

            #[cfg(target_os = "macos")]
            {
                app.set_activation_policy(tauri::ActivationPolicy::Accessory);
            }

            let enabled_for_keyboard = enabled.clone();
            std::thread::spawn(move || {
                let mut enigo = match enigo::Enigo::new(&enigo::Settings::default()) {
                    Ok(enigo) => enigo,
                    Err(_) => return,
                };

                let step: i32 = 20;

                let _ = rdev::listen(move |event| {
                    if !enabled_for_keyboard.load(Ordering::Relaxed) {
                        return;
                    }

                    let rdev::EventType::KeyPress(key) = event.event_type else {
                        return;
                    };

                    match key {
                        rdev::Key::UpArrow => {
                            let _ = enigo.move_mouse(0, -step, enigo::Coordinate::Rel);
                        }
                        rdev::Key::DownArrow => {
                            let _ = enigo.move_mouse(0, step, enigo::Coordinate::Rel);
                        }
                        rdev::Key::LeftArrow => {
                            let _ = enigo.move_mouse(-step, 0, enigo::Coordinate::Rel);
                        }
                        rdev::Key::RightArrow => {
                            let _ = enigo.move_mouse(step, 0, enigo::Coordinate::Rel);
                        }
                        _ => {}
                    }
                });
            });

            let enabled_for_ws = enabled.clone();
            let exit_for_ws = exit.clone();
            std::thread::spawn(move || {
                let mut enigo = match enigo::Enigo::new(&enigo::Settings::default()) {
                    Ok(enigo) => enigo,
                    Err(_) => return,
                };

                let ws_url = std::env::var("VIRTUALMOUSE_WS_URL")
                    // wss://virtual-mouse-269q.onrender.com/host
                    .unwrap_or_else(|_| "wss://virtual-mouse-269q.onrender.com/host".to_string());

                loop {
                    if exit_for_ws.load(Ordering::SeqCst) {
                        return;
                    }

                    eprintln!("connecting to ws: {}", ws_url);
                    let (mut socket, _) = match tungstenite::connect(ws_url.as_str()) {
                        Ok(value) => value,
                        Err(err) => {
                            eprintln!("ws connect error: {err}");
                            std::thread::sleep(Duration::from_secs(1));
                            continue;
                        }
                    };
                    eprintln!("ws connected");

                    loop {
                        if exit_for_ws.load(Ordering::SeqCst) {
                            let _ = socket.close(None);
                            return;
                        }

                        let message = match socket.read() {
                            Ok(message) => message,
                            Err(err) => {
                                eprintln!("ws read error: {err}");
                                break;
                            }
                        };

                        println!("{:?}", message);

                        match message {
                            WsMessage::Ping(payload) => {
                                let _ = socket.send(WsMessage::Pong(payload));
                            }
                            WsMessage::Text(text) => {
                                if !enabled_for_ws.load(Ordering::Relaxed) {
                                    continue;
                                }

                                let parsed: BackendMessage = match serde_json::from_str(&text) {
                                    Ok(parsed) => parsed,
                                    Err(_) => continue,
                                };

                                handle_backend_message(&mut enigo, parsed);
                            }
                            WsMessage::Binary(bytes) => {
                                if !enabled_for_ws.load(Ordering::Relaxed) {
                                    continue;
                                }

                                let text = match String::from_utf8(bytes) {
                                    Ok(text) => text,
                                    Err(_) => continue,
                                };

                                let parsed: BackendMessage = match serde_json::from_str(&text) {
                                    Ok(parsed) => parsed,
                                    Err(_) => continue,
                                };

                                handle_backend_message(&mut enigo, parsed);
                            }
                            WsMessage::Close(_) => break,
                            _ => {}
                        }
                    }

                    std::thread::sleep(Duration::from_millis(500));
                }
            });

            let start = tauri::menu::MenuItemBuilder::new("Start")
                .id("start")
                .build(app)?;
            let stop = tauri::menu::MenuItemBuilder::new("Stop")
                .id("stop")
                .build(app)?;
            let quit = tauri::menu::MenuItemBuilder::new("Quit")
                .id("quit")
                .build(app)?;

            let menu = tauri::menu::MenuBuilder::new(app)
                .item(&start)
                .item(&stop)
                .separator()
                .item(&quit)
                .build()?;

            let _tray = tauri::tray::TrayIconBuilder::with_id("tray")
                .icon(tauri::image::Image::from_bytes(include_bytes!(
                    "../icons/icon.png"
                ))?)
                .menu(&menu)
                .menu_on_left_click(true)
                .on_menu_event(|app, event| match event.id.as_ref() {
                    "start" => {
                        app.state::<ControlEnabled>()
                            .0
                            .store(true, Ordering::SeqCst);
                        let _ = app.emit("tray://start", ());
                    }
                    "stop" => {
                        app.state::<ControlEnabled>()
                            .0
                            .store(false, Ordering::SeqCst);
                        let _ = app.emit("tray://stop", ());
                    }
                    "quit" => {
                        app.state::<ExitFlag>().0.store(true, Ordering::SeqCst);
                        app.exit(0);
                    }
                    _ => {}
                })
                .build(app)?;

            Ok(())
        })
        .build(tauri::generate_context!())
        .expect("error while running tauri application");

    app.run(|app, event| {
        if let tauri::RunEvent::ExitRequested { api, .. } = event {
            if !app.state::<ExitFlag>().0.load(Ordering::SeqCst) {
                api.prevent_exit();
            }
        }
    });
}

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {name}!")
}

fn handle_backend_message(enigo: &mut enigo::Enigo, message: BackendMessage) {
    match message {
        BackendMessage::Move(data) => {
            let x = data.x.round().clamp(i32::MIN as f64, i32::MAX as f64) as i32;
            let y = data.y.round().clamp(i32::MIN as f64, i32::MAX as f64) as i32;
            if let Err(err) = enigo.move_mouse(x, y, Coordinate::Rel) {
                eprintln!("move_mouse rel error: {err}");
                if let Err(err) = enigo.move_mouse(x, y, Coordinate::Abs) {
                    eprintln!("move_mouse abs error: {err}");
                }
            }
        }
        BackendMessage::Scroll(data) => {
            let y = data.y.round().clamp(i32::MIN as f64, i32::MAX as f64) as i32;
            if let Err(err) = enigo.scroll(y, Axis::Vertical) {
                eprintln!("scroll error: {err}");
            }
        }
        BackendMessage::Click(data) => {
            let button = match data.button {
                BackendButton::Left => Button::Left,
                BackendButton::Right => Button::Right,
            };
            click_n(enigo, button, data.press_qty);
        }
        BackendMessage::RightClick(data) => {
            click_n(enigo, Button::Right, data.press_qty);
        }
    }
}

fn click_n(enigo: &mut enigo::Enigo, button: Button, press_qty: u32) {
    let press_qty = press_qty.min(50);
    for _ in 0..press_qty {
        if let Err(err) = enigo.button(button, Direction::Click) {
            eprintln!("button click error: {err}");
        }
    }
}

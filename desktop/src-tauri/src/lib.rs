use std::sync::atomic::{AtomicBool, Ordering};

use tauri::{Emitter, Manager};

struct ExitFlag(AtomicBool);

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let app = tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet])
        .setup(|app| {
            app.manage(ExitFlag(AtomicBool::new(false)));

            #[cfg(target_os = "macos")]
            {
                app.set_activation_policy(tauri::ActivationPolicy::Accessory);
            }

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
                        let _ = app.emit("tray://start", ());
                    }
                    "stop" => {
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

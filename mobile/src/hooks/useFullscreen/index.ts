import { useState, useEffect, useCallback, useRef } from "react";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { useNavigate } from "react-router-dom";
import { DEV_MODE } from "@/configs";

import { isTauri } from "@/utils/isTauri";

export function useFullscreen() {
	const [isFullscreen, setIsFullscreen] = useState(false);
	const ref = useRef<HTMLDivElement | null>(null);
	const navigate = useNavigate();

	// Tauri logic
	const isTauriEnv = isTauri();
	const appWindow = isTauriEnv ? getCurrentWindow() : null;

	const toggleFullscreen = useCallback(
		async (status: string, timelineInterval: [number, number]) => {
			if (isTauriEnv && appWindow) {
				try {
					const fullscreen = await appWindow.isFullscreen();
					if (fullscreen) {
						await appWindow.setFullscreen(false);
						if (DEV_MODE) {
							navigate(
								`/?status=${status}&slider=${timelineInterval.join(",")}`,
							);
						} else {
							navigate(
								`/graph?status=${status}&slider=${timelineInterval.join(",")}`,
							);
						}
						setIsFullscreen(false);
					} else {
						await appWindow.setFullscreen(true);
						navigate(
							`/fullscreen-graph?status=${status}&slider=${timelineInterval.join(",")}`,
						);
						setIsFullscreen(true);
					}
				} catch (error) {
					console.error("Fullscreen error:", error);
				}
				return;
			}
			// Browser logic
			const elem = ref.current || document.documentElement;
			if (!document.fullscreenElement) {
				try {
					await elem.requestFullscreen();
					navigate(
						`/fullscreen-graph?status=${status}&slider=${timelineInterval.join(",")}`,
					);
					setIsFullscreen(true);
				} catch (error) {
					console.error("Fullscreen error:", error);
				}
			} else {
				try {
					await document.exitFullscreen();
					if (DEV_MODE) {
						navigate(`/?status=${status}&slider=${timelineInterval.join(",")}`);
					} else {
						navigate(
							`/graph?status=${status}&slider=${timelineInterval.join(",")}`,
						);
					}
					setIsFullscreen(false);
				} catch (error) {
					console.error("Fullscreen error:", error);
				}
			}
		},
		[appWindow, navigate, isTauriEnv],
	);

	useEffect(() => {
		if (isTauriEnv && appWindow) {
			const unlisten = appWindow.onResized(() => {
				appWindow.isFullscreen().then((fullscreen) => {
					navigate(
						fullscreen ? "/fullscreen-graph" : DEV_MODE ? "/" : "/graph",
					);
					setIsFullscreen(fullscreen);
				});
			});

			return () => {
				unlisten.then((f) => f());
			};
		}
		// Browser
		const handleFullscreenChange = () => {
			const fullscreen = !!document.fullscreenElement;
			navigate(fullscreen ? "/fullscreen-graph" : DEV_MODE ? "/" : "/graph");
			setIsFullscreen(fullscreen);
		};
		document.addEventListener("fullscreenchange", handleFullscreenChange);
		return () => {
			document.removeEventListener("fullscreenchange", handleFullscreenChange);
		};
	}, [appWindow, navigate, isTauriEnv]);

	return { ref, isFullscreen, toggleFullscreen };
}

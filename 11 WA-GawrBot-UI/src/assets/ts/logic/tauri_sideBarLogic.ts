import { appWindow } from "@tauri-apps/api/window";

if (window.__TAURI_METADATA__) {
	document.addEventListener("fullscreenchange", () => {
		if (document.fullscreenElement) {
			appWindow.setFullscreen(true);
		} else {
			appWindow.setFullscreen(false);
		}
	});
}

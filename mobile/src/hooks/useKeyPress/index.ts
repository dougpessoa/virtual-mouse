import { useEffect } from "react";

export function useKeyPress(key: string, callback: () => void) {
	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === key) {
				callback();
			}
		};

		window.addEventListener("keydown", handleKeyDown);

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [key, callback]);
}

type KeyCallback = {
	key: string;
	callback: () => void;
};

export function useKeyPresses(bindings: KeyCallback[]) {
	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			for (const binding of bindings) {
				if (event.key === binding.key) {
					binding.callback();
					break;
				}
			}
		};

		window.addEventListener("keydown", handleKeyDown);

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [bindings]);
}

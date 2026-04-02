import { useEffect, useCallback } from "react";

function useCommand(keys: string[], callback: () => void) {
	const handleKeyDown = useCallback(
		(event: KeyboardEvent) => {
			const pressedKeys = new Set(keys.map((key) => key.toLowerCase()));
			if (
				pressedKeys.has(event.key.toLowerCase()) &&
				(!pressedKeys.has("ctrl") || event.ctrlKey) &&
				(!pressedKeys.has("shift") || event.shiftKey) &&
				(!pressedKeys.has("alt") || event.altKey)
			) {
				event.preventDefault();
				callback();
			}
		},
		[keys, callback],
	);

	useEffect(() => {
		window.addEventListener("keydown", handleKeyDown);
		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [handleKeyDown]);
}

export default useCommand;

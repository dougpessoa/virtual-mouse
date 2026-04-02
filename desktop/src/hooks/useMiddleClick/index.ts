import { useEffect } from "react";

export function useMiddleClick(callback: (event: MouseEvent) => void) {
	useEffect(() => {
		const handleMouseDown = (event: MouseEvent) => {
			if (event.button === 1) {
				event.preventDefault(); // evita o scroll automático
				callback(event);
			}
		};

		window.addEventListener("mousedown", handleMouseDown);

		return () => {
			window.removeEventListener("mousedown", handleMouseDown);
		};
	}, [callback]);
}

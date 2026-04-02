import { useEffect } from "react";

type Callback = () => void;

export function useClickOutside(
	refs: React.RefObject<HTMLDivElement | null>[],
	callback: Callback,
) {
	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			const clickedOutside = refs
				.filter((ref) => ref.current !== null)
				.every((ref) => {
					const el = ref.current;
					return el && !el.contains(event.target as Node);
				});

			if (clickedOutside) {
				callback();
			}
		}

		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [refs, callback]);
}

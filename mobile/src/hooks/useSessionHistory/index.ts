import { useCallback, useState } from "react";

type SessionHistory<T> = {
	prev: () => T | undefined;
	next: () => T | undefined;
	push: (value: T) => void;
	replace: (value: T) => void;
	reset: (initial: T) => void;
	current: T;
	canUndo: boolean;
	canRedo: boolean;
	index: number;
	history: T[];
};

function getSessionHistory<T>(
	key: string,
	initial: T,
): { history: T[]; index: number } {
	const raw = sessionStorage.getItem(key);
	if (raw) {
		try {
			const parsed = JSON.parse(raw);
			if (Array.isArray(parsed.history) && typeof parsed.index === "number") {
				return parsed;
			}
		} catch {}
	}
	return { history: [initial], index: 0 };
}

function setSessionHistory<T>(key: string, history: T[], index: number) {
	sessionStorage.setItem(key, JSON.stringify({ history, index }));
}

export function useSessionHistory<T>(
	sessionKey: string,
	initial: T,
	override = false,
): SessionHistory<T> {
	const [_, setCurrentIndexForReRender] = useState(
		() => getSessionHistory<T>(sessionKey, initial).index,
	);

	const push = useCallback(
		(value: T) => {
			const { history: currentHistory, index: currentIndex } =
				getSessionHistory<T>(sessionKey, initial);

			let newHistory: T[];
			if (override && currentIndex < currentHistory.length - 1) {
				// Truncate future history if not at the end
				newHistory = currentHistory.slice(0, currentIndex + 1).concat([value]);
			} else {
				// Default: just append
				newHistory = currentHistory.concat([value]);
			}
			const newIndex = newHistory.length - 1;
			setSessionHistory(sessionKey, newHistory, newIndex);
			setCurrentIndexForReRender(newIndex);
		},
		[sessionKey, initial, override],
	);

	const replace = useCallback(
		(value: T) => {
			const { history: currentHistory, index: currentIndex } =
				getSessionHistory<T>(sessionKey, initial);
			const newHistory = [...currentHistory];
			newHistory[currentIndex] = value;
			setSessionHistory(sessionKey, newHistory, currentIndex);
			setCurrentIndexForReRender(currentIndex);
		},
		[sessionKey, initial],
	);

	const { history: latestHistory, index: latestIndex } = getSessionHistory<T>(
		sessionKey,
		initial,
	);

	const prev = useCallback(() => {
		const { history: currentHistory, index: currentIndex } =
			getSessionHistory<T>(sessionKey, initial);
		if (currentIndex > 0) {
			const newIndex = currentIndex - 1;
			setSessionHistory(sessionKey, currentHistory, newIndex);
			setCurrentIndexForReRender(newIndex);
			return currentHistory[newIndex];
		}
		return undefined;
	}, [sessionKey, initial]);

	const next = useCallback(() => {
		const { history: currentHistory, index: currentIndex } =
			getSessionHistory<T>(sessionKey, initial);
		if (currentIndex < currentHistory.length - 1) {
			const newIndex = currentIndex + 1;
			setSessionHistory(sessionKey, currentHistory, newIndex);
			setCurrentIndexForReRender(newIndex);
			return currentHistory[newIndex];
		}
		return undefined;
	}, [sessionKey, initial]);

	const reset = useCallback(
		(value: T) => {
			setSessionHistory(sessionKey, [value], 0);
			setCurrentIndexForReRender(0);
		},
		[sessionKey],
	);

	return {
		prev,
		next,
		push,
		replace,
		reset,
		current: latestHistory[latestIndex],
		canUndo: latestIndex > 0,
		canRedo: latestIndex < latestHistory.length - 1,
		index: latestIndex,
		history: latestHistory,
	};
}

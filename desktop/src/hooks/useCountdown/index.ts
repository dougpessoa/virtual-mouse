import { useCallback, useEffect, useRef, useState } from "react";

function formatTime(ms: number) {
	const totalSeconds = Math.max(0, Math.floor(ms / 1000));
	const minutes = Math.floor(totalSeconds / 60);
	const seconds = totalSeconds % 60;
	const parts = [];
	if (minutes > 0) parts.push(`${minutes} minute${minutes !== 1 ? "s" : ""}`);
	parts.push(`${seconds} second${seconds !== 1 ? "s" : ""}`);
	return parts.join(" and ");
}

export function useCountdown() {
	const [remaining, setRemaining] = useState(0);
	const [countdownIsLocked, setCountdownIsLocked] = useState(false);
	const intervalRef = useRef<any | null>(null);
	const onFinishRef = useRef<(() => void) | null>(null);

	const startCountdown = useCallback(
		(
			timeRemainingInMs: number,
			onStart?: () => void,
			onFinish?: () => void,
		) => {
			setRemaining(timeRemainingInMs);
			setCountdownIsLocked(true);

			if (intervalRef.current) clearInterval(intervalRef.current);

			onFinishRef.current = onFinish || null;

			if (onStart) onStart();

			intervalRef.current = setInterval(() => {
				setRemaining((prev) => {
					if (prev <= 1000) {
						clearInterval(intervalRef.current);
						intervalRef.current = null;
						setCountdownIsLocked(false);
						if (onFinishRef.current) {
							onFinishRef.current();
						}
						return 0;
					}
					return prev - 1000;
				});
			}, 1000);
		},
		[],
	);

	const stopCountdown = useCallback(() => {
		if (intervalRef.current) {
			clearInterval(intervalRef.current);
			intervalRef.current = null;
		}
		setCountdownIsLocked(false);
	}, []);

	useEffect(() => {
		return () => {
			if (intervalRef.current) clearInterval(intervalRef.current);
		};
	}, []);

	return {
		remainingText: formatTime(remaining),
		remaining,
		countdownIsLocked,
		startCountdown,
		stopCountdown,
	};
}

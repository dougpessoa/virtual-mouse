import { useEffect, useState } from "react";

export function useCurrentTime() {
	const [time, setTime] = useState<string>("");

	useEffect(() => {
		const updateTime = () => {
			const now = new Date();
			setTime(now.toLocaleTimeString("en-GB", { hour12: false }));
		};

		updateTime();
		const interval = setInterval(updateTime, 1000);

		return () => clearInterval(interval);
	}, []);

	return { time };
}

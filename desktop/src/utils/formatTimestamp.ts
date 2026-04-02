import i18n from "@/i18n";

export function formatTimestamp(timestamp: number | string): string {
	let locale = "en-IE";

	if (i18n.language === "ptbr") {
		locale = "pt-BR";
	}

	// Handle UTC timestamps properly to avoid timezone conversion
	if (typeof timestamp === "string" && timestamp.endsWith("Z")) {
		// For UTC timestamps, extract date and time directly without timezone conversion
		const match = timestamp.match(
			/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})/,
		);
		if (match) {
			const [_, year, month, day, hours, minutes, seconds] = match;
			const date = new Date(
				Number.parseInt(year),
				Number.parseInt(month) - 1,
				Number.parseInt(day),
				Number.parseInt(hours),
				Number.parseInt(minutes),
				Number.parseInt(seconds),
			);

			return date.toLocaleString(locale, {
				day: "2-digit",
				month: "short",
				year: "numeric",
				hour: "2-digit",
				minute: "2-digit",
				second: "2-digit",
				hour12: false,
			});
		}
	}

	const date = new Date(timestamp);
	return date.toLocaleString(locale, {
		day: "2-digit",
		month: "short",
		year: "numeric",
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
		hour12: false,
	});
}

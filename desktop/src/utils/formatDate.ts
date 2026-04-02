export function formatDate(timestamp: number) {
	const formatter = new Intl.DateTimeFormat("pt-BR", {
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
		hour12: false,
	});

	return formatter.format(new Date(timestamp));
}

export function formatDateTime(isoDate?: Date) {
	if (!isoDate || String(isoDate) === "") return "";

	const date = new Date(isoDate);
	// const userLocale = navigator.language || "pt-BR";
	return date.toLocaleString("pt-BR", {
		day: "2-digit",
		month: "2-digit",
		year: "numeric",
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
		hour12: false,
	});
}


export function pullDate() {
	const now = new Date();
	const pad = (value: number) => value.toString().padStart(2, "0");
	const year = now.getFullYear();
	const month = pad(now.getMonth() + 1);
	const day = pad(now.getDate());
	const hours = pad(now.getHours());
	const minutes = pad(now.getMinutes());
	const seconds = pad(now.getSeconds());

	return { year, month, day, hours, minutes, seconds };
}

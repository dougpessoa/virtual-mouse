/**
 * It gets the background color from a tailwind class name
 * @param className tailwind class name
 * @returns background color as a string
 */
export function getColorFromClass(className: string) {
	const tempElement = document.createElement("div");
	tempElement.className = className;
	document.body.appendChild(tempElement);
	const color = window.getComputedStyle(tempElement).backgroundColor;
	document.body.removeChild(tempElement);
	return color;
}

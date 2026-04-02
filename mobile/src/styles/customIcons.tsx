interface CustomIconsProps {
	color?: string;
}

interface StrokeWidthIcon extends CustomIconsProps {
	size?: "thin" | "bold" | "extra-bold";
	isActive?: boolean;
}

export function StrokeWidthIcon({
	color = "bg-primary",
	size = "bold",
	isActive = false,
}: StrokeWidthIcon) {
	const stateColor = isActive ? "bg-blue-500" : color;

	if (size === "thin")
		return (
			<div className={`w-[20px] h-[2px] ${stateColor} rounded-md shrink-0`} />
		);

	if (size === "bold")
		return (
			<div className={`w-[20px] h-[5px] ${stateColor} rounded-md shrink-0 `} />
		);

	return (
		<div className={`w-[20px] h-[7px] ${stateColor} rounded-md shrink-0`} />
	);
}

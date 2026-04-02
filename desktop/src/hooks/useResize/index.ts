import { useState, useEffect } from "react";

interface Dimensions {
	width: number;
	height: number;
}

interface ResizeResult extends Dimensions {
	previousDimensions: Dimensions;
	percentageChange: { width: number; height: number };
	isResizing: boolean;
}

export const useResize = (): ResizeResult => {
	const [dimensions, setDimensions] = useState<Dimensions>({
		width: window.innerWidth,
		height: window.innerHeight,
	});
	const [previousDimensions, setPreviousDimensions] =
		useState<Dimensions>(dimensions);
	const [percentageChange, setPercentageChange] = useState<{
		width: number;
		height: number;
	}>({ width: 0, height: 0 });
	const [isResizing, setIsResizing] = useState<boolean>(false);

	useEffect(() => {
		let resizeTimer: any;

		const handleResize = () => {
			setIsResizing(true);
			clearTimeout(resizeTimer);

			resizeTimer = setTimeout(() => {
				setPreviousDimensions(dimensions);
				const newWidth = window.innerWidth;
				const newHeight = window.innerHeight;
				setDimensions({ width: newWidth, height: newHeight });
				setPercentageChange({
					width: ((newWidth - dimensions.width) / dimensions.width) * 100,
					height: ((newHeight - dimensions.height) / dimensions.height) * 100,
				});
				setIsResizing(false);
			}, 500);
		};

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
			clearTimeout(resizeTimer);
		};
	}, [dimensions]);

	return { ...dimensions, previousDimensions, percentageChange, isResizing };
};

declare module "use-react-screenshot" {
	import type { RefObject } from "react";

	type ScreenshotHook = [
		(ref: RefObject<HTMLElement | null>) => Promise<string>,
		() => void,
	];

	const useScreenshot: () => [any, any];

	export { useScreenshot };
}

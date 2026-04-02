import { useEffect, useRef, useState } from "react";

import { AnimatePresence, motion, easeOut } from "motion/react";
import { TransitionPanel } from "./transition-panel";

import { useTabs } from "./hooks/useTabs";
import { cn } from "@/lib/utils";

interface AnimatedTabsProps {
	initialTabId: string;
	tabs: string[];
	children: React.ReactNode[];
	className?: string;
	transitionPanelClassName?: string;
}

const transition: { type: "tween"; ease: (t: number) => number; duration: number } = {
	type: "tween",
	ease: easeOut,
	duration: 0.15,
};

const getHoverAnimationProps = (hoveredRect: DOMRect, navRect: DOMRect) => ({
	x: hoveredRect.left - navRect.left - 10,
	y: hoveredRect.top - navRect.top - 4,
	width: hoveredRect.width + 20,
	height: hoveredRect.height + 10,
});

const Tabs = ({
	tabs,
	selectedTabIndex,
	setSelectedTab,
}: {
	tabs: string[];
	selectedTabIndex: number;
	setSelectedTab: (input: [number, number]) => void;
}): React.ReactElement => {
	const [buttonRefs, setButtonRefs] = useState<Array<HTMLButtonElement | null>>(
		[],
	);

	useEffect(() => {
		setButtonRefs((prev) => prev.slice(0, tabs.length));
	}, [tabs.length]);

	const navRef = useRef<HTMLDivElement>(null);
	const navRect = navRef.current?.getBoundingClientRect();

	const selectedRect = buttonRefs[selectedTabIndex]?.getBoundingClientRect();

	const [hoveredTabIndex, setHoveredTabIndex] = useState<number | null>(null);
	const hoveredRect =
		buttonRefs[hoveredTabIndex ?? -1]?.getBoundingClientRect();

	return (
		<nav
			ref={navRef}
			className="flex flex-shrink-0 justify-center items-center relative z-0 py-2"
			onPointerLeave={() => setHoveredTabIndex(null)}
		>
			{tabs.map((item, i) => {
				const isActive = selectedTabIndex === i;

				return (
					<button
						type="button"
						key={item}
						className="text-md relative rounded-md flex items-center px-4 z-20 bg-transparent cursor-pointer select-none transition-colors"
						onPointerEnter={() => setHoveredTabIndex(i)}
						onFocus={() => setHoveredTabIndex(i)}
						onClick={() => setSelectedTab([i, i > selectedTabIndex ? 1 : -1])}
					>
						<motion.span
							ref={(el) => {
								buttonRefs[i] = el as HTMLButtonElement;
							}}
							className={cn("block", "px-3 py-1", {
								"text-zinc-500": !isActive,
								"text-black dark:text-white font-semibold": isActive,
							})}
						>
							<p>{item}</p>
						</motion.span>
					</button>
				);
			})}

			<AnimatePresence>
				{hoveredRect && navRect && (
					<motion.div
						key="hover"
						className="absolute z-10 top-0 left-0 rounded-md bg-zinc-100 dark:bg-zinc-800"
						initial={{
							...getHoverAnimationProps(hoveredRect, navRect),
							opacity: 0,
						}}
						animate={{
							...getHoverAnimationProps(hoveredRect, navRect),
							opacity: 1,
						}}
						exit={{
							...getHoverAnimationProps(hoveredRect, navRect),
							opacity: 0,
						}}
						transition={transition}
					/>
				)}
			</AnimatePresence>

			<AnimatePresence>
				{selectedRect && navRect && (
					<motion.div
						className="absolute z-10 bottom-0 left-0 h-[2px] bg-black dark:bg-white"
						initial={false}
						animate={{
							width: selectedRect.width + 18,
							x: `calc(${selectedRect.left - navRect.left - 9}px)`,
							opacity: 1,
						}}
						transition={transition}
					/>
				)}
			</AnimatePresence>
		</nav>
	);
};

export function AnimatedTabs({
	tabs,
	children,
	initialTabId,
	className,
	transitionPanelClassName,
}: AnimatedTabsProps) {
	const [hookProps] = useState({
		tabs,
		initialTabId,
	});

	const framer = useTabs(hookProps);

	return (
		<div className={className}>
			<div className="relative flex w-full items-center justify-between border-b dark:border-dark-4 overflow-x-auto overflow-y-hidden mt-2">
				<Tabs {...framer.tabProps} />
			</div>
			<TransitionPanel
				activeIndex={framer.tabProps.selectedTabIndex}
				transition={{ duration: 0.2, ease: "easeInOut" }}
				variants={{
					enter: { opacity: 0, y: -50, filter: "blur(4px)" },
					center: { opacity: 1, y: 0, filter: "blur(0px)" },
					exit: { opacity: 0, y: 50, filter: "blur(4px)" },
				}}
				className={transitionPanelClassName}
			>
				{children}
			</TransitionPanel>
		</div>
	);
}

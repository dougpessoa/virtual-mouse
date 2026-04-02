import { useCallback, useEffect, useMemo, useRef } from "react";

type MousepadProps = {
	disabled: boolean;
	onMove: (x: number, y: number) => void;
	onScroll: (y: number) => void;
	onLeftClick: () => void;
	onRightClick: () => void;
};

export function Mousepad({ disabled, onMove, onScroll, onLeftClick, onRightClick }: MousepadProps) {
	const padPointerIdRef = useRef<number | null>(null);
	const scrollPointerIdRef = useRef<number | null>(null);

	const lastPadPointRef = useRef<{ x: number; y: number } | null>(null);
	const lastScrollYRef = useRef<number | null>(null);

	const pendingMoveRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
	const moveRafRef = useRef<number | null>(null);

	const pendingScrollPxRef = useRef<number>(0);

	const sensitivity = useMemo(() => 1, []);
	const scrollStepPx = useMemo(() => 18, []);

	const flushMove = useCallback(() => {
		moveRafRef.current = null;
		if (disabled) {
			pendingMoveRef.current = { x: 0, y: 0 };
			return;
		}

		const { x, y } = pendingMoveRef.current;
		pendingMoveRef.current = { x: 0, y: 0 };
		if (x === 0 && y === 0) return;
		onMove(x, y);
	}, [disabled, onMove]);

	const scheduleMove = useCallback(() => {
		if (moveRafRef.current != null) return;
		moveRafRef.current = window.requestAnimationFrame(flushMove);
	}, [flushMove]);

	useEffect(() => {
		return () => {
			if (moveRafRef.current != null) {
				window.cancelAnimationFrame(moveRafRef.current);
			}
		};
	}, []);

	return (
		<div className="w-full flex-1 flex flex-col gap-4 p-4">
			<div className="flex-1 grid grid-cols-[1fr_72px] gap-3">
				<div
					className={[
						"w-full h-full rounded-2xl border bg-background/60",
						"touch-none select-none",
						disabled ? "opacity-60" : "",
					].join(" ")}
					onContextMenu={(e) => e.preventDefault()}
					onPointerDown={(e) => {
						if (disabled) return;
						padPointerIdRef.current = e.pointerId;
						e.currentTarget.setPointerCapture(e.pointerId);
						lastPadPointRef.current = { x: e.clientX, y: e.clientY };
					}}
					onPointerMove={(e) => {
						if (disabled) return;
						if (padPointerIdRef.current !== e.pointerId) return;
						const last = lastPadPointRef.current;
						if (!last) return;
						const dx = (e.clientX - last.x) * sensitivity;
						const dy = (e.clientY - last.y) * sensitivity;
						lastPadPointRef.current = { x: e.clientX, y: e.clientY };

						pendingMoveRef.current = {
							x: pendingMoveRef.current.x + dx,
							y: pendingMoveRef.current.y + dy,
						};
						scheduleMove();
					}}
					onPointerUp={(e) => {
						if (padPointerIdRef.current !== e.pointerId) return;
						padPointerIdRef.current = null;
						lastPadPointRef.current = null;
					}}
					onPointerCancel={(e) => {
						if (padPointerIdRef.current !== e.pointerId) return;
						padPointerIdRef.current = null;
						lastPadPointRef.current = null;
					}}
				/>

				<div
					className={[
						"w-full h-full rounded-2xl border bg-background/60",
						"touch-none select-none flex items-center justify-center",
						disabled ? "opacity-60" : "",
					].join(" ")}
					onContextMenu={(e) => e.preventDefault()}
					onPointerDown={(e) => {
						if (disabled) return;
						scrollPointerIdRef.current = e.pointerId;
						e.currentTarget.setPointerCapture(e.pointerId);
						lastScrollYRef.current = e.clientY;
					}}
					onPointerMove={(e) => {
						if (disabled) return;
						if (scrollPointerIdRef.current !== e.pointerId) return;
						const lastY = lastScrollYRef.current;
						if (lastY == null) return;
						const dy = e.clientY - lastY;
						lastScrollYRef.current = e.clientY;

						pendingScrollPxRef.current += dy;
						const steps = Math.trunc(pendingScrollPxRef.current / scrollStepPx);
						if (steps !== 0) {
							pendingScrollPxRef.current -= steps * scrollStepPx;
							onScroll(steps);
						}
					}}
					onPointerUp={(e) => {
						if (scrollPointerIdRef.current !== e.pointerId) return;
						scrollPointerIdRef.current = null;
						lastScrollYRef.current = null;
						pendingScrollPxRef.current = 0;
					}}
					onPointerCancel={(e) => {
						if (scrollPointerIdRef.current !== e.pointerId) return;
						scrollPointerIdRef.current = null;
						lastScrollYRef.current = null;
						pendingScrollPxRef.current = 0;
					}}
				>
					<div className="text-xs text-muted-foreground rotate-90">SCROLL</div>
				</div>
			</div>

			<div className="grid grid-cols-2 gap-3">
				<button
					type="button"
					className={[
						"h-16 rounded-2xl border bg-background/60",
						"active:bg-background",
						"touch-none select-none",
						disabled ? "opacity-60" : "",
					].join(" ")}
					onPointerDown={(e) => {
						e.preventDefault();
						if (disabled) return;
						onLeftClick();
					}}
				>
					Left
				</button>

				<button
					type="button"
					className={[
						"h-16 rounded-2xl border bg-background/60",
						"active:bg-background",
						"touch-none select-none",
						disabled ? "opacity-60" : "",
					].join(" ")}
					onPointerDown={(e) => {
						e.preventDefault();
						if (disabled) return;
						onRightClick();
					}}
				>
					Right
				</button>
			</div>
		</div>
	);
}


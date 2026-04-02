import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type MousepadProps = {
	disabled: boolean;
	onMove: (x: number, y: number) => void;
	onScroll: (y: number) => void;
	onLeftClick: () => void;
	onRightClick: () => void;
	onKeyboardKey: (key: string) => void;
};

export function Mousepad({ disabled, onMove, onScroll, onLeftClick, onRightClick, onKeyboardKey }: MousepadProps) {
	const padPointerIdRef = useRef<number | null>(null);
	const scrollPointerIdRef = useRef<number | null>(null);
	const keyboardInputRef = useRef<HTMLInputElement | null>(null);

	const [keyboardOpen, setKeyboardOpen] = useState(false);
	const keyboardValueRef = useRef("");
	const [keyboardValue, setKeyboardValue] = useState("");

	const lastPadPointRef = useRef<{ x: number; y: number } | null>(null);
	const lastPadTimeRef = useRef<number | null>(null);
	const lastScrollYRef = useRef<number | null>(null);

	const pendingMoveRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
	const moveRafRef = useRef<number | null>(null);

	const pendingScrollPxRef = useRef<number>(0);

	const sensitivity = useMemo(() => 1, []);
	const accelCoeff = useMemo(() => 2, []);
	const accelMax = useMemo(() => 3, []);
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

	useEffect(() => {
		if (!disabled) return;
		setKeyboardOpen(false);
		keyboardInputRef.current?.blur();
	}, [disabled]);

	const toggleKeyboard = useCallback(() => {
		if (disabled) return;

		if (keyboardOpen) {
			setKeyboardOpen(false);
			keyboardInputRef.current?.blur();
			return;
		}

		setKeyboardOpen(true);
		keyboardInputRef.current?.focus({ preventScroll: true });
	}, [disabled]);

	return (
		<div className="w-full h-full min-h-0 flex flex-col gap-3 p-3">
			<form
				className="absolute left-0 top-0 w-[1px] h-[1px] opacity-0 overflow-hidden"
				onSubmit={(e) => {
					e.preventDefault();
					if (disabled) return;
					onKeyboardKey("Enter");
					keyboardValueRef.current = "";
					setKeyboardValue("");
					keyboardInputRef.current?.focus({ preventScroll: true });
				}}
			>
				<input
					ref={keyboardInputRef}
					inputMode="text"
					enterKeyHint="enter"
					autoCapitalize="none"
					autoCorrect="on"
					autoComplete="off"
					spellCheck={true}
					value={keyboardValue}
					onChange={(e) => {
						if (disabled) return;
						const next = e.currentTarget.value;
						const prev = keyboardValueRef.current;

						if (next.length > prev.length) {
							const added = next.slice(prev.length);
							for (const ch of added) {
								onKeyboardKey(ch);
							}
						} else if (next.length < prev.length) {
							const removed = prev.length - next.length;
							for (let i = 0; i < removed; i += 1) {
								onKeyboardKey("Backspace");
							}
						}

						keyboardValueRef.current = next;
						setKeyboardValue(next.length > 256 ? "" : next);
						if (next.length > 256) {
							keyboardValueRef.current = "";
						}
					}}
				/>
				<button type="submit" />
			</form>

			<div className="w-full flex items-center justify-end">
				<button
					type="button"
					className={[
						"h-10 px-4 rounded-xl border bg-background/60",
						"active:bg-background",
						"touch-none select-none",
						disabled ? "opacity-60" : "",
					].join(" ")}
					onPointerDown={(e) => {
						e.preventDefault();
						toggleKeyboard();
					}}
				>
					{keyboardOpen ? "Close keyboard" : "Keyboard"}
				</button>
			</div>
			<div className="min-h-0 flex-1 grid grid-cols-[1fr_64px] gap-3">
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
						lastPadTimeRef.current = performance.now();
					}}
					onPointerMove={(e) => {
						if (disabled) return;
						if (padPointerIdRef.current !== e.pointerId) return;
						const last = lastPadPointRef.current;
						if (!last) return;
						const now = performance.now();
						const dt = lastPadTimeRef.current == null ? 16 : Math.max(1, now - lastPadTimeRef.current);
						const baseDx = (e.clientX - last.x) * sensitivity;
						const baseDy = (e.clientY - last.y) * sensitivity;
						const dist = Math.hypot(baseDx, baseDy);
						const speed = dist / dt;
						const factor = Math.min(accelMax, 1 + speed * accelCoeff);
						const dx = baseDx * factor;
						const dy = baseDy * factor;
						lastPadPointRef.current = { x: e.clientX, y: e.clientY };
						lastPadTimeRef.current = now;

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
						lastPadTimeRef.current = null;
					}}
					onPointerCancel={(e) => {
						if (padPointerIdRef.current !== e.pointerId) return;
						padPointerIdRef.current = null;
						lastPadPointRef.current = null;
						lastPadTimeRef.current = null;
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
						"h-14 rounded-2xl border bg-background/60",
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
						"h-14 rounded-2xl border bg-background/60",
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

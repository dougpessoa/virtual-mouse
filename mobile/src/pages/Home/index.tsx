import { useMouseSocket } from "@/contexts/useMouseSocket";
import { Mousepad } from "./mousepad";

export function Home() {
	const { status, sendMove, sendScroll, sendClick } =
		useMouseSocket();

	const connected = status === "connected";

	return (
		<div className="w-full h-[100vh] flex flex-col">
			<Mousepad
				disabled={!connected}
				onMove={(x, y) => sendMove(x, y)}
				onScroll={(y) => sendScroll(y)}
				onLeftClick={() => sendClick("left", 1)}
				onRightClick={() => sendClick("right", 1)}
			/>
		</div>
	);
}

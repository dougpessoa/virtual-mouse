import { useEffect, useMemo, useState } from "react";

import { Button } from "@/components/shadcn/button";
import { Input } from "@/components/shadcn/input";
import { useMouseSocket } from "@/contexts/useMouseSocket";
import { Mousepad } from "./mousepad";

export function Home() {
	const { status, url, error, connect, disconnect, sendMove, sendScroll, sendClick } =
		useMouseSocket();

	const [wsUrl, setWsUrl] = useState(url);

	useEffect(() => {
		setWsUrl(url);
	}, [url]);

	const connected = status === "connected";

	const statusLabel = useMemo(() => {
		if (status === "connected") return "Connected";
		if (status === "connecting") return "Connecting";
		if (status === "error") return "Error";
		return "Disconnected";
	}, [status]);

	return (
		<div className="w-full h-[100vh] flex flex-col">
			<div className="p-4 flex flex-col gap-3">
				<div className="flex items-center justify-between gap-3">
					<div className="text-sm">
						<span className="text-muted-foreground">Status: </span>
						<span>{statusLabel}</span>
					</div>
					<div className="flex gap-2">
						{connected ? (
							<Button variant="outline" onClick={disconnect}>
								Disconnect
							</Button>
						) : (
							<Button onClick={() => connect(wsUrl)}>Connect</Button>
						)}
					</div>
				</div>

				<div className="flex gap-2">
					<Input value={wsUrl} onChange={(e) => setWsUrl(e.target.value)} />
				</div>

				{error ? <div className="text-xs text-destructive">{error}</div> : null}
				<div className="text-xs text-muted-foreground">
					Open the tray app on the PC and press Start before using the pad.
				</div>
			</div>

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

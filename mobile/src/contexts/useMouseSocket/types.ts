export type ConnectionStatus = "disconnected" | "connecting" | "connected" | "error";

export type ClickButton = "left" | "right";

export type MouseSocketContextTypes = {
	status: ConnectionStatus;
	url: string;
	error: string | null;

	connect: (nextUrl?: string) => void;
	disconnect: () => void;

	sendMove: (x: number, y: number) => void;
	sendScroll: (y: number) => void;
	sendClick: (button: ClickButton, pressQty?: number) => void;
};


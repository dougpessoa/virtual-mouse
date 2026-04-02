import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";

import { env } from "@/env";
import type { ClickButton, ConnectionStatus, MouseSocketContextTypes } from "./types";

type ClickData = {
	type: "left" | "right";
	pressQty: number;
};

type ScrollData = {
	y: number;
};

type MoveData = {
	x: number;
	y: number;
};

type Message = {
	type: "click" | "right-click" | "scroll" | "move";
	data: ClickData | ScrollData | MoveData;
};

const MouseSocketContext = createContext<MouseSocketContextTypes>({} as MouseSocketContextTypes);

function MouseSocketProvider({ children }: { children: React.ReactNode }) {
	const wsRef = useRef<WebSocket | null>(null);
	const reconnectTimeoutRef = useRef<number | null>(null);
	const shouldReconnectRef = useRef(false);

	const [status, setStatus] = useState<ConnectionStatus>("disconnected");
	const [error, setError] = useState<string | null>(null);
	const [url, setUrl] = useState(() => env?.WS || defaultWsUrl());

	const disconnect = useCallback(() => {
		shouldReconnectRef.current = false;
		setStatus("disconnected");

		if (reconnectTimeoutRef.current) {
			window.clearTimeout(reconnectTimeoutRef.current);
			reconnectTimeoutRef.current = null;
		}

		const ws = wsRef.current;
		wsRef.current = null;
		if (ws && (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING)) {
			ws.close();
		}
	}, []);

	const connect = useCallback(
		(nextUrl?: string) => {
			const targetUrl = (nextUrl || url).trim();
			setUrl(targetUrl);
			setError(null);
			setStatus("connecting");
			shouldReconnectRef.current = true;

			if (reconnectTimeoutRef.current) {
				window.clearTimeout(reconnectTimeoutRef.current);
				reconnectTimeoutRef.current = null;
			}

			const existing = wsRef.current;
			if (existing && (existing.readyState === WebSocket.OPEN || existing.readyState === WebSocket.CONNECTING)) {
				existing.close();
			}

			const ws = new WebSocket(targetUrl);
			wsRef.current = ws;

			ws.onopen = () => {
				if (wsRef.current !== ws) return;
				setStatus("connected");
				setError(null);
			};

			ws.onclose = () => {
				if (wsRef.current === ws) {
					wsRef.current = null;
				}
				setStatus("disconnected");

				if (!shouldReconnectRef.current) return;
				reconnectTimeoutRef.current = window.setTimeout(() => {
					connect(targetUrl);
				}, 800);
			};

			ws.onerror = () => {
				setStatus("error");
				setError("WebSocket error");
			};
		},
		[url],
	);

	useEffect(() => {
		connect(url);
		return () => {
			disconnect();
		};
	}, []);

	const sendMessage = useCallback(
		(message: Message) => {
			const ws = wsRef.current;
			if (!ws || ws.readyState !== WebSocket.OPEN) return;
			ws.send(JSON.stringify(message));
		},
		[],
	);

	const sendMove = useCallback(
		(x: number, y: number) => {
			sendMessage({
				type: "move",
				data: { x: Math.round(x), y: Math.round(y) },
			});
		},
		[sendMessage],
	);

	const sendScroll = useCallback(
		(y: number) => {
			sendMessage({
				type: "scroll",
				data: { y: Math.round(y) },
			});
		},
		[sendMessage],
	);

	const sendClick = useCallback(
		(button: ClickButton, pressQty = 1) => {
			const qty = Math.max(1, Math.min(50, Math.floor(pressQty)));
			sendMessage({
				type: button === "right" ? "right-click" : "click",
				data: { type: button, pressQty: qty },
			});
		},
		[sendMessage],
	);

	const value = useMemo<MouseSocketContextTypes>(
		() => ({
			status,
			url,
			error,
			connect,
			disconnect,
			sendMove,
			sendScroll,
			sendClick,
		}),
		[connect, disconnect, error, sendClick, sendMove, sendScroll, status, url],
	);

	return <MouseSocketContext.Provider value={value}>{children}</MouseSocketContext.Provider>;
}

const useMouseSocket = () => useContext(MouseSocketContext);

function defaultWsUrl() {
  // wss://virtual-mouse-269q.onrender.com/client
	if (typeof window === "undefined") return "wss://virtual-mouse-269q.onrender.com/client";
	const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
	const hostname = window.location.hostname || "localhost";
	return `${protocol}//${hostname}:8080/client`;
}

export { MouseSocketProvider, MouseSocketContext, useMouseSocket };


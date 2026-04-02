import type React from "react";

import { MouseSocketProvider } from "@/contexts/useMouseSocket";

type ContextsProps = {
	children: React.ReactNode;
};
export function ContextsProvider({ children }: ContextsProps) {
	return (
		<MouseSocketProvider>{children}</MouseSocketProvider>
	);
}

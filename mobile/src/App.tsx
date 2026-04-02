import { BrowserRouter } from "react-router-dom";

import "./App.css";
import { Toaster as SonnerToaster } from "@/components/shadcn/sonner";
import { DEFAULT_THEME, ThemeProvider, useTheme } from "./lib/theme-provider";
import { Routes } from "./pages/routes";

function App() {
	return (
		<ThemeProvider defaultTheme={DEFAULT_THEME} storageKey="vite-ui-theme">
			<BrowserRouter>
				<Routes />
			</BrowserRouter>
			<Toaster />
		</ThemeProvider>
	);
}

function Toaster() {
	const { theme } = useTheme();
	return <SonnerToaster richColors theme={theme} />;
}

export default App;

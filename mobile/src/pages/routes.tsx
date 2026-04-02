import { ContextsProvider } from "@/contexts";
import { Route, Routes, } from "react-router-dom";
import { Home } from "./Home";

function Pages() {
	return (
		<ContextsProvider>
				<RoutesList />
		</ContextsProvider>
	);
}

function RoutesList() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
		</Routes>
	);
}

export { Pages as Routes };

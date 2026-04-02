import type { ENVTYPES } from "./env";

// const LOCAL: any = "dev";
const LOCAL: any = "prod";

let envDev: ENVTYPES = {
	API: "http://localhost:3000",
	WS: "ws://localhost:8080/client",
};

if (LOCAL === "prod") {
	envDev = {
		API: "",
		WS: "wss://virtual-mouse-269q.onrender.com/client",
	};
}

export { envDev };

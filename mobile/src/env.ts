import { envDev } from "./env.dev";
export type ENVTYPES = {
	API: string;
} | null;

const isLocalhost =
	typeof window !== "undefined" &&
	(window.location.hostname === "localhost" ||
		window.location.hostname === "127.0.0.1");

const LOCAL: any = isLocalhost ? "dev" : "prod";

let env: any = envDev;

if (LOCAL === "prod") {
	env = {
		API: "",
	};
}

export { env };

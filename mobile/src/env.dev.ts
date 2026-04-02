import type { ENVTYPES } from "./env";

const LOCAL: any = "dev";
// const LOCAL: any = "prod";

let envDev: ENVTYPES = {
	API: "http://localhost:3000",
};

if (LOCAL === "prod") {
	envDev = {
		API: "",
	};
}

export { envDev };

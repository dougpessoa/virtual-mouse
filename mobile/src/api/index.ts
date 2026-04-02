import axios from "axios";
import { env } from "@/env";

export const baseURL = env?.API;

export const api = axios.create({
	baseURL,
});

export const apiIot = axios.create({
	baseURL: env?.API_IOT,
});

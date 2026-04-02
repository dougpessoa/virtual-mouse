import ReactDOM from "react-dom/client";
import { registerSW } from "virtual:pwa-register";
import App from "./App";

registerSW({ immediate: true });

// biome-ignore lint/style/noNonNullAssertion: <explanation>
ReactDOM.createRoot(document.getElementById("root")!).render(<App />);

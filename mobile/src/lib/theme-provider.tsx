import { createContext, useContext, useEffect, useState } from "react";

export type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
	children: React.ReactNode;
	defaultTheme?: Theme;
	storageKey?: string;
};

type ThemeProviderState = {
	theme: Theme;
	systemTheme: Theme;
	setTheme: (theme: Theme) => void;
	isDarkMode: boolean;
};

const initialState: ThemeProviderState = {
	theme: "system",
	systemTheme: "system",
	setTheme: () => null,
	isDarkMode: false,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export const DEFAULT_THEME = "light"; // system

export function ThemeProvider({
	children,
	defaultTheme = DEFAULT_THEME,
	storageKey = "vite-ui-theme",
	...props
}: ThemeProviderProps) {
	const [theme, setTheme] = useState<Theme>(
		() => (localStorage.getItem(storageKey) as Theme) || defaultTheme,
	);

	// State to track the actual applied theme (dark/light) when in "system" mode
	const [systemTheme, setSystemTheme] = useState<Theme>(() => {
		if (theme === "system") {
			return window.matchMedia("(prefers-color-scheme: dark)").matches
				? "dark"
				: "light";
		}
		return theme;
	});

	useEffect(() => {
		const root = window.document.documentElement;

		root.classList.remove("light", "dark");

		let appliedTheme: Theme;
		if (theme === "system") {
			appliedTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
				? "dark"
				: "light";
		} else {
			appliedTheme = theme;
		}

		root.classList.add(appliedTheme);
		root.setAttribute("data-color-mode", appliedTheme);

		root.classList.add(theme);

		// Update systemTheme state if in system mode
		if (theme === "system") {
			setSystemTheme(appliedTheme);
		}
	}, [theme]);

	// Listen for system color scheme changes when in "system" mode
	useEffect(() => {
		if (theme !== "system") return;

		const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

		const handleChange = () => {
			const newTheme = mediaQuery.matches ? "dark" : "light";
			setSystemTheme(newTheme);

			const root = window.document.documentElement;
			root.classList.remove("light", "dark");
			root.classList.add(newTheme);
			root.setAttribute("data-color-mode", newTheme);
		};

		mediaQuery.addEventListener("change", handleChange);

		return () => {
			mediaQuery.removeEventListener("change", handleChange);
		};
	}, [theme]);

	const value = {
		theme,
		systemTheme,
		setTheme: (theme: Theme) => {
			localStorage.setItem(storageKey, theme);
			setTheme(theme);
		},
		isDarkMode:
			theme === "dark" || (theme === "system" && systemTheme === "dark"),
	};

	return (
		<ThemeProviderContext.Provider {...props} value={value}>
			{children}
		</ThemeProviderContext.Provider>
	);
}

export const useTheme = () => {
	const context = useContext(ThemeProviderContext);

	if (context === undefined)
		throw new Error("useTheme must be used within a ThemeProvider");

	return context;
};

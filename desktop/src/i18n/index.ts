import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { resources } from "./recources";

const supportedLngs = ["en", "ptbr"] as const;

i18n
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		resources,
		fallbackLng: "en",
		supportedLngs: Array.from(supportedLngs),
		nonExplicitSupportedLngs: true,
		interpolation: {
			escapeValue: false,
		},
		detection: {
			order: ["localStorage", "navigator"],
			caches: ["localStorage"],
			lookupLocalStorage: "i18nextLng",
		},
	})
	.then(() => {
		const lng = i18n.language;
		const finalLng = supportedLngs.includes(
			lng as (typeof supportedLngs)[number],
		)
			? lng
			: "en";
		if (localStorage.getItem("i18nextLng") !== finalLng) {
			localStorage.setItem("i18nextLng", finalLng);
			if (i18n.language !== finalLng) {
				i18n.changeLanguage(finalLng);
			}
		}
	});

import type { en } from "./translations";
export type Translations = typeof en;

export default i18n;

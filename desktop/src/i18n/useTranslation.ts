import { useTranslation as useReactTranslation } from "react-i18next";
import type { TranslationKeys } from "./recources";
import { t as i18nT } from "i18next";

export function useTranslation() {
	const { t, ...rest } = useReactTranslation();
	return {
		t: (key: TranslationKeys, options?: any) => t(key, options) as string,
		...rest,
	};
}

export const t = (key: TranslationKeys, options?: any) =>
	i18nT(key, options) as string;

import type { Translations } from ".";
import * as lang from "./translations";

type Join<K, P> = K extends string
	? P extends string
		? `${K}.${P}`
		: never
	: never;

type NestedKeys<T> = {
	[K in keyof T & string]: T[K] extends object ? Join<K, NestedKeys<T[K]>> : K;
}[keyof T & string];

export type TranslationKeys = NestedKeys<Translations>;

export const resources = {
	en: {
		translation: lang.en,
	},
	ptbr: {
		translation: lang.ptBr,
	},
} as const;

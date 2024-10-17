export const i18n = {
    defaultLocale: process.env.NEXT_DEFAULT_LOCAL ?? 'en',
    locales: ["da", "de", "en", "es", "fr", "id", "it", "ja", "pt", "ru", "tr"],
} as const;

export type Locale = (typeof i18n)["locales"][number];
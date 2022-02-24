import i18n from "i18next";
import { initReactI18next, useTranslation } from "react-i18next";

import translationEN from "./locales/translationEn.json";
import translationFR from "./locales/translationFr.json";

export const defaultLanguage = "en-GB";

// the translations
export const resources = {
    "en-GB": {
        translation: translationEN,
    },
    "en-US": {
        translation: translationEN,
    },
    "fr-FR": {
        translation: translationFR,
    },
};
// the supported getGlpiLanguages NEEDS TO BE UPDATED WHEN NEW LANGUAGES ARE ADDED!!
export const supportedLngs = ["fr-FR", "en-GB", "en-US"];

i18n
    // pass the i18n instance to react-i18next.
    .use(initReactI18next)
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init({
        debug: false,
        fallbackLng: defaultLanguage,
        supportedLngs: supportedLngs,
        resources: resources,
    });

export { i18n, useTranslation };

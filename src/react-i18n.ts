import { resources, defaultLanguage } from "./i18n";

declare module "react-i18next" {
    interface CustomTypeOptions {
        defaultNS: typeof defaultLanguage;
        resources: typeof resources["en-GB"];
    }
}

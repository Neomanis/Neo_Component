import "../src/styles/tailwind.css";
// import { i18n } from "@neomanis/neo-translation";
// export const parameters = {
//     // viewMode: "docs",
//     i18n,
//     locale: "en-GB",
//     locales: {
//         "en-GB": "English",
//         "en-US": "English",
//         "fr-FR": "Français",
//     },
// };

export const decorators = [(Story) => <div className="inter">{Story()}</div>];

import { create } from "@storybook/theming";

export default create({
    base: "dark",
    brandTitle: "Storybook of Neomanis",
    brandUrl: "https://www.neomanis.io/",
    brandImage: "./.storybook/titleNeomanisStorybook.png",
    colorPrimary: "#092847",
    colorSecondary: "#0E3864",
    //  "#0E3864"
    // "#092847"
    // UI
    appBg: "#0E3864",
    appContentBg: "#092847",
    appBorderColor: "#DAE5E5",
    appBorderRadius: 4,

    // Typography
    fontBase: '"Open Sans", sans-serif',
    fontCode: "monospace",

    // Text colors
    textColor: "#DAE5E5",
    textInverseColor: "#0A1E32",

    // Toolbar default and active colors
    barTextColor: "#DAE5E5",
    barSelectedColor: "#22AAFF",
    barBg: "#092847",

    // Form colors
    inputBg: "#0E3864",
    inputBorder: "#0E3864",
    inputTextColor: "#DAE5E5",
    inputBorderRadius: 4,
});

import { create } from "@storybook/theming/create";
import { addons } from "@storybook/addons";
import logoUrl from "../src/img/img/titleNeomanisStorybook.png";

const theme = create({
    base: "light",
    brandTitle: "Storybook of Neomanis",
    brandUrl: "https://www.neomanis.io/",
    brandImage: logoUrl,
});

addons.setConfig({
    theme,
});

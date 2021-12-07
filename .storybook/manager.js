import { create } from "@storybook/theming/create";
import { addons } from "@storybook/addons";
import { TitleNeomanisStorybook } from "../src";

const theme = create({
    base: "light",
    brandTitle: "Storybook of Neomanis",
    brandUrl: "https://www.neomanis.io/",
    brandImage: TitleNeomanisStorybook,
});

addons.setConfig({
    theme,
});

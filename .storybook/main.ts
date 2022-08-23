import { mergeConfig } from "vite";
import svgr from "vite-plugin-svgr";
import path from "path";
import { StorybookViteConfig } from "@storybook/builder-vite";

const toPath = (filePath: string) => path.join(process.cwd(), filePath);

const config: StorybookViteConfig = {
    stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
    addons: [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@storybook/addon-interactions",
        {
            name: "@storybook/addon-storysource",
            options: {
                loaderOptions: {
                    injectStoryParameters: true,
                },
            },
        },
    ],
    framework: "@storybook/react",
    core: {
        builder: "@storybook/builder-vite",
    },
    features: {
        storyStoreV7: true,
    },
    async viteFinal(config, { configType }) {
        return mergeConfig(config, {
            resolve: {
                alias: {
                    "@": toPath("src"),
                },
            },
            plugins: [svgr()],
        });
    },
};

export default config;

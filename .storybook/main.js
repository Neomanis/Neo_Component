const path = require("path");

module.exports = {
    stories: ["../src/**/*.stories.tsx"],
    // Add any Storybook addons you want here: https://storybook.js.org/addons/
    addons: [
        "@storybook/addon-essentials",
        "storybook-react-i18next",
        {
            name: "@storybook/addon-postcss",
            options: {
                postcssLoaderOptions: {
                    implementation: require("postcss"),
                },
            },
        },
    ],
    webpackFinal: async (config) => {
        config.module.rules.push({
            test: /\,css&/,
            use: [
                {
                    loader: "postcss-loader",
                    options: {
                        ident: "postcss",
                        plugins: [require("tailwindcss"), require("autoprefixer")],
                    },
                },
            ],
            include: path.resolve(__dirname, "../"),
        });

        config.module.rules.push({
            test: /\.(ts|tsx)$/,
            loader: require.resolve("babel-loader"),
            options: {
                presets: [["react-app", { flow: false, typescript: true }]],
            },
        });

        config.module.rules.unshift({
            test: /\.svg$/,
            use: ["@svgr/webpack"],
        });

        return config;
    },
};

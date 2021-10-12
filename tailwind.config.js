module.exports = {
    purge: [],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                neo_black: {
                    black_1: "#112233",
                    black_05: "#778899",
                    black_02: "#BBCCCC",
                },
                neo_lite: {
                    DEFAULT: "#dae5e5",
                },
                neo_blue: {
                    dark: "#152535",
                    DEFAULT: "#172f4b",
                    light: "#7eaab7",
                    blue_sky: "#2fa8fc",
                    modal: "#0f283f",
                },
                neo_pink: {
                    DEFAULT: "#FF1166",
                },
                neo_red: {
                    red_1: "#FF3355",
                    DEFAULT: "#f42b3d",
                },
                neo_orange: {
                    orange_1: "#f42b3d",
                    DEFAULT: "#FF5555",
                },
                neo_green: {
                    DEFAULT: "#CCFF99",
                    base: "#7FEF7F",
                },
                neo_wellow: {
                    DEFAULT: "#FFCC66",
                    send: "#e2dc8f",
                },
                neo_urgency: {
                    very_low: "#7FEF7F",
                    low: "#B6C25D",
                    DEFAULT: "#ED943B",
                    high: "#EF713C",
                    very_high: "#F24D3D",
                    major: "#F42A3E",
                },
            },
            fontSize: {
                xxs: ["0.60rem", { lineHeight: "1rem" }],
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};

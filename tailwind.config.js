module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            //color perso neomanis
            // if you add or update color, update GetHexColorFromTailwindColor too (./src/components/utils/tools.ts).
            colors: {
                neo: {
                    bg: {
                        A: "#152535",
                        B: "#15304C",
                        stat: "#1E1F25",
                    },
                    link: "#7DAAB7",
                    blue: {
                        DEFAULT: "#22AAFF",
                        secondary: "#366688",
                        modal: "#0f283f",
                        planned: "#89D2FF",
                        extraDark: "#111F2E",
                    },
                    expanded: "#17212B",
                    light: {
                        grey: "#DAE5E5",
                    },
                    red: "#F7284F",
                    pink: "#FF1166",
                    green: "#7FEF7F",
                    orange: "#ED943B",
                    urgency: {
                        very: {
                            low: "#7FEF7F",
                            high: "#F24D3D",
                        },
                        low: "#B6C25D",
                        DEFAULT: "#ED943B",
                        high: "#EF713C",
                        major: "#F42A3E",
                    },
                    yellow: {
                        DEFAULT: "#FFCC66",
                        sand: "#e2dc8f",
                    },
                    violet: "#6845ba",
                    grey: {
                        DEFAULT: "#473c61",
                        stats: "#626574",
                    },
                    ticketUrgency: {
                        very: {
                            low: "#89D2FF",
                            high: "#F7284F",
                        },
                        low: "#366688",
                        medium: "#2242B5",
                        high: "#ED943B",
                        major: "#D41F1F",
                    },
                    TTO: "#AFA47B",
                    TTR: "#464A41",
                },
            },
            fontSize: {
                "3xs": ["0.40rem", { lineHeight: "0.80rem" }],
                xxs: ["0.60rem", { lineHeight: "1rem" }],
            },
            height: {
                "1/12": "8.333333%",
                "2/12": "16.666667%",
                "3/12": "25%",
                "4/12": "33.333333%",
                "5/12": "41.666667%",
                "6/12": "50%",
                "7/12": "58.333333%",
                "8/12": "66.666667%",
                "9/12": "75%",
                "10/12": "83.333333%",
                "11/12": "91.666667%",
                compactTicket: "700px",
                chatModal: "600px",
                inputHeight: "38px",
                answerPanel: "520px",
            },
            width: {
                compactTicket: "413px",
            },
            animation: {
                spin: "spin 1.5s linear infinite",
                spinBack: "spinReverseN 1.5s linear infinite",
                spinReverse: "spinReverse 0.2s linear ",
                spinReverseN: "spinReverseN 0.2s linear ",
                spinSlow: "spin 2.5s linear infinite",
                pulseDots: "pulseDots 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                bounceSlow: "bounceSlow 1.5s infinite",
                widthAnim: "widthAnim 0.3s linear",
                widthModalAnim: "widthModalAnim 0.3s linear",
                widthModalAnimOut: "widthModalAnimOut 0.3s linear",
                postionHover: "postionHover 0.3s linear",
                leftH: "leftH 0.3s linear",
                rightH: "rightH 0.3s linear",
                shakeX: "shakeX 2s infinite",
                show: "show 2s infinite",
                slideChatIn: "slideChatIn 0.5s ease-in-out",
                slideChatOut: "slideChatOut 0.5s ease-in-out",
                slideIn: "slideIn 0.3s ease-in-out",
                slideOut: "slideOut 0.5s ease-in-out",
                slideTop: "slideTop 0.5s ease-in-out",
                slideTopReverse: "slideTopReverse 0.5s ease-in-out",
                slideBottom: "slideBottom 0.5s ease-in-out",
                slideBottomReverse: "slideBottomReverse 0.5s ease-in-out",
                positionDelete: "positionDelete 0.3s ease-in-out",
                widthCardOpen: "widthCardOpen 0.3s ease-in-out",
                widthCardClose: "widthCardClose 0.3s ease-in-out",
                onSpin: "onSpin 0.8s ease-in-out",
                onSpinReverse: "onSpinReverse 0.8s ease-in-out",
            },
            keyframes: {
                // animation hover ticket
                widthAnim: {
                    from: { width: 0 },
                    to: { width: "384px" },
                },
                widthModalAnim: {
                    from: { width: 0 },
                    to: { width: "100%" },
                },
                widthModalAnimOut: {
                    from: { width: "100%" },
                    to: { width: 0 },
                },
                widthCardOpen: {
                    from: { height: "0px" },
                    to: { height: "8rem" },
                },
                widthCardClose: {
                    from: { height: " 8rem" },
                    to: { height: "0px" },
                },
                postionHover: {
                    from: { transform: "translateX(192px)" },
                    to: { transform: "translateX(0px)" },
                },
                positionDelete: {
                    from: { top: 0, opacity: 0 },
                    to: { top: "25vh", opacity: 1 },
                },
                leftH: {
                    from: { transform: "translateX(0)" },
                    to: { transform: "translateX(20px)" },
                },
                rightH: {
                    from: { transform: "translateX(0)" },
                    to: { transform: "translateX(-20px)" },
                },
                slideChatIn: {
                    "0%": {
                        transform: "translateX(-500px)",
                    },
                    "100%": {
                        transform: "translateX(0)",
                    },
                },
                slideChatOut: {
                    "0%": {
                        transform: "translateX(0)",
                    },
                    "100%": {
                        transform: "translateX(-500px)",
                    },
                },
                slideIn: {
                    "0%": {
                        transform: "translateX(500px)",
                    },
                    "100%": {
                        transform: "translateX(0)",
                    },
                },
                slideOut: {
                    "0%": {
                        transform: "translateX(0)",
                    },
                    "10%": {
                        transform: "translateX(-50px)",
                    },
                    "100%": {
                        transform: "translateX(110%)",
                    },
                },
                slideTop: {
                    from: { transform: "translateY(110%)" },
                    to: { transform: "translateY(-16px)" },
                },
                slideTopReverse: {
                    "0%": {
                        transform: "translateY(-16px)",
                    },
                    "30%": {
                        transform: "translateY(-66px)",
                    },
                    "100%": {
                        transform: "translateY(110%)",
                    },
                },
                slideBottom: {
                    from: { transform: "translateY(-200%)" },
                    to: { transform: "translateY(-16px)" },
                },
                slideBottomReverse: {
                    "0%": {
                        transform: "translateY(-16px)",
                    },
                    "100%": {
                        transform: "translateY(-200%)",
                    },
                },
                fadeIn: {
                    "0%": {
                        opacity: "0",
                    },
                    "20%": {
                        opacity: "0.1",
                    },
                    "50%": {
                        opacity: "0.7",
                    },
                    "100%": {
                        opacity: "1",
                    },
                },
                show: {
                    "0%": {
                        opacity: "0",
                    },
                    "45%": {
                        opacity: "0",
                    },
                    "55%": {
                        opacity: "1",
                    },
                    "100%": {
                        opacity: "1",
                    },
                },
                spin: {
                    to: {
                        transform: "rotate(360deg)",
                    },
                },
                onSpin: {
                    to: {
                        transform: "rotate(0deg)",
                    },
                    from: {
                        transform: "rotate(360deg)",
                    },
                },
                onSpinReverse: {
                    to: {
                        transform: "rotate(360deg)",
                    },
                    from: {
                        transform: "rotate(0deg)",
                    },
                },
                spinReverse: {
                    from: {
                        transform: "rotate(0deg)",
                    },
                    to: {
                        transform: "rotate(180deg)",
                    },
                },
                spinReverseN: {
                    from: {
                        transform: "rotate(0deg)",
                    },
                    to: {
                        transform: "rotate(-180deg)",
                    },
                },
                pulseDots: {
                    "50%": {
                        opacity: ".3",
                        transform: "scale(.9)",
                    },
                },
                bounceSmall: {
                    "0%, 100%": {
                        transform: "translateY(-5%)",
                        animationTimingFunction: "cubic-bezier(0.8,0,1,1)",
                    },
                    "50%": {
                        transform: "none",
                        animationTimingFunction: "cubic-bezier(0,0,0.2,1)",
                    },
                },
                bounceSlow: {
                    "0%": {
                        transform: "translateY(0)",
                    },
                    "6.5%": {
                        transform: "translateY(-4px)",
                    },
                    "18.5%": {
                        transform: "translateY(3px)",
                    },
                    "31.5%": {
                        transform: "translateY(-2px)",
                    },
                    "43.5%": {
                        transform: "translateY(1px)",
                    },
                    "50%": {
                        transform: "translateY(0)",
                    },
                },
                shakeX: {
                    from: {
                        transform: "translate3d(0, 0, 0)",
                    },
                    to: {
                        transform: "translate3d(0, 0, 0)",
                    },
                    "10%, 30%": {
                        transform: "translate3d(-3px, 0, 0)",
                    },
                    "20%, 40%": {
                        transform: "translate3d(3px, 0, 0)",
                    },
                    "50%, 70%": {
                        transform: "translate3d(-1px, 0, 0)",
                    },
                    "60%": {
                        transform: "translate3d(1px, 0, 0)",
                    },
                    "80%": {
                        transform: "translate3d(0, 0, 0)",
                    },
                    "90%": {
                        transform: "translate3d(0, 0, 0)",
                    },
                },
            },
        },
    },
    plugins: [require("@tailwindcss/line-clamp")],
};

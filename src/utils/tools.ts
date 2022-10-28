import { getStatusColor } from "./statusTools";
import { InputSelectData, TailwindColorApplication, Status, Colors, Priority } from "@neomanis/neo-types";
import { TFunction } from "@neomanis/neo-translation";
import NeoColors from "./neoColors";

type EnumType = {
    [key: number]: string;
};

export function mapEnumToInputSelectData(
    enumarable: EnumType,
    tFunction?: TFunction,
    traductionKey?: string,
    traductionOption?: { context?: string; count?: number }
): InputSelectData[] {
    const enumarableValues = Object.keys(enumarable).filter((key) => isNaN(Number(key)));
    const enumarableKeys = Object.keys(enumarable).filter((key) => !isNaN(Number(key)));
    return enumarableValues.map((key, index) => ({
        label:
            tFunction && traductionKey
                ? tFunction(`${traductionKey}.${lowerCaseFirstLetter(key)}`, { ...traductionOption })
                : key,
        value: parseInt(enumarableKeys[index]),
    }));
}

export function capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function lowerCaseFirstLetter(string: string): string {
    return string.charAt(0).toLowerCase() + string.slice(1);
}

export function getContrastBasedOnHexColor(hexcolor: string): "white" | "black" {
    hexcolor = hexcolor.replace("#", "");
    const r = parseInt(hexcolor.substring(0, 2), 16);
    const g = parseInt(hexcolor.substring(2, 4), 16);
    const b = parseInt(hexcolor.substring(4, 6), 16);
    const yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq >= 128 ? "black" : "white";
}

export function getHexColorFromTailwindColor(tailwindColor: string): string | undefined {
    let neoColors = {
        neo: {
            bg: {
                A: "#152535",
                B: "#0E3864",
            },
            link: "#7DAAB7",
            blue: {
                DEFAULT: "#22AAFF",
                secondary: "#366688",
                modal: "#0f283f",
                planned: "#89D2FF",
                dark: "#092847",
                extraDark: "#111F2E",
            },
            expanded: "#17212B",
            light: {
                grey: "#DAE5E5",
            },
            red: "#F7284F",
            pink: "#FF1166",
            green: {
                DEFAULT: "#7FEF7F",
            },
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
            grey: "#473c61",
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
            stats: {
                black: "#1E1F25",
                TTO: "#AFA47B",
                TTR: "#464A41",
                green: "#1DB17F",
                grey: "#626574",
                purple: "#5715C6",
            },
            settings: {
                grey: "#313235",
                lightGrey: "#4A4B4E",
            },
        },
    };
    tailwindColor.split("-").forEach((color) => {
        neoColors = neoColors[color];
    });
    if (neoColors && neoColors["DEFAULT"]) {
        neoColors = neoColors["DEFAULT"];
    }
    return typeof neoColors === "string" ? neoColors : undefined;
}

export function getStatusOrPriorityColor(
    status: number,
    priority: number,
    isHex: boolean,
    tailwindType?: keyof TailwindColorApplication
): string {
    if (status === Status.Solved || status === Status.Closed || status === Status.Pending) {
        return getStatusColor(status, isHex, tailwindType);
    }
    return getPriorityColor(priority, isHex, tailwindType);
}

export async function sleep(delay: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, delay));
}

const priorityValues = [
    { impact: 1, urgency: 1, priority: 1 },
    { impact: 2, urgency: 1, priority: 1 },
    { impact: 1, urgency: 2, priority: 1 },
    { impact: 2, urgency: 2, priority: 2 },
    { impact: 1, urgency: 3, priority: 2 },
    { impact: 3, urgency: 1, priority: 2 },
    { impact: 1, urgency: 4, priority: 2 },
    { impact: 4, urgency: 1, priority: 2 },
    { impact: 3, urgency: 2, priority: 2 },
    { impact: 2, urgency: 3, priority: 2 },
    { impact: 3, urgency: 3, priority: 3 },
    { impact: 2, urgency: 4, priority: 3 },
    { impact: 4, urgency: 2, priority: 3 },
    { impact: 1, urgency: 5, priority: 3 },
    { impact: 5, urgency: 1, priority: 3 },
    { impact: 4, urgency: 4, priority: 4 },
    { impact: 3, urgency: 4, priority: 4 },
    { impact: 4, urgency: 3, priority: 4 },
    { impact: 5, urgency: 2, priority: 4 },
    { impact: 5, urgency: 3, priority: 4 },
    { impact: 5, urgency: 4, priority: 4 },
    { impact: 2, urgency: 5, priority: 4 },
    { impact: 3, urgency: 5, priority: 4 },
    { impact: 4, urgency: 5, priority: 4 },
    { impact: 6, urgency: 1, priority: 4 },
    { impact: 6, urgency: 2, priority: 4 },
    { impact: 6, urgency: 3, priority: 4 },
    { impact: 1, urgency: 6, priority: 4 },
    { impact: 2, urgency: 6, priority: 4 },
    { impact: 3, urgency: 6, priority: 4 },
    { impact: 5, urgency: 5, priority: 5 },
    { impact: 6, urgency: 4, priority: 5 },
    { impact: 4, urgency: 6, priority: 5 },
    { impact: 6, urgency: 5, priority: 6 },
    { impact: 5, urgency: 6, priority: 6 },
    { impact: 6, urgency: 6, priority: 6 },
];

export function getPriorityValue(impact: number, urgency: number): number | undefined {
    return priorityValues.find((priority) => priority.impact === impact && priority.urgency === urgency)?.priority;
}

const priorityColors: Colors = {
    verylow: {
        hex: NeoColors.ticketUrgency.very.low,
        tailwind: {
            bg: "bg-neo-ticketUrgency-very-low",
            border: "border-neo-ticketUrgency-very-low",
            text: "text-neo-ticketUrgency-very-low",
            fill: "fill-neo-ticketUrgency-very-low",
        },
    },
    low: {
        hex: NeoColors.ticketUrgency.low,
        tailwind: {
            bg: "bg-neo-ticketUrgency-low",
            border: "border-neo-ticketUrgency-low",
            text: "text-neo-ticketUrgency-low",
            fill: "fill-neo-ticketUrgency-low",
        },
    },
    medium: {
        hex: NeoColors.ticketUrgency.medium,
        tailwind: {
            bg: "bg-neo-ticketUrgency-medium",
            border: "border-neo-ticketUrgency-medium",
            text: "text-neo-ticketUrgency-medium",
            fill: "fill-neo-ticketUrgency-medium",
        },
    },
    high: {
        hex: NeoColors.ticketUrgency.high,
        tailwind: {
            bg: "bg-neo-ticketUrgency-high",
            border: "border-neo-ticketUrgency-high",
            text: "text-neo-ticketUrgency-high",
            fill: "fill-neo-ticketUrgency-high",
        },
    },
    veryhigh: {
        hex: NeoColors.ticketUrgency.very.high,
        tailwind: {
            bg: "bg-neo-ticketUrgency-very-high",
            border: "border-neo-ticketUrgency-very-high",
            text: "text-neo-ticketUrgency-very-high",
            fill: "fill-neo-ticketUrgency-very-high",
        },
    },
    major: {
        hex: NeoColors.ticketUrgency.major,
        tailwind: {
            bg: "bg-neo-ticketUrgency-major",
            border: "border-neo-ticketUrgency-major",
            text: "text-neo-ticketUrgency-major",
            fill: "fill-neo-ticketUrgency-major",
        },
    },
    neutral: {
        hex: NeoColors.light.grey,
        tailwind: {
            bg: "bg-neo-light-grey",
            border: "border-neo-light-grey",
            text: "text-neo-light-grey",
            fill: "fill-neo-light-grey",
        },
    },
};

export function getPriorityColor(
    priorityId: number,
    isHex: boolean,
    tailwindType?: keyof TailwindColorApplication
): string {
    if (priorityId >= 1 && priorityId <= 6) {
        const key: keyof Colors = Priority[priorityId].toLowerCase();
        return isHex ? priorityColors[key].hex : priorityColors[key].tailwind[tailwindType];
    }
    return isHex ? priorityColors.neutral.hex : priorityColors.neutral.tailwind[tailwindType];
}

export function getHTMLValue(e: string): string {
    return e.replace(/&lt;/g, "<").replace(/&gt;/g, ">");
}

export function isNotNullOrUndefined(value: unknown) {
    return value !== null && value !== undefined;
}

export function getDisplayedTicketUid(ticketUid: string): string {
    const [itsmCode, ticketId, ticketType] = ticketUid.split("-");
    if (itsmCode && ticketId && ticketType) {
        return `[${itsmCode}] ${ticketType} ${ticketId}`.toUpperCase();
    }
    return ticketUid;
}

export function classNames(...classes: (false | null | undefined | string)[]): string {
    return classes.filter(Boolean).join(" ");
}

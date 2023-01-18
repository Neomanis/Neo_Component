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
    const enumarableKeys = Object.values(enumarable).filter((key) => !isNaN(Number(key)));
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
    return yiq >= 90 ? "black" : "white";
}
/**
 * @deprecated use Neocolors instead (ex: Neocolors.red)
 */
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
            purple: {
                DEFAULT: "#6845ba",
                light: "#B072FF",
            },
            grey: "#473c61",
            ticketUrgency: {
                low: "#89D2FF",
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
    if (status === Status.New || status === Status.Solved || status === Status.Closed || status === Status.Pending) {
        return getStatusColor(status, isHex, tailwindType);
    }
    return getPriorityColor(priority, isHex, tailwindType);
}

export async function sleep(delay: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, delay));
}

const priorityColors: Colors = {
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
    if (priorityId >= 2 && priorityId <= 4) {
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

export function findAndSplitContentWith(
    content: string,
    objectId: string
): { startContent: string; ticketUid: string | null; endContent: string | null } {
    if (!content.includes(getDisplayedTicketUid(objectId))) {
        return { startContent: content, ticketUid: null, endContent: null };
    }
    const [startContent, endContent] = content.split(getDisplayedTicketUid(objectId));
    return { startContent, ticketUid: objectId, endContent };
}

export function createTimeout(handler: () => void, delay: number) {
    const id = setTimeout(handler, delay);
    return {
        clear: () => {
            clearTimeout(id);
            handler = () => {
                return;
            };
        },
        trigger: () => {
            clearTimeout(id);
            handler();
        },
    };
}

import { TFunction } from "react-i18next";
import { getPriorityColor } from "./priorityTools";
import { getStatusColor } from "./statusTools";
import { Status } from "../../enumeration";
import { IInputSelectSearchableData, ITailwindColorApplication } from "../../interface";

type EnumType = {
    [key: number]: string;
};

export function mapEnumToInputSelectSearchableData(
    enumarable: EnumType,
    tFunction?: TFunction,
    traductionKey?: string,
    traductionOption?: { context?: string; count?: number }
): IInputSelectSearchableData[] {
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
                B: "#15304C",
            },
            link: "#7DAAB7",
            blue: {
                DEFAULT: "#22AAFF",
                secondary: "#366688",
                modal: "#0f283f",
                planned: "#89D2FF",
            },
            expanded: "#111F2E",
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
            grey: "#473c61",
            ticketUrgency: {
                very: {
                    low: "#89D2FF",
                    high: "#F7284F",
                },
                low: "#366688",
                medium: "#15304C",
                high: "#ED943B",
                major: "#D41F1F",
            },
        },
    };
    tailwindColor.split("-").forEach((color) => {
        neoColors = neoColors[color];
    });
    return typeof neoColors === "string" ? neoColors : undefined;
}

export function getStatusOrPriorityColor(
    status: number,
    priority: number,
    isHex: boolean,
    tailwindType?: keyof ITailwindColorApplication
): string {
    if (status === Status.Solved || status === Status.Closed || status === Status.Pending) {
        return getStatusColor(status, isHex, tailwindType);
    }
    return getPriorityColor(priority, isHex, tailwindType);
}

export async function sleep(delay: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, delay));
}

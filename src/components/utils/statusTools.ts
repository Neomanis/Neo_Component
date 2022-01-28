import { statusSelection } from "../..";
import { Status } from "../../enumeration";
import { Colors, ITailwindColorApplication } from "../../interface";

export function getStatusColor(
    statusId: number,
    isHex: boolean,
    tailwindType?: keyof ITailwindColorApplication
): string {
    const statusColors: Colors = {
        new: {
            tailwind: {
                bg: "bg-neo-light-grey",
                border: "border-neo-light-grey",
                text: "text-neo-light-grey",
            },
            hex: "#dae5e5",
        },
        assigned: {
            tailwind: { bg: "bg-neo-blue", border: "border-neo-blue", text: "text-neo-blue" },

            hex: "#2fa8fc",
        },
        planned: {
            tailwind: { bg: "bg-neo-blue-planned", border: "border-neo-blue-planned", text: "text-neo-blue-planned" },

            hex: "#89D2FF",
        },
        pending: {
            tailwind: { bg: "bg-neo-yellow-sand", border: "border-neo-yellow-sand", text: "text-neo-yellow-sand" },

            hex: "#E2DC8F",
        },
        solved: {
            tailwind: { bg: "bg-neo-green", border: "border-neo-green", text: "text-neo-green" },
            hex: "#7FEF7F",
        },
        closed: {
            tailwind: { bg: "bg-neo-green", border: "border-neo-green", text: "text-neo-green" },
            hex: "#7FEF7F",
        },
    };

    const key: keyof Colors = Status[statusId].toLowerCase();
    return isHex ? statusColors[key].hex : statusColors[key].tailwind[tailwindType];
}

export function getStatusText(statusId: number): string {
    return Status[statusId].toLowerCase();
}

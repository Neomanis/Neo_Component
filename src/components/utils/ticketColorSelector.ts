import { Status, Priority } from "../../enumeration";

interface ColorTypes {
    tailwind: string;
    hex: string;
}

interface Colors {
    [key: string]: ColorTypes;
}

export function getStatusColor(statusId: number, isHex: boolean): string {
    const statusColors: Colors = {
        new: {
            tailwind: "bg-neo_lite",
            hex: "#dae5e5",
        },
        pending: {
            tailwind: "bg-neo_wellow-send",
            hex: "#E2DC8F",
        },
        assigned: {
            tailwind: "bg-neo_blue-blue_sky",
            hex: "#2fa8fc",
        },
        planned: {
            tailwind: "bg-neo_blue-blue_sky",
            hex: "#2fa8fc",
        },
        solved: {
            tailwind: "bg-neo_blue-dark",
            hex: "#152535",
        },
        closed: {
            tailwind: "bg-neo_blue-dark",
            hex: "#152535",
        },
    };

    const key: keyof Colors = Status[statusId].toLowerCase();
    return isHex ? statusColors[key].hex : statusColors[key].tailwind;
}

export function getPriorityColor(priorityId: number, isHex: boolean): string {
    const priorityColors: Colors = {
        verylow: {
            hex: "#7FEF7F",
            tailwind: "bg-neo_urgency-very_low",
        },
        low: {
            hex: "#B6C25D",
            tailwind: "bg-neo_urgency-low",
        },
        medium: {
            hex: "#ED943B",
            tailwind: "bg-neo_urgency",
        },
        high: {
            hex: "#EF713C",
            tailwind: "bg-neo_urgency-high",
        },
        veryhigh: {
            hex: "#F24D3D",
            tailwind: "bg-neo_urgency-very_high",
        },
        major: {
            hex: "#F42A3E",
            tailwind: "bg-neo_urgency-major",
        },
    };
    if (priorityId >= 1 && priorityId <= 6) {
        const key: keyof Colors = Priority[priorityId].toLowerCase();
        return isHex ? priorityColors[key].hex : priorityColors[key].tailwind;
    }
    return isHex ? "#FFFFFF" : "bg-neo_lite";
}

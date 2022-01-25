import { Status } from "../../enumeration";
import { Colors } from "../../interface";

export function getStatusColor(statusId: number, isHex: boolean): string {
    const statusColors: Colors = {
        new: {
            tailwind: "bg-neo-light-grey",
            hex: "#dae5e5",
        },
        assigned: {
            tailwind: "bg-neo-blue",
            hex: "#2fa8fc",
        },
        planned: {
            tailwind: "bg-neo-blue-planned",
            hex: "#89D2FF",
        },
        pending: {
            tailwind: "bg-neo-yellow-sand",
            hex: "#E2DC8F",
        },
        solved: {
            tailwind: "neo-green",
            hex: "#7FEF7F",
        },
        closed: {
            tailwind: "neo-green",
            hex: "#7FEF7F",
        },
    };

    const key: keyof Colors = Status[statusId].toLowerCase();
    return isHex ? statusColors[key].hex : statusColors[key].tailwind;
}

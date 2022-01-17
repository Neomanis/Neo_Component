import { Status } from "../../enumeration";
import { Colors } from "../../interface";

export function getStatusColor(statusId: number, isHex: boolean): string {
    const statusColors: Colors = {
        new: {
            tailwind: "bg-neo-light-grey",
            hex: "#dae5e5",
        },
        pending: {
            tailwind: "bg-neo-yellow-sand",
            hex: "#E2DC8F",
        },
        assigned: {
            tailwind: "bg-neo-blue",
            hex: "#2fa8fc",
        },
        planned: {
            tailwind: "bg-neo-blue",
            hex: "#2fa8fc",
        },
        solved: {
            tailwind: "neo-violet",
            hex: "#6845ba",
        },
        closed: {
            tailwind: "neo-grey",
            hex: "#473c61",
        },
    };

    const key: keyof Colors = Status[statusId].toLowerCase();
    return isHex ? statusColors[key].hex : statusColors[key].tailwind;
}

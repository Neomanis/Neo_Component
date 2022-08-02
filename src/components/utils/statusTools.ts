import { TailwindColorApplication, StatusTraductionKey, Status } from "@neomanis/neo-types";

const statusColors = {
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

export function getStatusColor(
    statusId: Status,
    isHex: boolean,
    tailwindType?: keyof TailwindColorApplication
): string {
    switch (statusId) {
        case Status.New:
            return isHex ? statusColors["new"]?.hex : statusColors["new"].tailwind[tailwindType];
        case Status.Assigned:
            return isHex ? statusColors["assigned"]?.hex : statusColors["assigned"].tailwind[tailwindType];
        case Status.Pending:
            return isHex ? statusColors["pending"]?.hex : statusColors["pending"].tailwind[tailwindType];
        case Status.Planned:
            return isHex ? statusColors["planned"]?.hex : statusColors["planned"].tailwind[tailwindType];
        case Status.Solved:
            return isHex ? statusColors["solved"]?.hex : statusColors["solved"].tailwind[tailwindType];
        case Status.Closed:
            return isHex ? statusColors["closed"]?.hex : statusColors["closed"].tailwind[tailwindType];
        default:
            break;
    }
}

export function getStatusText(statusId: Status): StatusTraductionKey {
    return Status[statusId].toLowerCase() as StatusTraductionKey;
}

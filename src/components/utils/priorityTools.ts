import { Colors, TailwindColorApplication, Priority } from "@neomanis/neo-types";
import { getHexColorFromTailwindColor } from "./tools";

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
        hex: getHexColorFromTailwindColor("neo-ticketUrgency-very-low"),
        tailwind: {
            bg: "bg-neo-ticketUrgency-very-low",
            border: "border-neo-ticketUrgency-very-low",
            text: "text-neo-ticketUrgency-very-low",
        },
    },
    low: {
        hex: getHexColorFromTailwindColor("neo-ticketUrgency-low"),
        tailwind: {
            bg: "bg-neo-ticketUrgency-low",
            border: "border-neo-ticketUrgency-low",
            text: "text-neo-ticketUrgency-low",
        },
    },
    medium: {
        hex: getHexColorFromTailwindColor("neo-ticketUrgency-medium"),
        tailwind: {
            bg: "bg-neo-ticketUrgency-medium",
            border: "border-neo-ticketUrgency-medium",
            text: "text-neo-ticketUrgency-medium",
        },
    },
    high: {
        hex: getHexColorFromTailwindColor("neo-ticketUrgency-high"),
        tailwind: {
            bg: "bg-neo-ticketUrgency-high",
            border: "border-neo-ticketUrgency-high",
            text: "text-neo-ticketUrgency-high",
        },
    },
    veryhigh: {
        hex: getHexColorFromTailwindColor("neo-ticketUrgency-very-high"),
        tailwind: {
            bg: "bg-neo-ticketUrgency-very-high",
            border: "border-neo-ticketUrgency-very-high",
            text: "text-neo-ticketUrgency-very-high",
        },
    },
    major: {
        hex: getHexColorFromTailwindColor("neo-ticketUrgency-major"),
        tailwind: {
            bg: "bg-neo-ticketUrgency-major",
            border: "border-neo-ticketUrgency-major",
            text: "text-neo-ticketUrgency-major",
        },
    },
    neutral: {
        hex: getHexColorFromTailwindColor("neo-light-grey"),
        tailwind: {
            bg: "bg-neo-light-grey",
            border: "border-neo-light-grey",
            text: "text-neo-light-grey",
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

import { Colors } from "../../interface";
import { Priority } from "../../enumeration";

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

export function getPriorityColor(priorityId: number, isHex: boolean): string {
    const priorityColors: Colors = {
        verylow: {
            hex: "#7FEF7F",
            tailwind: "bg-neo-urgency-very-low",
        },
        low: {
            hex: "#B6C25D",
            tailwind: "bg-neo-urgency-low",
        },
        medium: {
            hex: "#ED943B",
            tailwind: "bg-neo-urgency",
        },
        high: {
            hex: "#EF713C",
            tailwind: "bg-neo-urgency-high",
        },
        veryhigh: {
            hex: "#F24D3D",
            tailwind: "bg-neo-urgency-very-high",
        },
        major: {
            hex: "#F42A3E",
            tailwind: "bg-neo-urgency-major",
        },
    };
    if (priorityId >= 1 && priorityId <= 6) {
        const key: keyof Colors = Priority[priorityId].toLowerCase();
        return isHex ? priorityColors[key].hex : priorityColors[key].tailwind;
    }
    return isHex ? "#FFFFFF" : "bg-neo-light-grey";
}

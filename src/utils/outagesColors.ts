import { Outage } from "@neomanis/neo-types";

function isHidden(outage: Outage): boolean {
    return Boolean(
        new Date(outage.startAt) > new Date() ||
            (outage.endAt &&
                outage.hideAt &&
                new Date(outage.endAt) < new Date() &&
                new Date() < new Date(outage.hideAt))
    );
}

export function getOutageTextColor(outage: Outage): string {
    if (isHidden(outage)) {
        return "text-neo-link";
    }
    return outage.severity === "major" ? "text-neo-urgency-major" : "text-neo-urgency";
}

export function getOutageDivideColor(outage: Outage): string {
    if (isHidden(outage)) {
        return "divide-neo-link";
    }
    return outage.severity === "major" ? "divide-neo-urgency-major" : "divide-neo-urgency";
}

export function getOutageBorderColor(outage: Outage): string {
    if (isHidden(outage)) {
        return "border-neo-link";
    }
    return outage.severity === "major" ? "border-neo-urgency-major" : "border-neo-urgency";
}

export function getOutageSVGColor(outage: Outage): string {
    if (isHidden(outage)) {
        return "#7DAAB7";
    }
    return outage.severity === "major" ? "#F42A3E" : "#ED943B";
}

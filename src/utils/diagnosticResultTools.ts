import { DiagnosticResult, TailwindColorApplication } from "@neomanis/neo-types";

const diagnosticColors = {
    solved: {
        bg: "bg-neo-green",
        border: "border-neo-green",
        text: "text-neo-green",
        fill: "fill-neo-green",
    },
    failed: {
        bg: "bg-neo-red",
        border: "border-neo-red",
        text: "text-neo-red",
        fill: "fill-neo-red",
    },
    escalate: {
        bg: "bg-neo-orange",
        border: "border-neo-orange",
        text: "text-neo-orange",
        fill: "fill-neo-orange",
    },
    awaiting: {
        bg: "bg-neo-purple-light",
        border: "border-neo-purple-light",
        text: "text-neo-purple-light",
        fill: "fill-neo-purple-light",
    },
};

export function getColorFromDiagnosticResult(
    result: DiagnosticResult,
    tailwindType: keyof TailwindColorApplication
): string {
    switch (result) {
        case DiagnosticResult.Solved:
            return diagnosticColors["solved"][tailwindType];
        case DiagnosticResult.Failed:
            return diagnosticColors["failed"][tailwindType];
        case DiagnosticResult.Escalate:
            return diagnosticColors["escalate"][tailwindType];
        case DiagnosticResult.Awaiting:
            return diagnosticColors["awaiting"][tailwindType];
        default:
            break;
    }
}

export function getServiceStatusColor(tailwindProperty: "bg" | "text", status: number | undefined): string {
    if (tailwindProperty === "bg") {
        switch (status) {
            case 200:
                return "bg-green-400";
            case 202:
                return "bg-blue-500";
            case 500:
                return "bg-yellow-400";
            case 503:
                return "bg-red-500";
            default:
                return "bg-yellow-600";
        }
    } else if (tailwindProperty === "text") {
        switch (status) {
            case 200:
                return "text-green-400";
            case 202:
                return "text-blue-500";
            case 500:
                return "text-yellow-400";
            case 503:
                return "text-red-500";
            default:
                return "text-yellow-600";
        }
    }
}

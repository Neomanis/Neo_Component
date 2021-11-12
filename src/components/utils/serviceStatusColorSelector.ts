export function getServiceStatusColor(status: number | undefined): string {
    switch (status) {
        case 200:
            return "green-400";
        case 202:
            return "blue-500";
        case 500:
            return "yellow-400";
        case 503:
            return "red-500";
        default:
            return "yellow-600";
    }
}

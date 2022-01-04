export enum Status {
    New = 1,
    Assigned = 2,
    Planned = 3,
    Pending = 4,
    Solved = 5,
    Closed = 6,
}

export enum Priority {
    VeryLow = 1,
    Low = 2,
    Medium = 3,
    High = 4,
    VeryHigh = 5,
    Major = 6,
}

export const typeSelection = [
    { id: 1, value: "Incident" },
    { id: 2, value: "Request" },
];

export const statusSelection = [
    { id: 1, value: "New" },
    { id: 2, value: "In progress (assigned)" },
    { id: 3, value: "In progress (planned)" },
    { id: 4, value: "Pending" },
    { id: 5, value: "Solved" },
    { id: 6, value: "Closed" },
];

export const prioritySelection = [
    { id: 1, value: "Very Low" },
    { id: 2, value: "Low" },
    { id: 3, value: "Medium" },
    { id: 4, value: "High" },
    { id: 5, value: "Very High" },
    { id: 6, value: "Major" },
];

export const scaleSelection = [
    { id: 2, value: "Low" },
    { id: 3, value: "Medium" },
    { id: 4, value: "High" },
];

export const validationSelection = [
    { id: 1, value: "Not subject to validation" },
    { id: 2, value: "Waiting for validation" },
    { id: 3, value: "Accepted" },
    { id: 4, value: "Refused" },
];

export const categories = [
    { id: 0, value: "tool" },
    { id: 1, value: "userNetwork" },
    { id: 2, value: "userSystem" },
    { id: 3, value: "userTelephony" },
    { id: 4, value: "user" },
    { id: 5, value: "server" },
    { id: 6, value: "userPrinter" },
    { id: 7, value: "serverNetwork" },
];

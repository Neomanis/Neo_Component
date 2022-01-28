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

export enum Type {
    Incident = 1,
    Request = 2,
}

export enum Scale {
    VeryLow = 1,
    Low = 2,
    Medium = 3,
    High = 4,
    VeryHigh = 5,
    Major = 6,
}

export enum Validation {
    NoValidation = 1,
    Waiting = 2,
    Accepted = 3,
    Refused = 4,
}

export enum Category {
    Tool = 0,
    UserNetwork = 1,
    UserSystem = 2,
    UserTelephony = 3,
    User = 4,
    Server = 5,
    UserPrinter = 6,
    ServerNetwork = 7,
}
export const typeSelection = [
    { id: 1, value: "incident" },
    { id: 2, value: "request" },
];

export const statusSelection = [
    { id: 1, value: "new" },
    { id: 2, value: "inProgressAssigned" },
    { id: 3, value: "inProgressPlanned" },
    { id: 4, value: "pending" },
    { id: 5, value: "solved" },
    { id: 6, value: "closed" },
];

export const scaleSelection = [
    { id: 1, value: "veryLow" },
    { id: 2, value: "low" },
    { id: 3, value: "medium" },
    { id: 4, value: "high" },
    { id: 5, value: "veryHigh" },
    { id: 6, value: "major" },
];

export const validationSelection = [
    { id: 1, value: "noValidation" },
    { id: 2, value: "waiting" },
    { id: 3, value: "accepted" },
    { id: 4, value: "refused" },
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

import { Diagnostic, DiagResult } from "@neomanis/neo-types";

export const fakeDiag: Diagnostic = {
    _id: "63330a6ed152a617b60cba5e",
    ticketUid: "1gl-450-INC",
    username: "User02",
    userNeoId: 7,
    techName: "admin01",
    techNeoId: 2,
    computerName: "pre01-clt01",
    target: "https://ajankloss.neomanis.bzh:8010/a477e5ce-99ea-4fe1-a8e1-401f39921e58",
    diagnostics: [
        {
            runId: "1664376143263",
            name: "test_approval_parent",
            diagExecutionTime: 2139,
            helloWorld: "Congratulations, it's working !",
            results: [
                {
                    Action: {
                        description: "Action successful",
                        id: 2,
                        result: "OK",
                        date: "2022-09-28T14:42:24.070Z",
                        executionTime: 692,
                    },
                },
                {
                    name: "test_approval_enfant",
                    results: [
                        {
                            Action: {
                                description: "Check user account healthy OK",
                                id: 5,
                                result: "OK",
                                date: "2022-09-27T15:59:01.807Z",
                                executionTime: 505,
                            },
                        },
                        {
                            Action: {
                                description: "approval OK",
                                id: 6,
                                result: "OK",
                                date: "2022-09-27T15:59:27.403Z",
                                executionTime: 505,
                            },
                        },
                        {
                            name: "test_approval_enfant 2",
                            results: [
                                {
                                    Action: {
                                        description: "Action rejected",
                                        id: 5,
                                        result: "Rejected",
                                        date: "2022-09-27T15:59:01.807Z",
                                        executionTime: 505,
                                    },
                                },
                                {
                                    Action: {
                                        description: "Action failed",
                                        id: 6,
                                        result: "Failed",
                                        date: "2022-09-27T15:59:27.403Z",
                                        executionTime: 505,
                                    },
                                },
                                {
                                    Exit: {
                                        id: 7,
                                        action: "Action escalate",
                                        type: "escalate",
                                        position: { x: 1980, y: 30 },
                                        isLocked: false,
                                    },
                                },
                            ],
                        },
                        {
                            Exit: {
                                id: 7,
                                action: "Is stupide but is Solved",
                                type: "solved",
                                position: { x: 1980, y: 30 },
                                isLocked: false,
                            },
                        },
                    ],
                },
                {
                    Exit: {
                        id: 1,
                        action: "Exite escalate",
                        type: "escalate",
                        position: { x: 1980, y: 170 },
                        isLocked: false,
                    },
                },
            ],
        },
    ],
    awaiting: [],
    __v: 8,
} as unknown as Diagnostic;

export const fakeDiagError: Diagnostic = {
    _id: "63330a6ed152a617b60cba5e",
    ticketUid: "1gl-450-INC",
    username: "User02",
    userNeoId: 7,
    techName: "admin01",
    techNeoId: 2,
    computerName: "pre01-clt01",
    target: "https://ajankloss.neomanis.bzh:8010/a477e5ce-99ea-4fe1-a8e1-401f39921e58",
    diagnostics: [
        {
            runId: "16643761463263",
            name: "test_approval_ERROR_EXIT",
            diagExecutionTime: 2139,
            helloWorld: "Congratulations, it's working !",
            results: [
                {
                    Action: {
                        description: "hello world, mais plus vieux",
                        id: 2,
                        result: "OK",
                        date: "2022-09-28T14:42:24.070Z",
                        executionTime: 692,
                    },
                },

                {
                    name: "test_approval_enfant",
                    results: [
                        {
                            Action: {
                                description: "Action Rejected",
                                id: 6,
                                result: "Rejected",
                                date: "2022-09-27T15:59:27.403Z",
                                executionTime: 505,
                            },
                        },
                        {
                            Error: {
                                message: "Error Exit",
                                code: 404,
                                runId: "1664376143263",
                            },
                        },
                    ],
                },
            ],
        },
    ],
    awaiting: [],
    __v: 8,
} as unknown as Diagnostic;

export const fakeAwaitingDiag: Diagnostic = {
    _id: "63330a6ed152a617b60cba5e",
    ticketUid: "1gl-450-INC",
    username: "User02",
    userNeoId: 7,
    techName: "admin01",
    techNeoId: 2,
    computerName: "pre01-clt01",
    target: "https://ajankloss.neomanis.bzh:8010/a477e5ce-99ea-4fe1-a8e1-401f39921e58",
    diagnostics: [
        {
            runId: "1664376143263",
            name: "test_approval_parent",
            diagExecutionTime: 2139,
            helloWorld: "Congratulations, it's working !",
            results: [
                {
                    Action: {
                        description: "hello world, mais plus vieux",
                        id: 2,
                        result: "OK",
                        date: "2022-09-28T14:42:24.070Z",
                        executionTime: 692,
                    },
                },
                {
                    name: "test_approval_enfant",
                    results: [
                        {
                            Action: {
                                description: "Action rejected",
                                id: 6,
                                result: "Rejected",
                                date: "2022-09-27T15:59:27.403Z",
                                executionTime: 505,
                            },
                        },
                        {
                            name: "test_approval_enfant 2",
                            results: [
                                {
                                    Action: {
                                        description: "Check user account healthy",
                                        id: 5,
                                        result: "OK",
                                        date: "2022-09-27T15:59:01.807Z",
                                        executionTime: 505,
                                    },
                                },
                                {
                                    Exit: {
                                        id: 7,
                                        action: "Approval failed",
                                        type: "escalate",
                                        position: { x: 1980, y: 30 },
                                        isLocked: false,
                                    },
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    ],
    awaiting: [
        {
            bookNames: ["test_approval_parent", "test_approval_enfant"],
            runId: "1664376143263",
            currentChapter: {
                id: 1,
                desc: "lancement d'un approval via sous-livre",
                actionParams: {
                    type: "book",
                    name: "test_approval_enfant",
                    params: [],
                },
                follow: {
                    yes: { type: "exits", id: 1 },
                    no: { type: "exits", id: 2 },
                },
                position: { x: 170, y: 170 },
                isLocked: false,
            },
            username: "User02",
            userNeoId: 7,
            startTime: 1308,
        },
    ],
    __v: 8,
} as unknown as Diagnostic;

export const fakeDiagChild: DiagResult = {
    name: "test_approval_enfant",
    results: [
        {
            Action: {
                description: "Check user account healthy OK",
                id: 5,
                result: "OK",
                date: new Date("2022-09-27T15:59:27.403Z"),
                executionTime: 505,
            },
        },
        {
            Action: {
                description: "approval OK",
                id: 6,
                result: "OK",
                date: new Date("2022-09-27T15:59:27.403Z"),
                executionTime: 505,
            },
        },
        {
            name: "test_approval_enfant 2",
            results: [
                {
                    Action: {
                        description: "Action rejected",
                        id: 5,
                        result: "Rejected",
                        date: new Date("2022-09-27T15:59:27.403Z"),
                        executionTime: 505,
                    },
                },
                {
                    Action: {
                        description: "Action failed",
                        id: 6,
                        result: "Failed",
                        date: new Date("2022-09-27T15:59:27.403Z"),
                        executionTime: 505,
                    },
                },
                {
                    Exit: {
                        id: 7,
                        action: "Action escalate",
                        type: "escalate",
                        position: { x: 1980, y: 30 },
                        isLocked: false,
                    },
                },
            ],
        },
        {
            Exit: {
                id: 7,
                action: "Is stupide but is Solved",
                type: "solved",
                position: { x: 1980, y: 30 },
                isLocked: false,
            },
        },
    ],
};
export const fakeDiagOnlyApproval: Diagnostic = {
    _id: "63330a6ed152a617b60cba5e",
    ticketUid: "1gl-450-INC",
    username: "User02",
    userNeoId: 7,
    techName: "admin01",
    techNeoId: 2,
    computerName: "pre01-clt01",
    target: "https://ajankloss.neomanis.bzh:8010/a477e5ce-99ea-4fe1-a8e1-401f39921e58",
    diagnostics: [
        {
            runId: "1668764076456",
            name: "lama_solo",
            diagExecutionTime: 3376,
            psycho: "qsd",
            results: [] as DiagResult[],
        },
    ],
    awaiting: [
        {
            bookNames: ["lama_solo"],
            runId: "1668764076456",
            currentChapter: {
                id: 1,
                desc: "Lalalala",
                actionParams: {
                    type: "approval",
                    params: [
                        {
                            type: "message",
                            value: "Can you shut up ?",
                            recipient: [
                                {
                                    type: "value",
                                    value: "atest",
                                },
                            ],
                        },
                    ],
                },
                follow: {
                    yes: {
                        type: "exits",
                        id: 1,
                    },
                    no: {
                        type: "exits",
                        id: 2,
                    },
                },
                position: {
                    x: 180,
                    y: 210,
                },
                isLocked: false,
            },
            username: "utest",
            userNeoId: 6,
        },
    ],
} as unknown as Diagnostic;

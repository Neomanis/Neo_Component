import { Diagnostic, DiagResult } from "@neomanis/neo-types";

export const fakeDiag: Diagnostic = {
    _id: "64131bfc9c9e79e75605ccb8",
    ticketUid: "1gl-5638",
    username: "utest",
    userNeoId: 15,
    techName: "atest",
    techNeoId: 1,
    computerName: "desktop-8dstmdd",
    target: "https://services.neomanis.bzh:8010/dca9ea89-a660-48a8-b7dd-f69918d79359",
    diagnostics: [
        {
            runId: "1678976435091",
            launchDate: "2023-03-16T14:20:35.091Z",
            name: "jjj etstt",
            bookId: "641324fd9c9e79e75605cd2f",
            diagExecutionTime: 626,
            outputs: {
                domainControllerList: "",
                faultyDomainControllerList: "",
                nbDomainController: "0",
                isOneDomainController: "False",
                domainController: "",
                domainControllerRidRole: "",
                domainControllerSchemaRole: "",
                domainControllerPdcRole: "",
                domainControllerNamingRole: "",
                domainControllerInfrastructureRole: "",
                errorMessage: 'Exception calling "GetCurrentDomain" with "0" argument(s)',
            },
            results: [
                {
                    Error: {
                        name: "OrchestratorError",
                        message: "connect ECONNREFUSED 127.0.0.1:80",
                        code: null,
                        runId: "1678976435091",
                        data: {
                            failedAction: {
                                actionId: 1,
                                type: "script",
                                scriptName: "check_printer_installed",
                                parameters: ["utest"],
                            },
                        },
                    },
                },
                {
                    Action: {
                        description:
                            "C:\\neosolutions\\temp\\5905019_retrieve_powershell_version.ps1 : Impossible de traiter la transformation d'argument sur le param<61>tre <20>expectedVersion<6F>. Impossible de convertir la valeur en type System.String. Au caract<63>re Ligne:1 : 70 + ... osolutions\\temp\\5905019_retrieve_powershell_version.ps1 desktop xx,xx + ~~~~~ + CategoryInfo : InvalidData : (:) [5905019_retrieve_powershell_version.ps1], ParameterBindingArgumentTra nsformationException + FullyQualifiedErrorId : ParameterArgumentTransformationError,5905019_retrieve_powershell_version.ps1",
                        id: 1,
                        type: "script",
                        result: "Failed",
                        date: "2023-03-16T14:20:35.181Z",
                        executionTime: 15,
                    },
                },
                {
                    name: "domain : retrieve DC informations",
                    date: "2023-03-16T14:20:35.187Z",
                    diagExecutionTime: 511,
                    launchedBy: {
                        book: "jjj",
                        actionId: 3,
                        type: "book",
                        description: "hh",
                    },
                    bookId: "640a0789f9146ab888e87ee7",
                    result: "Failed",
                    results: [
                        {
                            Action: {
                                description: "Retrieve Domain Controllers informations",
                                id: 1,
                                type: "script",
                                result: "Failed",
                                date: "2023-03-16T14:20:35.679Z",
                                executionTime: 368,
                            },
                        },
                        {
                            Exit: {
                                id: 2,
                                action: "DC informations retrieval issue",
                                type: "escalate",
                                position: {
                                    x: 480,
                                    y: 100,
                                },
                                isLocked: false,
                            },
                        },
                    ],
                },
                {
                    Exit: {
                        id: 2,
                        action: "raté",
                        type: "escalate",
                        position: {
                            x: 600,
                            y: 520,
                        },
                        isLocked: false,
                    },
                },
            ],
        },
    ],
    awaiting: [],
    __v: 1,
} as unknown as Diagnostic;

export const fakeDiagError: Diagnostic = {
    runId: "1678976435091",
    launchDate: "2023-03-16T14:20:35.091Z",
    name: "Fake Error",
    bookId: "641324fd9c9e79e75605cd2f",
    diagExecutionTime: 626,
    outputs: {
        domainControllerList: "",
        faultyDomainControllerList: "",
        nbDomainController: "0",
        isOneDomainController: "False",
        domainController: "",
        domainControllerRidRole: "",
        domainControllerSchemaRole: "",
        domainControllerPdcRole: "",
        domainControllerNamingRole: "",
        domainControllerInfrastructureRole: "",
        errorMessage: 'Exception calling "GetCurrentDomain" with "0" argument(s)',
    },
    diagnostics: [
        {
            runId: "16643761463263",
            name: "test_approval_ERROR_EXIT",
            diagExecutionTime: 2139,
            helloWorld: "Congratulations, it's working !",
            results: [
                {
                    Error: {
                        message: "Error Exit",
                        code: 404,
                        runId: "1664376143263",
                        date: "2023-03-16T14:20:35.679Z",
                        executionTime: 368,
                    },
                },
                {
                    name: "test_approval_enfant",
                    results: [
                        {
                            Action: {
                                description: "Action Rejected",
                                id: 6,
                                type: "type",
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
                                date: "2023-03-16T14:20:35.679Z",
                                executionTime: 368,
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
            runId: "1678976435091",
            launchDate: "2023-03-16T14:20:35.091Z",
            name: "test_approval_parent",
            bookId: "641324fd9c9e79e75605cd2f",
            diagExecutionTime: 626,
            outputs: {
                domainControllerList: "",
                faultyDomainControllerList: "",
                nbDomainController: "0",
                isOneDomainController: "False",
                domainController: "",
                domainControllerRidRole: "",
                domainControllerSchemaRole: "",
                domainControllerPdcRole: "",
                domainControllerNamingRole: "",
                domainControllerInfrastructureRole: "",
                errorMessage: 'Exception calling "GetCurrentDomain" with "0" argument(s)',
            },
            results: [
                {
                    Action: {
                        description: "hello world, mais plus vieux",
                        id: 2,
                        type: "type",
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
                                type: "type",
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
                                        type: "type",
                                        result: "OK",
                                        date: "2022-09-27T15:59:01.807Z",
                                        executionTime: 505,
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
            bookNames: ["test_approval_parent", "test_approval_enfant", "test_approval_enfant 2"],
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
    bookId: "book_id_1",
    results: [
        {
            Action: {
                description: "Check user account healthy OK",
                id: 5,
                type: "type",
                result: "OK",
                date: new Date("2022-09-27T15:59:27.403Z"),
                executionTime: 505,
            },
        },
        {
            Action: {
                description: "approval OK",
                id: 6,
                type: "type",
                result: "OK",
                date: new Date("2022-09-27T15:59:27.403Z"),
                executionTime: 505,
            },
        },
        {
            name: "test_approval_enfant 2",
            bookId: "book_id_2",
            results: [
                {
                    Action: {
                        description: "Action rejected",
                        id: 5,
                        type: "type",
                        result: "Rejected",
                        date: new Date("2022-09-27T15:59:27.403Z"),
                        executionTime: 505,
                    },
                },
                {
                    Action: {
                        description: "Action failed",
                        id: 6,
                        type: "type",
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
    _id: "637b99631339e0807fa3cdb5",
    ticketUid: "1gl-5151-INC",
    username: "utest",
    userNeoId: 15,
    techName: "atest",
    techNeoId: 1,
    computerName: "desktop-8dstmdd",
    target: "https://services.neomanis.bzh:8010/4cfd551e-da03-4a04-9af0-7206a504f92b",
    diagnostics: [
        {
            runId: "1669045130247",
            name: "livre_test",
            diagExecutionTime: 5131,
        },
    ],
    awaiting: [
        {
            bookNames: ["livre_test"],
            runId: "1669045130247",
            currentChapter: {
                id: 1,
                desc: "demande oui non",
                actionParams: {
                    type: "approval",
                    params: [
                        {
                            type: "message",
                            value: "oui ou non ?",
                            recipient: [
                                {
                                    type: "value",
                                    value: "stest",
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
                    x: 20,
                    y: 210,
                },
                isLocked: false,
            },
            username: "utest",
            userNeoId: 15,
        },
    ],
    __v: 6,
} as unknown as Diagnostic;

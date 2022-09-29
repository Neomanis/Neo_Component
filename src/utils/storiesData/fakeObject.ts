import { NeoUser, Notification, Ticket, GroupObject, User, Role, Diagnostic } from "@neomanis/neo-types";

export const fakeTicket: Ticket = {
    uid: "1gl-1523-INC",
    id: 32,
    entities_id: 0,
    name: "Test JM a peu pres avec un titre genre fyys  fyezy fyezy y yreyz yreyz y y yreyz",
    date: "2021-07-12 15:52:44",
    closedate: undefined,
    solvedate: undefined,
    date_mod: " 2021-07-12 15:52:44",
    neoIdLastupdater: 2,
    status: 1,
    requesttypes_id: 1,
    content: "&lt;p&gt;Test JM&lt;/p&gt",
    urgency: 3,
    impact: 3,
    priority: 1,
    itilcategories_id: 6,
    type: 1,
    global_validation: 1,
    date_creation: "2022-02-02 14:50:44",
    time_to_own: "2021-07-12 15:52:44",
    time_to_resolve: "2021-07-12 15:52:44",
    userRequester: [1],
    userWatcher: [5, 7, 1],
    userAssignedTo: [],
    groupRequester: [],
    groupWatcher: [],
    groupAssignedTo: [],
    keywords: [],
    resources: [],
    similarTickets: [],
    computerName: null,
    linkedTickets: [],
    is_deleted: 0,
    level: 1,
};

export const fakeDiag = {
    _id: { $oid: "618ba3562c9c246f2c00666d" },
    ticketId: 607,
    username: "ttest",
    diagnostics: [
        {
            runId: "1662452199924",
            name: "computer_check_and_repair_account",
            diagExecutionTime: 469,
            userFullLogin: "pre01\\admin01",
            userLogin: "admin01",
            userDomain: "pre01.neo",
            userNetbiosDomain: "pre01",
            computerDomain: "pre01.neo",
            computerNetbiosDomain: "pre01",
            errorMessage: "",
            isComputerInDomain: "True",
            isComputerInWorgroup: "False",
            results: [
                {
                    Action: {
                        description: "Session variables retrieval (computerName, ...)",
                        id: 11,
                        result: "OK",
                        date: "2022-09-06T08:16:40.370Z",
                        executionTime: 353,
                    },
                },
                { name: "computer_retrieve_account_informations", results: [] },
                {
                    Error: {
                        name: "OrchestratorError",
                        message: "Reference missing: dcPdcRole",
                        code: "1",
                        runId: "1662452199924",
                        data: {
                            "0": {
                                Action: {
                                    description: "Session variables retrieval (computerName, ...)",
                                    id: 11,
                                    result: "OK",
                                    date: "2022-09-06T08:16:40.370Z",
                                    executionTime: 353,
                                },
                            },
                            "1": { name: "computer_retrieve_account_informations", results: [] },
                            Action: {
                                description: "Retrieve LDAP computer account information",
                                id: 1,
                                result: "Not Launched",
                            },
                        },
                    },
                },
            ],
        },
        {
            runId: "1653482213966",
            name: "printer",
            diagExecutionTime: 3567,
            printerID: "Imprimante1",
            results: [
                {
                    Action: {
                        description: "Is printer installed locally?",
                        id: 1,
                        result: "Failed",
                        date: {
                            $date: "2022-05-25T12:36:56.900Z",
                        },
                        executionTime: 83,
                    },
                },
                {
                    Action: {
                        description: "Install the printer on the user session",
                        id: 2,
                        result: "OK",
                        date: {
                            $date: "2022-05-25T12:36:57.059Z",
                        },
                        executionTime: 9,
                    },
                },
                {
                    Action: {
                        description: "Can we join the local spooler?",
                        id: 3,
                        result: "OK",
                        date: {
                            $date: "2022-05-25T12:36:57.219Z",
                        },
                        executionTime: 12,
                    },
                },
                {
                    Action: {
                        description: "Is the printer status normal on local user computer?",
                        id: 6,
                        result: "OK",
                        date: {
                            $date: "2022-05-25T12:36:57.362Z",
                        },
                        executionTime: 12,
                    },
                },
                {
                    Action: {
                        description: "Does local spooler have no waiting job in queue?",
                        id: 8,
                        result: "OK",
                        date: {
                            $date: "2022-05-25T12:36:57.526Z",
                        },
                        executionTime: 13,
                    },
                },
                {
                    Action: {
                        description: "Check if issue is solved after local check",
                        id: 11,
                        result: "Validated",
                        date: {
                            $date: "2022-05-25T12:37:04.011Z",
                        },
                        executionTime: 0,
                    },
                },
                {
                    Exit: {
                        id: 5,
                        name: "solved",
                        type: "solved",
                        action: "issue solved",
                        position: {
                            x: 2430,
                            y: -70,
                        },
                    },
                },
            ],
        },
        {
            runId: "1636557565265",
            name: "internet",
            diagExecutionTime: 484,
            remoteHost: "8.8.8.8",
            remotePort: 443,
            incidentType: "someIncidentType",
            remoteIp: "8.8.8.8",
            localIp: "192.168.1.78",
            interfaceName: "wlp0s20f3",
            cidr: "24",
            netmask: "255.255.255.0",
            dhcpEnabled: "True",
            nextHop: "192.168.1.254",
            mtu: "1500",
            arpFilled: "True",
            results: [
                {
                    Action: {
                        description: "Check on monitoring if there is no alert on bandwidth usage",
                        id: 1,
                        result: "OK",
                        date: { $date: "2021-11-10T15:19:25.307Z" },
                        executionTime: 11,
                    },
                },
                {
                    Action: {
                        description: "Is this a slowness ?",
                        id: 2,
                        result: "Failed",
                        date: { $date: "2021-11-10T15:19:25.312Z" },
                        executionTime: 0,
                    },
                },
                {
                    Action: {
                        description: "check portquiz on remote port",
                        id: 3,
                        result: "OK",
                        date: { $date: "2021-11-10T15:19:25.437Z" },
                        executionTime: 105,
                    },
                },
                {
                    name: "firewall",
                    results: [
                        {
                            Action: {
                                description: "Is this a slowness ?",
                                id: 1,
                                result: "OK",
                                date: { $date: "2021-11-10T15:19:25.448Z" },
                                executionTime: 0,
                            },
                        },
                        {
                            Action: {
                                description: "asking_permission to someone",
                                id: 2,
                                result: "Validated",
                                date: { $date: "2021-11-10T15:21:13.590Z" },
                            },
                        },
                        {
                            name: "network",
                            results: [
                                {
                                    Action: {
                                        description:
                                            "Retrieving Network information (Local IP;Mask;GW;DHCP enabled or not;MTU;Autonegotiation;ARP)",
                                        id: 1,
                                        result: "OK",
                                        date: { $date: "2021-11-10T15:21:13.671Z" },
                                        executionTime: 41,
                                    },
                                },
                                {
                                    Action: {
                                        description: "Ping 127.0.0.1",
                                        id: 2,
                                        result: "OK",
                                        date: { $date: "2021-11-10T15:21:13.701Z" },
                                        executionTime: 14,
                                    },
                                },
                                {
                                    Action: {
                                        description: "check if IP address is in the right range, not APIPA, etc",
                                        id: 4,
                                        result: "OK",
                                        date: { $date: "2021-11-10T15:21:13.730Z" },
                                        executionTime: 11,
                                    },
                                },
                                {
                                    Action: {
                                        description: "Ping gateway",
                                        id: 7,
                                        result: "OK",
                                        date: { $date: "2021-11-10T15:21:13.764Z" },
                                        executionTime: 18,
                                    },
                                },
                                {
                                    Action: {
                                        description:
                                            "If remote host is defined by a FQDN, try to resolve it. If it's an IP, follow yes",
                                        id: 10,
                                        result: "Failed",
                                        date: { $date: "2021-11-10T15:21:13.836Z" },
                                        executionTime: 52,
                                    },
                                },
                                { Exit: { id: 6, name: "escalate_dns", type: "escalate", action: "DNS not working" } },
                            ],
                        },
                        {
                            Action: {
                                description: "Launch network book",
                                id: 3,
                                result: "Failed",
                                date: { $date: "2021-11-10T15:21:13.848Z" },
                                executionTime: 250,
                            },
                        },
                        { Exit: { id: 2, name: "escalate", type: "escalate", action: "escalate" } },
                    ],
                },
                {
                    Action: {
                        description: "Launch firewall book",
                        id: 4,
                        result: "Failed",
                        date: { $date: "2021-11-10T15:21:13.856Z" },
                        executionTime: 295,
                    },
                },
                { Exit: { id: 4, name: "escalate_unknown", type: "escalate", action: "no cause found" } },
            ],
        },
    ],
    awaiting: [],
    __v: 1,
};

export const fakeDiag2 = {
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
            runId: "1664289883786",
            name: "file_access_check_and_repair",
            diagExecutionTime: 3638,
            errorMessage: "",
            objectOriginalPath: "\\\\pre01-srv01\\ShareFolder",
            objectUNCPath: "\\\\pre01-srv01\\ShareFolder",
            serverName: "pre01-srv01",
            sharedFolderName: "ShareFolder",
            isLocalResource: "False",
            isNetworkResource: "True",
            results: [
                {
                    Action: {
                        description: "Convert path to UNC format",
                        id: 1,
                        result: "OK",
                        date: "2022-09-27T14:44:44.236Z",
                        executionTime: 284,
                    },
                },
                {
                    Action: {
                        description: "Check if file server is up",
                        id: 2,
                        result: "OK",
                        date: "2022-09-27T14:44:44.618Z",
                        executionTime: 333,
                    },
                },
                {
                    Action: {
                        description: "Check if shared folder exist",
                        id: 3,
                        result: "OK",
                        date: "2022-09-27T14:44:46.052Z",
                        executionTime: 1391,
                    },
                },
                {
                    Action: {
                        description: "Retrieve user account informations",
                        id: 4,
                        result: "OK",
                        date: "2022-09-27T14:44:46.602Z",
                        executionTime: 473,
                    },
                },
                {
                    Action: {
                        description: "Check user account healthy",
                        id: 5,
                        result: "OK",
                        date: "2022-09-27T14:44:46.606Z",
                        executionTime: 0,
                    },
                },
            ],
            isUserAccountOk: "True",
            userAccountManagerLogin: "User03",
            userAccountLockOutTime: "",
            userAccountLockRemainingMinutes: "",
            userAccountExpirationDate: "",
            userAccountUserWorkstations: "",
            isUserAccountExisting: "True",
            isUserAccountEnabled: "True",
            isUserAccountManagerLoginSet: "True",
            isUserAccountLogonHoursOk: "True",
            isUserAccountNotExpired: "True",
            isUserAccountPwdDontNeedChange: "True",
            isUserAccountPwdNotExpired: "True",
            isUserAccountUnlocked: "True",
            isUserAccountUserWorkstationsOk: "True",
        },
        {
            runId: "1664292515596",
            name: "file_access_check_and_repair",
            diagExecutionTime: 4246,
            errorMessage: "",
            objectOriginalPath: "\\\\pre01-srv01\\ShareFolder",
            objectUNCPath: "\\\\pre01-srv01\\ShareFolder",
            serverName: "pre01-srv01",
            sharedFolderName: "ShareFolder",
            isLocalResource: "False",
            isNetworkResource: "True",
            results: [
                {
                    Action: {
                        description: "Convert path to UNC format",
                        id: 1,
                        result: "OK",
                        date: "2022-09-27T15:28:36.123Z",
                        executionTime: 442,
                    },
                },
                {
                    Action: {
                        description: "Check if file server is up",
                        id: 2,
                        result: "OK",
                        date: "2022-09-27T15:28:36.790Z",
                        executionTime: 623,
                    },
                },
                {
                    Action: {
                        description: "Check if shared folder exist",
                        id: 3,
                        result: "OK",
                        date: "2022-09-27T15:28:38.450Z",
                        executionTime: 1622,
                    },
                },
                {
                    Action: {
                        description: "Retrieve user account informations",
                        id: 4,
                        result: "OK",
                        date: "2022-09-27T15:28:39Z",
                        executionTime: 461,
                    },
                },
                {
                    Action: {
                        description: "Check user account healthy",
                        id: 5,
                        result: "OK",
                        date: "2022-09-27T15:28:39.005Z",
                        executionTime: 0,
                    },
                },
                {
                    Action: {
                        description: "approval test",
                        id: 6,
                        result: "Validated",
                        date: "2022-09-27T15:39:45.168Z",
                        executionTime: 0,
                    },
                },
                {
                    Exit: {
                        id: 1,
                        action: "Everythings looks ok",
                        type: "solved",
                        position: { x: 1980, y: 170 },
                        isLocked: false,
                    },
                },
            ],
            isUserAccountOk: "True",
            userAccountManagerLogin: "User03",
            userAccountLockOutTime: "",
            userAccountLockRemainingMinutes: "",
            userAccountExpirationDate: "",
            userAccountUserWorkstations: "",
            isUserAccountExisting: "True",
            isUserAccountEnabled: "True",
            isUserAccountManagerLoginSet: "True",
            isUserAccountLogonHoursOk: "True",
            isUserAccountNotExpired: "True",
            isUserAccountPwdDontNeedChange: "True",
            isUserAccountPwdNotExpired: "True",
            isUserAccountUnlocked: "True",
            isUserAccountUserWorkstationsOk: "True",
        },
        {
            runId: "1664293553539",
            name: "file_access_check_and_repair",
            diagExecutionTime: 3421,
            errorMessage: "",
            objectOriginalPath: "\\\\pre01-srv01\\ShareFolder",
            objectUNCPath: "\\\\pre01-srv01\\ShareFolder",
            serverName: "pre01-srv01",
            sharedFolderName: "ShareFolder",
            isLocalResource: "False",
            isNetworkResource: "True",
            results: [
                {
                    Action: {
                        description: "Convert path to UNC format",
                        id: 1,
                        result: "OK",
                        date: "2022-09-27T15:45:53.914Z",
                        executionTime: 276,
                    },
                },
                {
                    Action: {
                        description: "Check if file server is up",
                        id: 2,
                        result: "OK",
                        date: "2022-09-27T15:45:54.248Z",
                        executionTime: 291,
                    },
                },
                {
                    Action: {
                        description: "Check if shared folder exist",
                        id: 3,
                        result: "OK",
                        date: "2022-09-27T15:45:55.634Z",
                        executionTime: 1347,
                    },
                },
                {
                    Action: {
                        description: "Retrieve user account informations",
                        id: 4,
                        result: "OK",
                        date: "2022-09-27T15:45:56.165Z",
                        executionTime: 432,
                    },
                },
                {
                    Action: {
                        description: "Check user account healthy",
                        id: 5,
                        result: "OK",
                        date: "2022-09-27T15:45:56.170Z",
                        executionTime: 0,
                    },
                },
                {
                    Action: {
                        description: "approval test",
                        id: 6,
                        result: "Validated",
                        date: "2022-09-27T15:46:11.639Z",
                        executionTime: 0,
                    },
                },
                {
                    Exit: {
                        id: 1,
                        action: "Everythings looks ok",
                        type: "solved",
                        position: { x: 1980, y: 170 },
                        isLocked: false,
                    },
                },
            ],
            isUserAccountOk: "True",
            userAccountManagerLogin: "User03",
            userAccountLockOutTime: "",
            userAccountLockRemainingMinutes: "",
            userAccountExpirationDate: "",
            userAccountUserWorkstations: "",
            isUserAccountExisting: "True",
            isUserAccountEnabled: "True",
            isUserAccountManagerLoginSet: "True",
            isUserAccountLogonHoursOk: "True",
            isUserAccountNotExpired: "True",
            isUserAccountPwdDontNeedChange: "True",
            isUserAccountPwdNotExpired: "True",
            isUserAccountUnlocked: "True",
            isUserAccountUserWorkstationsOk: "True",
        },
        {
            runId: "1664294338266",
            name: "file_access_check_and_repair",
            diagExecutionTime: 4369,
            errorMessage: "",
            objectOriginalPath: "\\\\pre01-srv01\\ShareFolder",
            objectUNCPath: "\\\\pre01-srv01\\ShareFolder",
            serverName: "pre01-srv01",
            sharedFolderName: "ShareFolder",
            isLocalResource: "False",
            isNetworkResource: "True",
            results: [
                {
                    Action: {
                        description: "Convert path to UNC format",
                        id: 1,
                        result: "OK",
                        date: "2022-09-27T15:58:58.652Z",
                        executionTime: 275,
                    },
                },
                {
                    Action: {
                        description: "Check if file server is up",
                        id: 2,
                        result: "OK",
                        date: "2022-09-27T15:58:59.039Z",
                        executionTime: 338,
                    },
                },
                {
                    Action: {
                        description: "Check if shared folder exist",
                        id: 3,
                        result: "OK",
                        date: "2022-09-27T15:59:01.280Z",
                        executionTime: 2196,
                    },
                },
                {
                    Action: {
                        description: "Retrieve user account informations",
                        id: 4,
                        result: "OK",
                        date: "2022-09-27T15:59:01.803Z",
                        executionTime: 431,
                    },
                },
                {
                    Action: {
                        description: "Check user account healthy",
                        id: 5,
                        result: "OK",
                        date: "2022-09-27T15:59:01.807Z",
                        executionTime: 0,
                    },
                },
                {
                    Action: {
                        description: "approval test",
                        id: 6,
                        result: "Rejected",
                        date: "2022-09-27T15:59:27.403Z",
                        executionTime: 0,
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
            isUserAccountOk: "True",
            userAccountManagerLogin: "User03",
            userAccountLockOutTime: "",
            userAccountLockRemainingMinutes: "",
            userAccountExpirationDate: "",
            userAccountUserWorkstations: "",
            isUserAccountExisting: "True",
            isUserAccountEnabled: "True",
            isUserAccountManagerLoginSet: "True",
            isUserAccountLogonHoursOk: "True",
            isUserAccountNotExpired: "True",
            isUserAccountPwdDontNeedChange: "True",
            isUserAccountPwdNotExpired: "True",
            isUserAccountUnlocked: "True",
            isUserAccountUserWorkstationsOk: "True",
        },
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
                                description: "hello world",
                                id: 2,
                                result: "OK",
                                date: "2022-09-28T14:42:24.599Z",
                                executionTime: 442,
                            },
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
        {
            bookNames: ["test_approval_parent", "test_approval_enfant"],
            runId: "1664376143263",
            currentChapter: {
                id: 1,
                desc: "approval du livre enfant",
                actionParams: {
                    type: "approval",
                    params: [
                        {
                            type: "message",
                            value: "bien ou bien ?",
                            recipient: [{ type: "value", value: "User03" }],
                        },
                    ],
                },
                follow: {
                    yes: { type: "exits", id: 1 },
                    no: { type: "exits", id: 2 },
                },
                position: { x: 130, y: 110 },
                isLocked: false,
            },
            username: "User02",
            userNeoId: 7,
        },
    ],
    __v: 8,
} as unknown as Diagnostic;

export const fakeUsers: NeoUser[] = [
    {
        id: 1,
        firstname: "Unicorn",
        realname: "Pichon",
        name: "uPichon",
        dn: "dn1",
        isActive: true,
        language: "fr_FR",
        neoId: 1,
        membership: { entities: [], groups: [] },
        timezone: null,
    },
    {
        id: 1,
        firstname: "Platypus",
        realname: null,
        name: "uCollins",
        isActive: true,
        dn: "dn2",
        language: "fr_FR",
        neoId: 1,
        membership: { entities: [], groups: [] },
        timezone: null,
    },
    {
        id: 1,
        firstname: "Beluga",
        realname: "Rotarez",
        name: "uRotarez",
        isActive: true,
        dn: "dn2",
        language: "fr_FR",
        neoId: 1,
        membership: { entities: [], groups: [] },
        timezone: null,
    },
];

export const fakeUser: User = {
    entities: [{ id: 0, name: "Entité racine", itsmCode: "1gl" }],
    glpiId: 23,
    groups: ["Admin Test Group"],
    language: "fr-FR",
    level: 0,
    name: { firstName: "Admin", lastName: "Test" },
    neoId: 1,
    role: Role[0],
    selected_entity_id: -1,
    title: "Administrateur",
    uid: "atest",
};

fakeUsers[1].realname;

export const fakeGroups: GroupObject[] = [
    { id: 1, name: "gojira", itsmCode: "go1" },
    { id: 2, name: "ne_obliviscaris", itsmCode: "ne1" },
    { id: 3, name: "parkway_drive", itsmCode: "pa1" },
];

export const fakeTicketResources: Partial<Ticket> = {
    resources: [{ type: "Mana", item: { id: 2 }, tickets: [] }],
};

export const fakeNotification: Notification = {
    notification: {
        id: 0,
        content:
            "Where is Ryan ? lfgf dg sogfdos ogfdso gofdso gofdsog fids i igfdos gifdso i gkfdk igfdoshh hhhhhhhh hhsdqgsqhdsqgds gsdqghsgqhd gsqhdg  sqhgdsqhgdshqgd hsqgdgs qdhgsq dsg qdgsq  igfods",
        createdAt: "20/03/5655 50",
        objectId: "5958",
        objectType: "test",
        type: "test",
    },
    read: false,
    lastUpdatedAt: "",
};

export const fakeAnswer = {
    isAccepted: false,
    creationDate: "2021-11-10T15:21:13.856Z",
    authorLevel: "Level 1",
    author: {
        dn: "string",
        firstname: null,
        id: 1,
        language: "string",
        name: "Neo",
        realname: "Mr Anderson",
        timezone: null,
        membership: { groups: [], entities: [] },
        isActive: true,
        neoId: 1,
    },
    questionAuthor: "Fulgrim",
    connectedUserUid: "Lion El'Jonson",
    id: 1,
    text: "Insult me again, brother, and theoretically I will punch you in your practical face.",
    upvoters: [4, 2],
};

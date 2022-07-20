import { GlpiUsers, GlpiRequest, Notification, Ticket } from "@neomanis/neo-types";

export const fakeTicket: Ticket = {
    uid: "",
    id: 32,
    entities_id: 0,
    name: "Test JM a peu pres avec un titre genre fyys  fyezy fyezy y yreyz yreyz y y yreyz",
    date: "2021-07-12 15:52:44",
    closedate: undefined,
    solvedate: undefined,
    date_mod: " 2021-07-12 15:52:44",
    username_lastupdater: "stest",
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
    userRequester: ["ttest"],
    userWatcher: [],
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
};

export const fakeDiag = {
    _id: { $oid: "618ba3562c9c246f2c00666d" },
    ticketId: 607,
    username: "ttest",
    diagnostics: [
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

export const fakeGlpiUsers: GlpiUsers[] = [
    { id: 1, firstname: "Unicorn", realname: "Pichon", name: "uPichon" },
    { id: 1, firstname: "Platypus", realname: "Collins", name: "uCollins" },
    { id: 1, firstname: "Beluga", realname: "Rotarez", name: "uRotarez" },
];

export const fakeGlpiGroups: GlpiRequest[] = [
    { id: 1, completename: "Gojira", name: "gojira" },
    { id: 2, completename: "Ne Obliviscaris", name: "ne_obliviscaris" },
    { id: 3, completename: "Parkway Drive", name: "parkway_drive" },
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
        objectId: 5958,
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
    author: "Lion El'Jonson",
    questionAuthor: "Fulgrim",
    connectedUserUid: "Lion El'Jonson",
    id: 1,
    text: "Insult me again, brother, and theoretically I will punch you in your practical face.",
    upvoters: ["Fulgrim", "Lion El'Jonson"],
};

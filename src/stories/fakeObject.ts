import { IGlpiRequest, IGlpiUsers, IInputSelect, INotification, ITicket } from "../interface";

export const fakeTicket: ITicket = {
    id: 32,
    name: "Test JM a peu pres avec un titre genre fyys  fyezy fyezy y yreyz yreyz y y yreyz",
    date: "2021-07-12 15:52:44",
    closedate: undefined,
    solvedate: undefined,
    date_mod: " 2021-07-12 15:52:44",
    users_id_lastupdater: 19,
    status: 1,
    requesttypes_id: 1,
    content: "&lt;p&gt;Test JM&lt;/p&gt",
    urgency: 3,
    impact: 3,
    priority: 1,
    itilcategories_id: 6,
    type: 1,
    global_validation: 1,
    date_creation: "2021-07-12 15:52:44",
    time_to_own: "2021-07-12 15:52:44",
    time_to_resolve: "2021-07-12 15:52:44",
    userRequester: [1],
    userWatcher: [],
    userAssignedTo: [],
    groupRequester: [],
    groupWatcher: [],
    groupAssignedTo: [],
    keywords: [],
    resources: [],
    similarTickets: [],
};

export const fakeDiag = {
    _id: { $oid: "618ba3562c9c246f2c00666d" },
    ticketId: 607,
    username: "ttest",
    diagnostics: [
        {
            runId: "1636541270105",
            name: "network",
            diagExecutionTime: 274,
            remoteHost: "8.8.8.8",
            remotePort: 443,
            incidentType: "someIncidentType",
            remoteIp: "8.8.8.8",
            localIp: "192.168.1.78",
            interfaceName: "wlp0s20f3",
            cidr: "24",
            mtu: "1500",
            arpFilled: "True",
            results: [
                {
                    Action: {
                        description: "Retrieving Network information (Local IP;Mask;GW;DHCP enabled or not;M...",
                        id: 1,
                        result: "OK",
                        date: "2021-11-10T10:47:50.210+00:00",
                        executionTime: 43,
                    },
                },
                {
                    Action: {
                        description: "Ping 127.0.0.1",
                        id: 2,
                        result: "OK",
                        date: "2021-11-10T10:47:50.242+00:00",
                        executionTime: 15,
                    },
                },
                {
                    Action: {
                        description: "check if IP address is in the right range, not APIPA, etc",
                        id: 4,
                        result: "OK",
                        date: "2021-11-10T10:47:50.270+00:00",
                        executionTime: 12,
                    },
                },

                {
                    Action: {
                        description: "Ping gateway",
                        id: 7,
                        result: "OK",
                        date: "2021-11-10T10:47:50.304+00:00",
                        executionTime: 17,
                    },
                },
                {
                    Action: {
                        description: "If remote host is defined by a FQDN, try to resolve it. If it's an IP,...",
                        id: 10,
                        result: "Failed",
                        date: "2021-11-10T10:47:50.376+00:00",
                        executionTime: 58,
                    },
                },
                {
                    Exit: {
                        id: 6,
                        name: "escalate_dns",
                        type: "escalate",
                        action: "DNS not working",
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

export const fakeGroups: IInputSelect[] = [
    { id: 1, value: "Vagos" },
    { id: 2, value: "Families" },
    { id: 3, value: "LSPD" },
];

export const fakeGlpiUsers: IGlpiUsers[] = [
    { id: 1, firstname: "Unicorn", realname: "Pichon", name: "uPichon" },
    { id: 1, firstname: "Platypus", realname: "Collins", name: "uCollins" },
    { id: 1, firstname: "Beluga", realname: "Rotarez", name: "uRotarez" },
];

export const fakeGlpiGroups: IGlpiRequest[] = [
    { id: 1, completename: "Gojira" },
    { id: 2, completename: "Ne Obliviscaris" },
    { id: 3, completename: "Parkway Drive" },
];

export const fakeTicketResources: Partial<ITicket> = {
    resources: [{ type: "Mana", item: { id: 2 }, tickets: [] }],
};

export const fakeNotification: INotification = {
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
};

import { IGlpiRequest, IGlpiUsers, IInputSelect, ITicket } from "../interface";

export const fakeTicket: ITicket = {
    id: 1,
    entities_id: 0,
    name: "Test JM",
    date: "2021-07-12 15:52:44",
    closedate: undefined,
    solvedate: undefined,
    date_mod: " 2021-07-12 15:52:44",
    users_id_lastupdater: 19,
    status: 2,
    users_id_recipient: 19,
    requesttypes_id: 1,
    content: "&lt;p&gt;Test JM&lt;/p&gt",
    urgency: 3,
    impact: 3,
    priority: 3,
    itilcategories_id: 6,
    type: 1,
    global_validation: 1,
    slas_id_ttr: 0,
    slas_id_tto: 0,
    slalevels_id_ttr: 0,
    time_to_resolve: undefined,
    time_to_own: undefined,
    begin_waiting_date: undefined,
    sla_waiting_duration: 0,
    ola_waiting_duration: 0,
    olas_id_tto: 0,
    olas_id_ttr: 0,
    olalevels_id_ttr: 0,
    ola_ttr_begin_date: undefined,
    internal_time_to_resolve: undefined,
    internal_time_to_own: undefined,
    waiting_duration: 0,
    close_delay_stat: 0,
    solve_delay_stat: 0,
    takeintoaccount_delay_stat: 1,
    actiontime: 0,
    is_deleted: 0,
    locations_id: 0,
    validation_percent: 0,
    date_creation: "2021-07-12 15:52:44",
    userRequester: [1],
    userWatcher: [],
    userAssignedTo: [],
    groupRequester: [],
    groupWatcher: [],
    groupAssignedTo: [],
    links: [
        {
            rel: "Entity",
            href: "some url",
        },
    ],
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
            netmask: "255.255.255.0",
            dhcpEnabled: "True",
            nextHop: "192.168.1.254",
            mtu: "1500",
            arpFilled: "True",
            results: [
                {
                    Action: {
                        description:
                            "Retrieving Network information (Local IP;Mask;GW;DHCP enabled or not;MTU;Autonegotiation;ARP)",
                        id: 1,
                        result: "OK",
                        date: { $date: "2021-11-10T10:47:50.210Z" },
                        executionTime: 43,
                    },
                },
                {
                    Action: {
                        description: "Ping 127.0.0.1",
                        id: 2,
                        result: "OK",
                        date: { $date: "2021-11-10T10:47:50.242Z" },
                        executionTime: 15,
                    },
                },
                {
                    Action: {
                        description: "check if IP address is in the right range, not APIPA, etc",
                        id: 4,
                        result: "OK",
                        date: { $date: "2021-11-10T10:47:50.270Z" },
                        executionTime: 12,
                    },
                },
                {
                    Action: {
                        description: "Ping gateway",
                        id: 7,
                        result: "OK",
                        date: { $date: "2021-11-10T10:47:50.304Z" },
                        executionTime: 17,
                    },
                },
                {
                    Action: {
                        description:
                            "If remote host is defined by a FQDN, try to resolve it. If it's an IP, follow yes",
                        id: 10,
                        result: "Failed",
                        date: { $date: "2021-11-10T10:47:50.376Z" },
                        executionTime: 58,
                    },
                },
                { Exit: { id: 6, name: "escalate_dns", type: "escalate", action: "DNS not working" } },
            ],
        },
        {
            runId: "1636557565265",
            name: "internet",
            diagExecutionTime: 484,
            remoteHost: "8.8.8.8",
            remotePort: 443,
            incidentType: "someIncidentType",
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
            remoteIp: "8.8.8.8",
            localIp: "192.168.1.78",
            interfaceName: "wlp0s20f3",
            cidr: "24",
            netmask: "255.255.255.0",
            dhcpEnabled: "True",
            nextHop: "192.168.1.254",
            mtu: "1500",
            arpFilled: "True",
        },
    ],
    awaiting: [],
    __v: 1,
};

export const fakeDiag2 = {
    _id: { $oid: "619380a296ea5e447db859a3" },
    ticketId: 666,
    username: "ttest",
    diagnostics: [
        {
            runId: "1637056674890",
            name: "internet",
            diagExecutionTime: 228,
            remoteHost: "8.8.8.8",
            remotePort: 443,
            incidentType: "someIncidentType",
            results: [
                {
                    Action: {
                        description: "Check on monitoring if there is no alert on bandwidth usage",
                        id: 1,
                        result: "OK",
                        date: { $date: "2021-11-16T09:57:54.933Z" },
                        executionTime: 8,
                    },
                },
                {
                    Action: {
                        description: "Is this a slowness ?",
                        id: 2,
                        result: "Failed",
                        date: { $date: "2021-11-16T09:57:54.940Z" },
                        executionTime: 0,
                    },
                },
                {
                    Action: {
                        description: "check portquiz on remote port",
                        id: 3,
                        result: "OK",
                        date: { $date: "2021-11-16T09:57:55.055Z" },
                        executionTime: 100,
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
                                date: { $date: "2021-11-16T09:57:55.070Z" },
                                executionTime: 0,
                            },
                        },
                    ],
                },
            ],
        },
    ],
    awaiting: [
        {
            bookNames: ["internet", "firewall"],
            runId: "1637056674890",
            currentChapter: {
                id: 4,
                name: "launch_book",
                desc: "Launch firewall book",
                actionParams: { type: "book", name: "firewall", params: [] },
                follow: { yes: { id: 5, type: "actions" }, no: { id: 4, type: "exits" } },
            },
            username: "ttest",
            startTime: 52,
        },
        {
            bookNames: ["internet", "firewall"],
            runId: "1637056674890",
            currentChapter: {
                id: 2,
                name: "ask_permissions",
                desc: "asking_permission to someone",
                actionParams: {
                    type: "workflowRequest",
                    params: [{ type: "message", value: "Give right to neo bot", recipient: "stest" }],
                },
                follow: { yes: { id: 3, type: "actions" }, no: { id: 2, type: "exits" } },
            },
            username: "ttest",
        },
    ],
    __v: 0,
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

export const fakeTicketResources: ITicket = {
    resources: [{ type: "Mana", item: { id: 2 }, tickets: [] }],
};

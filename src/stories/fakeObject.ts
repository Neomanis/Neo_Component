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

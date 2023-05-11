import { NeomanisUser, Notification, Ticket, MembershipInfo } from "@neomanis/neo-types";
import { FakeUserPicture } from "@/img/png";
import { addHours, addMinutes } from "date-fns";

export const fakeTicket: Ticket = {
    id: 4212,
    name: "test with new groups",
    date: "2022-07-20T11:15:00.000+02:00",
    closeDate: null,
    solveDate: null,
    updatedAt: "2022-07-20T11:15:01.001+02:00",
    status: 2,
    content: "&lt;p&gt;zdfadfs&lt;/p&gt;",
    urgency: 3,
    impact: 3,
    priority: 4,
    timeSpent: 0,
    type: 1,
    ttr: addMinutes(new Date(), 10).toISOString(),
    tto: addMinutes(new Date(), 10).toISOString(),
    createdAt: addHours(new Date(), -1).toISOString(),
    uid: "1gl-4212",
    level: 1,
    entityId: 0,
    category: "server",
    requestType: "service assistance",
    neoIdLastUpdater: 27,
    userRequester: [],
    userWatcher: [1],
    userAssignedTo: [],
    groupRequester: [],
    groupWatcher: [
        {
            id: 1,
            name: "All-Stars",
            itsmCode: "1gl",
        },
    ],
    groupAssignedTo: [
        {
            id: 1,
            name: "All-Stars",
            itsmCode: "1gl",
        },
        {
            id: 4,
            name: "Level 1",
            itsmCode: "1gl",
        },
    ],
    resources: [],
    keywords: [],
    similarTickets: [],
    computerName: null,
    position: {
        grid: 0,
        col: 0,
        row: 3,
    },
    linkedTickets: [],
    attachments: [],
};

export const fakeUsers: NeomanisUser[] = [
    {
        firstname: "Unicorn",
        lastname: "Pichon",
        uid: "uPichon",
        dn: "dn1",
        language: "fr_FR",
        neoId: 1,
        mail: "unicorn.pichon@gmail.com",
        avatar: undefined,
        xmpp: {},
        role: "user",
        permissions: [],
        membership: { entities: [], groups: [] },
    },
    {
        firstname: "Platypus",
        lastname: null,
        uid: "uCollins",
        dn: "dn2",
        language: "fr_FR",
        neoId: 1,
        mail: "platypus.collins@gmail.com",
        avatar: undefined,
        xmpp: {},
        role: "user",
        permissions: [],
        membership: { entities: [], groups: [] },
    },
    {
        firstname: "Beluga",
        lastname: "Rotarez",
        uid: "uRotarez",
        dn: "dn2",
        language: "fr_FR",
        neoId: 1,
        mail: "beluga.rotarez@gmail.com",
        avatar: undefined,
        xmpp: {},
        role: "user",
        permissions: [],
        membership: { entities: [], groups: [] },
    },
];

export const fakeUser: NeomanisUser = {
    neoId: 1,
    dn: "dc=neomanis,dc=bzh",
    uid: "atest",
    firstname: "Admin",
    lastname: "Test",
    role: "administrator",
    level: 0,
    avatar: FakeUserPicture,
    xmpp: {},
    language: "fr-FR",
    permissions: [],
    membership: {
        entities: [
            {
                id: 0,
                name: "Entité racine",
                itsmCode: "1gl",
            },
            {
                id: 0,
                name: "Entité racine > entité enfant",
                itsmCode: "2gl",
            },
            {
                id: 0,
                name: "Entité racine > entité enfant test test ets t",
                itsmCode: "2gl",
            },
            {
                id: 0,
                name: "Entité racine > entité enfant toast toast toast toast toast  ",
                itsmCode: "2gl",
            },
            {
                id: 0,
                name: "Entité racine > entité enfant toast toast toast toast toast  ",
                itsmCode: "2gl",
            },
            {
                id: 0,
                name: "Entité racine > entité enfant toast toast toast toast toast  ",
                itsmCode: "2gl",
            },
            {
                id: 0,
                name: "Entité racine > entité enfant toast toast toast toast toast  ",
                itsmCode: "2gl",
            },
        ],
        groups: [
            {
                id: 1,
                name: "All-Stars",
                itsmCode: "1gl",
            },
            {
                id: 6,
                name: "Level 3",
                itsmCode: "1gl",
            },
            {
                id: 1,
                name: "All-Stars",
                itsmCode: "2gl",
            },
        ],
    },
};

export const fakeGroups: MembershipInfo[] = [
    { id: 1, name: "gojira", itsmCode: "go1" },
    { id: 2, name: "ne_obliviscaris", itsmCode: "ne1" },
    { id: 3, name: "parkway_drive", itsmCode: "pa1" },
];

export const fakeTicketResources: Partial<Ticket> = {
    resources: [
        {
            type: "Mana",
            item: { id: 2, name: "fakeRessources", entity: { id: 1, itsmCode: "IT1", name: "itsm1" } },
            tickets: [],
        },
    ],
};

export const fakeNotification: Notification = {
    notification: {
        id: 0,
        content:
            "Where is Ryan ? lfgf dg sogfdos ogfdso gofdso gofdsog fids i igfdos gifdso i gkfdk igfdoshh hhhhhhhh hhsdqgsqhdsqgds gsdqghsgqhd gsqhdg  sqhgdsqhgdshqgd hsqgdgs qdhgsq dsg qdgsq  igfods",
        createdAt: "2021-11-10T15:21:13.856Z",
        objectId: "5958",
        objectType: "test",
        type: "test",
    },
    read: false,
    lastUpdatedAt: "2021-11-10T15:21:13.856Z",
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

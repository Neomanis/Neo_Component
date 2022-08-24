import { NeoUser, TechnicalQuestionAnswer } from "@neomanis/neo-types";
import { test as base } from "@playwright/experimental-ct-react";

export const test = base.extend<{}, { answer: TechnicalQuestionAnswer; itsmUsers: NeoUser[] }>({
    answer: [
        ({}, use) => {
            use({
                id: 1,
                text: "Insult me again, brother, and theoretically I will punch you in your practical face.",
                accepted: false,
                createDate: "2021-11-10T15:21:13.856Z",
                createLevel: "Level 1",
                createUser: 1,
                updateDate: null,
                updateLevel: null,
                updateUser: null,
                upvoters: [4, 2],
            });
        },
        { scope: "worker" },
    ],
    itsmUsers: [
        ({}, use) => {
            use([
                {
                    id: 1,
                    firstname: "Unicorn",
                    realname: "Pichon",
                    name: "uPichon",
                    dn: "dn1",
                    isActive: true,
                    language: "fr_FR",
                    neoId: 2,
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
                    neoId: 3,
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
            ]);
        },
        { scope: "worker" },
    ],
});

export { expect } from "@playwright/experimental-ct-react";

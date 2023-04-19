import { Ticket, MembershipInfo, NeomanisUser } from "@neomanis/neo-types";

interface GetActorNameParams {
    ticket: Ticket;
    users: NeomanisUser[];
    itsmGroups: MembershipInfo[];
    type: "Requester" | "Watcher" | "AssignedTo";
}

export function getActorName({ ticket, users, itsmGroups, type }: GetActorNameParams): string | undefined {
    const userNeoId = ticket[`user${type}`][0];
    const group = ticket[`group${type}`][0];

    if (userNeoId) {
        const user = users.find((user) => user.neoId === userNeoId);
        return user ? getUserName(user) : undefined;
    }

    if (group) {
        return itsmGroups.find(
            (itsmGroup) => `${itsmGroup.id}-${itsmGroup.itsmCode}` === `${group.id}-${group.itsmCode}`
        )?.name;
    }

    return undefined;
}

export function getUserName(user: NeomanisUser): string {
    if (user.firstname && user.lastname) {
        return `${user.firstname} ${user.lastname}`;
    }

    return user.lastname || user.firstname || user.uid;
}

export function getRequesterUid(
    ticket: Ticket,
    itsmUsers: NeomanisUser[],
    itsmGroups: MembershipInfo[] | undefined = undefined
): string | undefined {
    const userNeoId = ticket.userRequester[0];
    const group = ticket.groupRequester[0];

    if (!userNeoId && itsmGroups && group) {
        return (
            itsmGroups.find((itsmGroup) => `${itsmGroup.id}-${itsmGroup.itsmCode}` === `${group.id}-${group.itsmCode}`)
                ?.name || ""
        );
    }

    const user = itsmUsers.find((user) => user.neoId === userNeoId);

    return user?.uid;
}

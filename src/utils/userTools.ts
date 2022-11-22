import { Ticket, NeoUser, MembershipInfo } from "@neomanis/neo-types";

interface GetActorNameParams {
    ticket: Ticket;
    itsmUsers: NeoUser[];
    itsmGroups: MembershipInfo[];
    type: "Requester" | "Watcher" | "AssignedTo";
}

export function getActorName({ ticket, itsmUsers, itsmGroups, type }: GetActorNameParams): string | undefined {
    const userNeoId = ticket[`user${type}`][0];
    const group = ticket[`group${type}`][0];

    if (userNeoId) {
        const user = itsmUsers.find((user) => user.neoId === userNeoId);
        return user ? getUserName(user) : undefined;
    }

    if (group) {
        return itsmGroups.find(
            (itsmGroup) => `${itsmGroup.id}-${itsmGroup.itsmCode}` === `${group.id}-${group.itsmCode}`
        )?.name;
    }

    return undefined;
}

export function getUserName(user: NeoUser): string {
    return user.firstname && user.realname
        ? `${user.firstname} ${user.realname}`
        : user.realname || user.firstname || user.name;
}

export function getRequesterUid(
    ticket: Ticket,
    itsmUsers: NeoUser[],
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
    return user?.name;
}

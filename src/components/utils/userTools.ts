import { GlpiUsers, GlpiRequest, Ticket, User } from "@neomanis/neo-types";

interface GetActorNameParams {
    ticket: Ticket;
    users: GlpiUsers[];
    groups: GlpiRequest[];
    type: "Requester" | "Watcher" | "AssignedTo";
}

export function getActorName({ ticket, users, groups, type }: GetActorNameParams): string | undefined {
    const username = ticket[`user${type}`][0];
    const groupName = ticket[`group${type}`][0];

    if (username) {
        const user = users.find((user) => user.name === username);
        return user ? getUserName(user) : undefined;
    }

    if (groupName) {
        return groups.find((group) => group.name === groupName)?.completename;
    }

    return undefined;
}

export function getUserName(user: GlpiUsers): string {
    return user.firstname && user.realname
        ? `${user.firstname} ${user.realname}`
        : user.realname || user.firstname || user.name || "";
}

export function getRequesterUid(
    ticket: Ticket,
    glpiUsers: GlpiUsers[],
    glpiGroups: GlpiRequest[] | undefined = undefined
): string {
    const username = ticket.userRequester && ticket.userRequester[0];
    const groupName = ticket.groupRequester && ticket.groupRequester[0];

    if (!username && glpiGroups) {
        return glpiGroups.find((group) => group.name === groupName)?.completename || "";
    }

    const user = glpiUsers.find((user) => user.name === username);
    return user ? getUserUid(user) : "";
}

function getUserUid(user: GlpiUsers): string {
    return user.name ? user.name : "";
}

export function getUserEntityName(user: User, entityId: number): string | undefined {
    return user.entities?.find((entity) => entity.id === entityId)?.name;
}

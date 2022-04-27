import { GlpiUsers, GlpiRequest, Ticket } from "@neomanis/neo-types";

export function displayRequesterName(
    ticket: Ticket,
    glpiUsers: GlpiUsers[],
    glpiGroups: GlpiRequest[] | undefined = undefined
): string {
    const userId = ticket.userRequester && ticket.userRequester[0];
    const groupId = ticket.groupRequester && ticket.groupRequester[0];

    if (!userId && glpiGroups) {
        return glpiGroups.find((group) => group.id === groupId)?.completename || "";
    }

    const user = glpiUsers.find((user) => user.id === userId);
    return user ? getUserName(user) : "";
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
    const userId = ticket.userRequester && ticket.userRequester[0];
    const groupId = ticket.groupRequester && ticket.groupRequester[0];

    if (!userId && glpiGroups) {
        return glpiGroups.find((group) => group.id === groupId)?.completename || "";
    }

    const user = glpiUsers.find((user) => user.id === userId);
    return user ? getUserUid(user) : "";
}

function getUserUid(user: GlpiUsers): string {
    return user.name ? user.name : "";
}

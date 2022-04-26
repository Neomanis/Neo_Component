import { IChatMessage, IGlpiUsers } from "../../interface";

export function formatMessage(message: string, sender: string, isPrivate = 0): IChatMessage {
    return {
        content: message,
        sender: sender,
        is_private: isPrivate,
        date_creation: new Date().toISOString(),
    };
}

export function getRecipientsNameByIds(glpiUsers: IGlpiUsers[], ids: number[]): string[] {
    const recipients: string[] = [];
    ids.forEach((id) => {
        const recipient = glpiUsers.find((user) => id === user.id)?.name;
        if (recipient) {
            recipients.push(recipient);
        }
    });

    return recipients;
}

export function stripHtml(html: string): string {
    const doc = new DOMParser().parseFromString(html, "text/html");
    const parsed = new DOMParser().parseFromString(doc.body.textContent, "text/html");
    return parsed.body.textContent || "";
}

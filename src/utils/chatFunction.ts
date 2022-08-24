import { ChatMessage } from "@neomanis/neo-types";

export function formatMessage(message: string, sender: number, isPrivate = 0): ChatMessage {
    return {
        content: message,
        sender: sender,
        is_private: isPrivate,
        date_creation: new Date().toISOString(),
    };
}

export function stripHtml(html: string): string | null {
    const doc = new DOMParser().parseFromString(html, "text/html");
    if (!doc.body.textContent) {
        return null;
    }
    const parsed = new DOMParser().parseFromString(doc.body.textContent, "text/html");
    return parsed.body.textContent || "";
}

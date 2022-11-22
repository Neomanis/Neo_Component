export function stripHtml(html: string): string | null {
    const doc = new DOMParser().parseFromString(html, "text/html");
    if (!doc.body.textContent) {
        return null;
    }
    const parsed = new DOMParser().parseFromString(doc.body.textContent, "text/html");
    return parsed.body.textContent || "";
}

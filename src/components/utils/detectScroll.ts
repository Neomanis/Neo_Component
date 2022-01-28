import { Dispatch } from "react";

export function detectScroll(
    id: string,
    state: { top: boolean; bottom: boolean },
    setter: Dispatch<{ top: boolean; bottom: boolean }>
): void {
    const div = document.getElementById(id);
    if (div && div?.offsetHeight + div?.scrollTop >= div?.scrollHeight) {
        setter({ ...state, bottom: true });
    } else if (div && div.scrollTop > 0) {
        setter({ ...state, top: false });
    } else if (div && div.scrollTop === 0) {
        setter({ bottom: false, top: true });
    } else {
        setter({ top: false, bottom: false });
    }
}

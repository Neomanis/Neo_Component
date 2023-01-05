import { RefObject, useEffect } from "react";

/**
 * Hook that listens for clicks or touches outside of a specified element.
 *
 * The `data-click-outside-exception` attribute can be added to any element that should be ignored by the hook,
 */
export function useOnClickOutside<T extends HTMLElement = HTMLElement>(ref: RefObject<T>, handler: () => void) {
    useEffect(() => {
        const listener = (event: Partial<MouseEvent> | Partial<TouchEvent>) => {
            if (!ref.current || ref.current.contains(event.target as Node) || isClickOutsideException(event.target)) {
                return;
            }

            handler();
        };

        document.addEventListener(`mouseup`, listener);
        document.addEventListener(`touchend`, listener);

        return (): void => {
            document.removeEventListener(`mouseup`, listener);
            document.removeEventListener(`touchend`, listener);
        };
    }, [ref, handler]);
}

function isClickOutsideException(event: EventTarget) {
    return event instanceof Element && event.closest("[data-click-outside-exception]");
}

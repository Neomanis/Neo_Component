import { RefObject, useEffect } from "react";

export function useOnClickOutside<T extends HTMLElement = HTMLElement>(ref: RefObject<T>, handler: () => void) {
    useEffect(() => {
        const listener = (event: Partial<MouseEvent> | Partial<TouchEvent>) => {
            if (!ref.current || ref.current.contains(event.target as Node)) {
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

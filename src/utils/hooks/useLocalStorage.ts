import { Dispatch, SetStateAction, useEffect, useState } from "react";

type SetValue<T> = Dispatch<SetStateAction<T>>;

export const LOCAL_STORAGE_VERSION = 4;

function useLocalStorage<T>(key: string, initialValue: T): [T, SetValue<T>] {
    key = `${LOCAL_STORAGE_VERSION}-${key}`;

    const readValue = (): T => {
        const item = window.localStorage.getItem(key);
        if (item === "undefined") {
            return undefined;
        }
        return item ? (JSON.parse(item) as T) : initialValue;
    };

    const [storedValue, setStoredValue] = useState<T>(readValue);

    const setValue: SetValue<T> = (value) => {
        window.localStorage.setItem(key, JSON.stringify(value));
        setStoredValue(value);

        // We dispatch a custom event so every useLocalStorage hook are notified
        window.dispatchEvent(new Event(`local-storage-${key}`));
    };

    function storageListener(event: StorageEvent) {
        if (event.key !== key) {
            return;
        }
        setStoredValue(readValue());
    }

    useEffect(() => {
        setStoredValue(readValue());
        // this only works for other documents, not the current one
        window.addEventListener("storage", storageListener);

        // this is a custom event, triggered in setValue
        window.addEventListener(`local-storage-${key}`, () => setStoredValue(readValue()));

        return () => {
            window.removeEventListener("storage", storageListener);
            window.removeEventListener(`local-storage-${key}`, () => setStoredValue(readValue()));
        };
    }, []);

    return [storedValue, setValue];
}

export default useLocalStorage;

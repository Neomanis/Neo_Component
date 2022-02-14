import { Dispatch, SetStateAction, useEffect, useState } from "react";

type SetValue<T> = Dispatch<SetStateAction<T>>;

function useLocalStorage<T>(key: string, initialValue: T): [T, SetValue<T>] {
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
        window.dispatchEvent(new Event("local-storage"));
    };

    useEffect(() => {
        setStoredValue(readValue());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleStorageChange = () => {
        setStoredValue(readValue());
    };

    // this only works for other documents, not the current one
    window.addEventListener("storage", handleStorageChange);

    // this is a custom event, triggered in setValue
    window.addEventListener("local-storage", handleStorageChange);

    return [storedValue, setValue];
}

export default useLocalStorage;

import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
    const [data, setData] = useState<T>(() => {
        try {
            const valueInLocalStorage = localStorage.getItem(key);
            if (valueInLocalStorage) {
                return JSON.parse(valueInLocalStorage);
            }
        } catch (error) {
            console.error("Error parsing data from local storage:", error);
        }

        if (typeof initialValue === "function") {
            return (initialValue as () => T)();
        } else {
            return initialValue;
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(data));
        } catch (error) {
            console.error("Error saving data to local storage:", error);
        }
    }, [key, data]);

    return [data, setData] as [T, typeof setData];
}

import { useEffect, useState } from "react";

/**
 * USE WITH ARRAY VALUE
 * const [items, setItems] = useLocalStorage<string[]>("items", [])
 */

/**
 * USE WITH STRING VALUE
 * const [theme, setTheme] = useLocalStorage("theme", "light");
 */

export function useLocalStorage<T>(key: string, initialValue:T): [T, (value:T) => void] {
    const [value, setValue] = useState(() => {
        // get data from localstorage
        return JSON.parse(localStorage.getItem(key) || JSON.stringify(initialValue));
    });

    useEffect(() => {
        // setting data in localStorage
        localStorage.setItem(key, JSON.stringify(value));
    }, [value, key]);

    /**  
        * OBJECT DESTRUCTURING: The order does not matter but you have to specify it in the following way.
        // E.G =>>> const {value:theme, setValue:setTheme} = useLocalStorage("theme");

        return {value, setValue}; 
    */
    

    /* ARRAY DESTRUCTURING: you have to remeber the order; value before setValue. BENEFIT: YOU CAN GIVE IT YOUR CUSTOM NAME WHEN USING IT
    // E.G =>>> const [them, seTheme] = useLocalStorage("theme");
    */
    return [value, setValue]; 
}
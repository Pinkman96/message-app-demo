
import { useEffect, useState } from 'react'


const PREFIX = 'message-app-'
//To prevent lost User State(id) when we refresh the Login Page...
export default function useLocalStorage(key, initialValue) {
    
    const prefixedKey = PREFIX + key;
    const [value, setValue] = useState(() => {
        const jsonValue = localStorage.getItem(prefixedKey);
        if(jsonValue !== 'undefined'&& jsonValue !== null){
            return JSON.parse(jsonValue);
        }
        if(typeof initialValue === 'function'){
            return initialValue();
        }else{
            return initialValue;
        }

    });

    useEffect(()=>{
        localStorage.setItem(prefixedKey, JSON.stringify(value))
    }, [prefixedKey, value])

    return [value, setValue];
}


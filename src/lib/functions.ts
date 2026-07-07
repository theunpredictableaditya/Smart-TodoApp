export const setInLocalStorage = <T>(key: string,item: T) => {
    localStorage.setItem(key, JSON.stringify(item));
}

export const getFromLocalStorage = <T>(key: string): T | null => {
    const  saved = localStorage.getItem(key);
    if(saved) {
        return JSON.parse(saved);
    }

    return null;
}
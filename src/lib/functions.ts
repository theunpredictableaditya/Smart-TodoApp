import type { task } from "@/types";

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

export const sortTasks = (taskArray: task[]): task[] => {
    let newArray: task[];
    const priorityOrder: {High: number; Medium: number; Low: number} = {
        High: 3,
        Medium: 2,
        Low: 1
    }

    newArray = taskArray.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);

    return newArray;
}
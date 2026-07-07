export type priorityType = "High" | "Medium" | "Low";

export type task = {
    id: string;
    isCompleted: boolean;
    task: string;
    priority: priorityType;
}

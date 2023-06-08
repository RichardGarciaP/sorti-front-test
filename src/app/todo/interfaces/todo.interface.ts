export interface ToDoResponse {
    status: string;
    data:   ToDo[];
}

export interface ToDo {
    id?:          number;
    title?:       string;
    description?: string;
    status?:      ToDoStatus;
    userId?:      number;
}


export type ToDoStatus = | "pending" | "finished" | "deleted";
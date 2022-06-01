import axios from "axios";

export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}

export  enum TaskStatuses {
    New,
    InProgress,
    Completed,
    Draft
}

export enum TaskPriorities {
    Low,
    Middle,
    Hi,
    Urgently,
    Later
}

export type TaskType = {
        description: string
        title: string
        status: TaskStatuses
        priority: TaskPriorities
        startDate: string
        deadline: string
        id: string
        todoListId: string
        order: number
        addedDate: string
}


export type GetTasksResponseType = {
    items: Array<TaskType>
    totalCount: number
    error: string | null
}

type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>,
    data: D
}

export type UpdateTaskType = {
    title: string
    description: string
    status: number
    priority: number
    startDate: string
    deadline: string
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'e5b3ef6b-3c8f-4fb5-b893-5da8fa35093c'
    }
})

export const todolistsAPI = {
    getTodolists() {
        return instance.get <Array<TodolistType>>('todo-lists')
    },
    createTodolist(title: string) {
        return instance.post <ResponseType<{ item: TodolistType }>>('todo-lists', {title})
    },
    deleteTodolist(todolistId: string) {
        return instance.delete <ResponseType>(`todo-lists/${todolistId}`)
    },
    updateTodolistTitle(todolistId: string, title: string) {
        return instance.put <ResponseType>(`todo-lists/${todolistId}`, {title})
    },
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponseType>(`todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, title: string) {
        return instance.post  <ResponseType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks`, {title})
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete <ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask(todolistId: string, taskId: string, module: UpdateTaskType) {
        return instance.put <ResponseType<TaskType>>(`todo-lists/${todolistId}/tasks/${taskId}`, module)
    },
}
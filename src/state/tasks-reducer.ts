import {TasksStateType} from "../App";
import {v1} from "uuid";
import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI} from "../api/todolists-api";
import {addTodolistAC, removeTodolistAC, setTodolistsAC} from "./todolists-reducer";
import {Dispatch} from "redux";

type TaskActionType =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskTitleActionType
    | ChangeTaskStatusActionType
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof setTodolistsAC>
    | ReturnType<typeof setTasksAC>

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    taskID: string
    todolistID: string
}
export type AddTaskActionType = {
    type: 'ADD-TASK'
    title: string
    todolistID: string
}
export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    taskID: string
    newTitle: string
    todolistID: string
}
export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    todolistID: string
    taskID: string
    status: TaskStatuses
}

export const removeTaskAC = (id: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskID: id, todolistID: todolistId} as const
}
export const addTaskAC = (newTaskTitle: string, todolistId: string): AddTaskActionType => {
    return {type: 'ADD-TASK', title: newTaskTitle, todolistID: todolistId} as const
}
export const changeTaskTitleAC = (id: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
    return {
        type: 'CHANGE-TASK-TITLE',
        todolistID: todolistId,
        taskID: id,
        newTitle: title
    } as const
}
export const changeTaskStatusAC = (id: string, status: TaskStatuses, todolistId: string): ChangeTaskStatusActionType => {
    return {
        type: 'CHANGE-TASK-STATUS',
        todolistID: todolistId,
        taskID: id,
        status
    } as const
}

const setTasksAC = (tasks: Array<TaskType>, todolistID: string) => {
    return {
        type: 'SET-TASKS', tasks, todolistID
    } as const
}

const initialState: TasksStateType = {}


export const tasksReducer = (state: TasksStateType = initialState, action: TaskActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistID]
            const filteredTasks = tasks.filter(t => t.id !== action.taskID)
            stateCopy[action.todolistID] = filteredTasks
            return stateCopy
        }
        case 'ADD-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistID]
            stateCopy[action.todolistID] = [{
                id: v1(),
                title: action.title,
                status: TaskStatuses.New,
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: TaskPriorities.Urgently,
                startDate: '',
                todoListId: action.todolistID
            }, ...tasks]
            return stateCopy
        }
        case 'CHANGE-TASK-TITLE': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistID]
            stateCopy[action.todolistID] = tasks.map(t => t.id === action.taskID ? {
                ...t, title: action.newTitle
            } : t)
            return stateCopy
        }
        case 'CHANGE-TASK-STATUS': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistID]
            stateCopy[action.todolistID] = tasks.map(t => t.id === action.taskID ? {
                ...t, status: action.status
            } : t)
            return stateCopy
        }
        case 'ADD-TODOLIST': {
            return {...state, [action.todolistID]: []}
        }
        case "REMOVE-TODOLIST": {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }
        case 'SET-TODOLISTS': {
            const stateCopy = {...state}
            action.todolists.forEach((tl) => {
                stateCopy[tl.id] = []
            })
            return stateCopy;
        }
        case 'SET-TASKS': {
            const stateCopy = {...state}
            stateCopy[action.todolistID] = action.tasks
            return stateCopy
        }
        default:
            return state;
    }
}

export const getTasksTC = (id: string) => (dispatch: Dispatch) => {
    todolistsAPI.getTasks(id)
        .then((res) => {
            dispatch(setTasksAC(res.data.items, id));
        })
}
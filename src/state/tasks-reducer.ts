import {TasksStateType} from "../App";
import {v1} from "uuid";
import {TaskType} from "../TodoList";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";

type TaskActionType =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskTitleActionType
    | ChangeTaskStatusActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
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
    isDone: boolean
}

export const removeTaskAC = (todolistId: string, id: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', todolistID: todolistId, taskID: id}
}
export const addTaskAC = (todolistId: string, newTaskTitle: string): AddTaskActionType => {
    return {type: 'ADD-TASK', todolistID: todolistId, title: newTaskTitle}
}
export const changeTaskTitleAC = (todolistId: string, id: string, title: string): ChangeTaskTitleActionType => {
    return {
        type: 'CHANGE-TASK-TITLE',
        todolistID: todolistId,
        taskID: id,
        newTitle: title
    }
}
export const changeTaskStatusAC = (todolistId: string, id: string, isDone: boolean): ChangeTaskStatusActionType => {
    return {
        type: 'CHANGE-TASK-STATUS',
        todolistID: todolistId,
        taskID: id,
        isDone: isDone
    }
}

export const tasksReducer = (state: TasksStateType, action: TaskActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistID]
            const filteredTasks = tasks.filter((t: TaskType) => t.id !== action.taskID)
            stateCopy[action.todolistID] = filteredTasks
            return stateCopy
        }
        case 'ADD-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistID]
            const task = {id: v1(), title: action.title, isDone: false}
            const newTasks = [task, ...tasks]
            stateCopy[action.todolistID] = newTasks
            return stateCopy
        }
        case 'CHANGE-TASK-TITLE': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistID]
            const task = tasks.find(t => t.id === action.taskID)
            if (task) {
                task.title = action.newTitle
            }
            return stateCopy
        }
        case 'CHANGE-TASK-STATUS': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistID]
            const task = tasks.find(t => t.id === action.taskID)
            if (task) {
                task.isDone = action.isDone
            }
            return stateCopy
        }
        case "ADD-TODOLIST": {
            const stateCopy = {...state}
            stateCopy[action.todolistID] = []
            return stateCopy
        }
        case "REMOVE-TODOLIST": {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }
        default:
            throw new Error("I don't understand this type")
    }
}
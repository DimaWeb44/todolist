import {TasksStateType} from "../App";
import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskType} from "../api/todolists-api";
import {addTodolistAC, removeTodolistAC, setTodolistsAC} from "./todolists-reducer";
import {Dispatch} from "redux";
import {RootStateType} from "./store";

type TaskActionType =
    RemoveTaskActionType
    |  ReturnType<typeof addTaskAC>
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
export const addTaskAC = (task: TaskType) => {
    return {type: 'ADD-TASK', task} as const
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
            const tasks = stateCopy[action.task.todoListId]
            stateCopy[action.task.todoListId] = [action.task, ...tasks]
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
            return {...state, [action.todolist.id]: []}
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

export const deleteTasksTC = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
    todolistsAPI.deleteTask(todolistId, taskId).then((res)=>{
        if (res.data.resultCode === 0 ){
            dispatch(removeTaskAC(taskId, todolistId))
        }
    })
}

export const createTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    todolistsAPI.createTask(todolistId, title).then((res)=>{
        if (res.data.resultCode === 0 ){
            dispatch(addTaskAC(res.data.data.item))
        }
    })
}

export const updateTaskTitleTC = (todolistId: string, taskId: string, title: string) => (dispatch: Dispatch, getState: ()=> RootStateType) => {
    const state = getState()
    const  task = state.tasks[todolistId].find(t => t.id === taskId)
    if (!task) {
        console.warn('not find task')
        return
    }
    const module: UpdateTaskType = {
        title: title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        startDate: task.startDate,
        deadline: task.deadline,
    }
    todolistsAPI.updateTask(todolistId, taskId, module).then((res)=>{
        if (res.data.resultCode === 0 ){
            dispatch(changeTaskTitleAC(taskId, title, todolistId))
        }
    })
}

export const updateTaskStatusTC = (todolistId: string, status: TaskStatuses, taskId: string) => (dispatch: Dispatch, getState: ()=> RootStateType) => {
    const state = getState()
    const  task = state.tasks[todolistId].find(t => t.id === taskId)
    if (!task) {
        console.warn('not find task')
        return
    }
    const module: UpdateTaskType = {
        title: task.title,
        description: task.description,
        status: status,
        priority: task.priority,
        startDate: task.startDate,
        deadline: task.deadline,
    }
    todolistsAPI.updateTask(todolistId, taskId, module).then((res)=>{
        if (res.data.resultCode === 0 ){
            dispatch(changeTaskStatusAC(taskId, status, todolistId))
        }
    })
}
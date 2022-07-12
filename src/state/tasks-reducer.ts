import {TasksStateType} from "../App";
import {TaskStatuses, TaskType, todolistsAPI, UpdateTaskType} from "../api/todolists-api";
import {addTodolistAC, removeTodolistAC, setTodolistsAC} from "./todolists-reducer";
import {Dispatch} from "redux";
import {RootStateType} from "./store";
import {setErrorAC, setStatusAC} from "./app-reducer";

type TaskActionType =
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof changeTaskTitleAC>
    | ReturnType<typeof changeTaskStatusAC>
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof setTodolistsAC>
    | ReturnType<typeof setTasksAC>

//action
export const removeTaskAC = (id: string, todolistId: string) => ({
    type: 'REMOVE-TASK',
    taskID: id,
    todolistID: todolistId
} as const)
export const addTaskAC = (task: TaskType) => ({type: 'ADD-TASK', task} as const)
export const changeTaskTitleAC = (id: string, title: string, todolistId: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        todolistID: todolistId,
        taskID: id,
        newTitle: title
    } as const
}
export const changeTaskStatusAC = (id: string, status: TaskStatuses, todolistId: string) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        todolistID: todolistId,
        taskID: id,
        status
    } as const
}
export const setTasksAC = (tasks: Array<TaskType>, todolistID: string) => ({
    type: 'SET-TASKS',
    tasks,
    todolistID
} as const)

//thunk
export const getTasksTC = (id: string) => (dispatch: Dispatch) => {
    dispatch(setStatusAC('loading'))
    todolistsAPI.getTasks(id)
        .then((res) => {
            dispatch(setTasksAC(res.data.items, id));
            dispatch(setStatusAC('succeeded'))
        })
}
export const deleteTasksTC = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
    dispatch(setStatusAC('loading'))
    todolistsAPI.deleteTask(todolistId, taskId).then((res) => {
        if (res.data.resultCode === 0) {
            dispatch(removeTaskAC(taskId, todolistId))
            dispatch(setStatusAC('succeeded'))
        }
    })
}
export const createTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setStatusAC('loading'))
    todolistsAPI.createTask(todolistId, title).then((res) => {
        if (res.data.resultCode === 0) {
            dispatch(addTaskAC(res.data.data.item))
            dispatch(setStatusAC('succeeded'))
        } else {
            if (res.data.messages.length) {
                dispatch(setErrorAC(res.data.messages[0]))
            } else {dispatch(setErrorAC("Some error occurred"))}
        }
    })
}
export const updateTaskTitleTC = (todolistId: string, taskId: string, title: string) => (dispatch: Dispatch, getState: () => RootStateType) => {
    const state = getState()
    const task = state.tasks[todolistId].find(t => t.id === taskId)
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
    todolistsAPI.updateTask(todolistId, taskId, module).then((res) => {
        if (res.data.resultCode === 0) {
            dispatch(changeTaskTitleAC(taskId, title, todolistId))
        }
    })
}
export const updateTaskStatusTC = (todolistId: string, status: TaskStatuses, taskId: string) => (dispatch: Dispatch, getState: () => RootStateType) => {
    const state = getState()
    const task = state.tasks[todolistId].find(t => t.id === taskId)
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
    todolistsAPI.updateTask(todolistId, taskId, module).then((res) => {
        if (res.data.resultCode === 0) {
            dispatch(changeTaskStatusAC(taskId, status, todolistId))
        }
    })
}

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: TaskActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todolistID]: state[action.todolistID].filter(t => t.id !== action.taskID)}
        case 'ADD-TASK':
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        case 'CHANGE-TASK-TITLE':
            return {
                ...state, [action.todolistID]: state[action.todolistID].map(t => t.id === action.taskID ? {
                    ...t, title: action.newTitle
                } : t)
            }
        case 'CHANGE-TASK-STATUS':
            return {
                ...state, [action.todolistID]: state[action.todolistID].map(t => t.id === action.taskID ? {
                    ...t, status: action.status
                } : t)
            }
        case 'ADD-TODOLIST':
            return {...state, [action.todolist.id]: []}
        case "REMOVE-TODOLIST": {
            const stateCopy = {...state,}
            delete {...state}[action.id]
            return stateCopy
        }
        case 'SET-TODOLISTS':
            const stateCopy = {...state}
            action.todolists.forEach((tl) => {
                stateCopy[tl.id] = []
            })
            return stateCopy;
        case 'SET-TASKS':
            return {...state, [action.todolistID]: action.tasks}
        default:
            return state;
    }
}


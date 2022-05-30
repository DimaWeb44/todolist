import {v1} from "uuid";
import {todolistsAPI, TodolistType} from "../api/todolists-api";
import {useDispatch} from "react-redux";
import {Dispatch} from "redux";

type ActionType =
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | ReturnType<typeof setTodolistsAC>


export type FilterValuesType = "all" | "completed" | "active"
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

export const removeTodolistAC = (todolistId: string) => ({type: 'REMOVE-TODOLIST', id: todolistId} as const)
export const addTodolistAC = (newTodolistTitle: string) => (
    {
        type: 'ADD-TODOLIST',
        title: newTodolistTitle,
        todolistID: v1()
    } as const)
export const changeTodolistTitleAC = (title: string, id: string) => ({
    type: 'CHANGE-TODOLIST-TITLE',
    id,
    title
} as const)
export const changeTodolistFilterAC = (filter: FilterValuesType, id: string) => ({
    type: 'CHANGE-TODOLIST-FILTER',
    id,
    filter
} as const)
export const setTodolistsAC = (todolists: Array<TodolistType>) => ({type: 'SET-TODOLISTS', todolists}) as const

export let todolistID1 = v1()

const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return [...state].filter(tl => tl.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            return [{
                id: action.todolistID,
                filter: "all",
                title: action.title,
                addedDate: '',
                order: 0
            }, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return [...state].map(tl => tl.id === action.id ? {
                ...tl, title: action.title
            } : tl)
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return [...state].map(tl => tl.id === action.id ? {
                ...tl, filter: action.filter
            } : tl)
        }
        case 'SET-TODOLISTS': {
            return action.todolists.map(tl => ({
                ...tl,
                filter: 'all'
            }))
        }
        default:
            return state;
    }
}

export const getTodolistsTC = () => (dispatch: Dispatch) => {
    todolistsAPI.getTodolists()
        .then((res) => {
            dispatch(setTodolistsAC(res.data));
        })
}
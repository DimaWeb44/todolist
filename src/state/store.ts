import {applyMiddleware, combineReducers, createStore} from "redux";
import {tasksReducer} from "./tasks-reducer";
import {todolistsReducer} from "./todolists-reducer";
import thunk from "redux-thunk";


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

export type RootStateType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, applyMiddleware(thunk))


// @ts-ignore
window.store = store
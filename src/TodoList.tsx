import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from "./App";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListPropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string, todolistID: string) => void
    changeFilter: (value: FilterValuesType, todolistID: string) => void
    addTask: (title: string, todolistID: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, todolistID: string) => void
    filter: FilterValuesType
    removeTodolist: (todolistID: string)=> void
}

export const TodoList = (props: TodoListPropsType) => {
    const [newTaskTitle, setNewTaskTitle] = useState("")
    const [error, setError] = useState<string | null>(null)

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const addTask = () => {
        if (newTaskTitle.trim() !== '') {
            props.addTask(newTaskTitle.trim(), props.id)
            setNewTaskTitle("")
        } else {
            setError("Title is required")
        }
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.charCode === 13) {
            addTask()
        }
    }

    const onAllClickHandler = () => {
        props.changeFilter("all", props.id)
    }
    const onActiveClickHandler = () => {
        props.changeFilter("active", props.id)
    }
    const onCompletedClickHandler = () => {
        props.changeFilter("completed", props.id)
    }
   let removeTodolist = () => {
        props.removeTodolist(props.id)
   }

    return (
        <div>
            <div>
                <h3>{props.title} <button onClick={removeTodolist}>X</button></h3>
                <div>
                    <input
                        value={newTaskTitle}
                        onChange={onNewTitleChangeHandler}
                        onKeyPress={onKeyPressHandler}
                        className={error ? 'error' : ''}
                    />
                    <button onClick={addTask}>+</button>
                    {error && <div className='error-message'>{error}</div>}
                </div>
                <ul>{props.tasks.map((t) => {
                    const onClickHandler = () => {
                        props.removeTask(t.id, props.id)
                    }
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
                    }
                    return <li className={t.isDone ? "is-done" : ""}><input
                        type="checkbox"
                        checked={t.isDone}
                        onChange={onChangeHandler}
                    />
                        <span>{t.title}</span>
                        <button onClick={onClickHandler}>x</button>
                    </li>
                })
                }
                </ul>
                <div>
                    <button className={props.filter === "all" ? "active-filter" : ""} onClick={onAllClickHandler}>All
                    </button>
                    <button className={props.filter === "active" ? "active-filter" : ""}
                            onClick={onActiveClickHandler}>Active
                    </button>
                    <button className={props.filter === "completed" ? "active-filter" : ""}
                            onClick={onCompletedClickHandler}>Completed
                    </button>
                </div>
            </div>
        </div>
    );
}


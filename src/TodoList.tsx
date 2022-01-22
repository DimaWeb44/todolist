import React, {ChangeEvent} from 'react';
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";


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
    changeTaskTitle: (taskID: string, newTitle: string, todolistID: string) => void
    filter: FilterValuesType
    removeTodolist: (todolistID: string) => void
    changeTodolistTitle: (newTitle: string, todolistID: string) => void
}

export const TodoList = (props: TodoListPropsType) => {

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
    const changeTodolistTitle = (newTitle: string) => {
        props.changeTodolistTitle(newTitle, props.id)
    }
    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    return (
        <div>
            <div>
                <h3><EditableSpan title={props.title} onChang={changeTodolistTitle}/>
                    <button onClick={removeTodolist}>X</button>
                </h3>
                <AddItemForm addItem={addTask}/>
                <ul>{props.tasks.map((t) => {
                    const onClickHandler = () => {
                        props.removeTask(t.id, props.id)
                    }
                    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
                    }
                    const onChangeTitleHandler = (newTitle: string) => {
                        props.changeTaskTitle(t.id, newTitle, props.id)
                    }
                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <input
                            type="checkbox"
                            checked={t.isDone}
                            onChange={onChangeStatusHandler}
                        />
                        <EditableSpan title={t.title} onChang={onChangeTitleHandler}/>
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

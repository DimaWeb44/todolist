import React, {ChangeEvent} from 'react';
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "./state/store";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type TodoListPropsType = {
    id: string
    title: string
    changeFilter: (value: FilterValuesType, todolistID: string) => void
    filter: FilterValuesType
    removeTodolist: (todolistID: string) => void
    changeTodolistTitle: (newTitle: string, todolistID: string) => void
}

export const TodoList = (props: TodoListPropsType) => {

    const tasks = useSelector<RootStateType, Array<TaskType>>(state => state.tasks[props.id])
    const dispatch = useDispatch()


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

    let tasksForTodolist = tasks
    if (props.filter === "completed") {
        tasksForTodolist = tasksForTodolist.filter(t => t.isDone)
    }
    if (props.filter === "active") {
        tasksForTodolist = tasksForTodolist.filter(t => !t.isDone)
    }

    return (
        <div>
            <div>
                <h3><EditableSpan title={props.title} onChang={changeTodolistTitle}/>
                    <IconButton onClick={removeTodolist}>
                        <Delete/>
                    </IconButton>
                </h3>
                <AddItemForm addItem={(title) => {
                    dispatch(addTaskAC(title, props.id))
                }}/>
                <div>{tasksForTodolist.map((t) => {
                    const removeTask = () => {
                        dispatch(removeTaskAC(t.id, props.id))
                    }
                    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        dispatch(changeTaskStatusAC(t.id, e.currentTarget.checked, props.id))
                    }
                    const onChangeTitleHandler = (newTitle: string) => {
                        dispatch(changeTaskTitleAC(t.id, newTitle, props.id))
                    }
                    return <div key={t.id} className={t.isDone ? "is-done" : ""}>
                        <Checkbox
                            checked={t.isDone}
                            onChange={onChangeStatusHandler}
                        />
                        <EditableSpan title={t.title} onChang={onChangeTitleHandler}/>
                        <IconButton onClick={removeTask}>
                            <Delete/>
                        </IconButton>
                    </div>
                })
                }
                </div>
                <div>
                    <Button color={"inherit"} variant={props.filter === "all" ? "contained" : "text"}
                            onClick={onAllClickHandler}>All
                    </Button>
                    <Button variant={props.filter === "active" ? "contained" : "text"} color={"primary"}
                            onClick={onActiveClickHandler}>Active
                    </Button>
                    <Button variant={props.filter === "completed" ? "contained" : "text"} color={"secondary"}
                            onClick={onCompletedClickHandler}>Completed
                    </Button>
                </div>
            </div>
        </div>
    );
}

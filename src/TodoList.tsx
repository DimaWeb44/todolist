import React, {useCallback, useEffect} from 'react';
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import {EditableSpan} from "./components/EditaleSpan/EditableSpan";
import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "./state/store";
import {addTaskAC, createTaskTC, getTasksTC} from "./state/tasks-reducer";
import {Task} from "./Task";
import {TaskStatuses, TaskType} from './api/todolists-api';
import {FilterValuesType} from "./state/todolists-reducer";

type TodoListPropsType = {
    id: string
    title: string
    changeFilter: (value: FilterValuesType, todolistID: string) => void
    filter: FilterValuesType
    removeTodolist: (todolistID: string) => void
    changeTodolistTitle: (newTitle: string, todolistID: string) => void
}

export const TodoList = React.memo((props: TodoListPropsType) => {


    console.log('TodoList')

    const tasks = useSelector<RootStateType, Array<TaskType>>(state => state.tasks[props.id])
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getTasksTC(props.id))
    }, [props.id])

    const onAllClickHandler = useCallback(() => {
        props.changeFilter("all", props.id)
    }, [props.changeFilter, props.id])

    const onActiveClickHandler = useCallback(() => {
        props.changeFilter("active", props.id)
    }, [props.changeFilter, props.id])

    const onCompletedClickHandler = useCallback(() => {
        props.changeFilter("completed", props.id)
    }, [props.changeFilter, props.id])

    const removeTodolist = useCallback(() => {
        props.removeTodolist(props.id)
    }, [props.removeTodolist, props.id])

    const changeTodolistTitle = useCallback((newTitle: string) => {
        props.changeTodolistTitle(newTitle, props.id)
    }, [props.changeTodolistTitle, props.id])

    let tasksForTodolist = tasks
    if (props.filter === "completed") {
        tasksForTodolist = tasksForTodolist.filter(t => t.status === TaskStatuses.Completed)
    }
    if (props.filter === "active") {
        tasksForTodolist = tasksForTodolist.filter(t => t.status === TaskStatuses.New)
    }

    return (
        <div>
            <h3><EditableSpan title={props.title} onChang={changeTodolistTitle}/>
                <IconButton onClick={removeTodolist}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={useCallback((title) => {
                dispatch(createTaskTC(props.id, title))
            }, [props.id])}/>
            <div>
                {tasksForTodolist.map((t) => {
                    return <Task task={t}
                                 todolistId={props.id}
                                 key={t.id}
                    />
                })}
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
    );
})



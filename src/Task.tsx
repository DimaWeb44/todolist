import {useDispatch} from "react-redux";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@mui/icons-material";
import {TaskType} from "./TodoList";

type TaskPropsType = {
    task: TaskType
    todolistId: string
}
export const Task = React.memo((props: TaskPropsType) => {
    console.log('Task')
    const dispatch = useDispatch()

    const removeTask = useCallback(() => {
        dispatch(removeTaskAC(props.task.id, props.todolistId))
    },[props.task.id, props.todolistId])

    const onChangeStatusHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTaskStatusAC(props.task.id, e.currentTarget.checked, props.todolistId))
    },[props.task.id, props.todolistId])

    const onChangeTitleHandler = useCallback((newTitle: string) => {
        dispatch(changeTaskTitleAC(props.task.id, newTitle, props.todolistId))
    },[props.task.id, props.todolistId])

    return <div key={props.task.id} className={props.task.isDone ? "is-done" : ""}>
        <Checkbox
            checked={props.task.isDone}
            onChange={onChangeStatusHandler}
        />
        <EditableSpan title={props.task.title} onChang={onChangeTitleHandler}/>
        <IconButton onClick={removeTask}>
            <Delete/>
        </IconButton>
    </div>
})










/*

import React from "react";
import {AddItemForm} from "./AddItemForm";
import {action} from "@storybook/addon-actions";

export default {
    title: 'AddItemForm component',
    component: AddItemForm
}

const callback = action("Button add was pressed inside the form")

export const AddItemFormBaseExample = () => {
return <AddItemForm addItem={callback} />
*/

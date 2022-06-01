import {useDispatch} from "react-redux";
import {changeTaskStatusAC, deleteTasksTC, updateTaskStatusTC, updateTaskTitleTC} from "./state/tasks-reducer";
import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@mui/icons-material";
import {TaskStatuses, TaskType} from "./api/todolists-api";


type TaskPropsType = {
    task: TaskType
    todolistId: string
}
export const Task = React.memo((props: TaskPropsType) => {
    console.log('Task')
    const dispatch = useDispatch()

    const removeTask = useCallback(() => {
        dispatch(deleteTasksTC(props.todolistId, props.task.id))
    },[props.task.id, props.todolistId])

    const onChangeStatusHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneChecked = e.currentTarget.checked
        dispatch(updateTaskStatusTC(props.todolistId, newIsDoneChecked? TaskStatuses.Completed : TaskStatuses.New, props.task.id))
    },[props.task.id, props.todolistId])

    const onChangeTitleHandler = useCallback((newTitle: string) => {
        dispatch(updateTaskTitleTC(props.todolistId, props.task.id, newTitle))
    },[props.task.id, props.todolistId])

    return <div key={props.task.id} className={props.task.status === TaskStatuses.Completed ? "is-done" : ""}>
        <Checkbox
            checked={props.task.status === TaskStatuses.Completed}
            onChange={onChangeStatusHandler}
        />
        <EditableSpan title={props.task.title} onChang={onChangeTitleHandler}/>
        <IconButton onClick={removeTask}>
            <Delete/>
        </IconButton>
    </div>
})
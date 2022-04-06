import React from "react";
import {Task} from "../Task";
import {ReduxStoreProviderDecorator} from "./ReduxStoreProviderDecorator";
import {TaskPriorities, TaskStatuses} from "../api/todolists-api";

export default {
    title: 'Task component',
    component: Task,
    decorators: [ReduxStoreProviderDecorator]
}

/*const callback = action("Button add was pressed inside the form")*/

export const TaskBaseExample = () => {
    return <>
        <Task task={{id: '1', title: "React", status: TaskStatuses.New, addedDate: '',
            deadline: '', description: '', order: 0, priority: TaskPriorities.Urgently, startDate: '', todoListId:'todolistId'}}
              todolistId={'1'}/>
        <Task task={{id: '2', title: "CSS", status: TaskStatuses.Completed, addedDate: '',
            deadline: '', description: '', order: 0, priority: TaskPriorities.Urgently, startDate: '', todoListId:'todolistId'}}
              todolistId={'2'}/>
    </>
}
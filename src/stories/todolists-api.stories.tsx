import React, {ChangeEvent, useEffect, useState} from 'react'
import {todolistsAPI} from "../api/todolists-api";

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)

    const getTL = () => {
        todolistsAPI.getTodolists()
            .then((res) => {
                setState(res.data);
            })
    }
    return <div>
        <button
            onClick={getTL}>
            Get Todolists
        </button>

        {JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<any>(null)

    const createTL = () => {
        todolistsAPI.createTodolist(title)
            .then((res) => {
                setState(res.data);
            })
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    return <div>
        <input placeholder={'Todolist title'}
               onChange={changeTitle}
               value={title}
        />
        <button
            onClick={createTL}>
            Create Todolist
        </button>

        {JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [id, setId] = useState<any>(null)

    const deleteTL = () => {
        todolistsAPI.deleteTodolist(id).then((res) => {
            setState(res.data);
        })
    }
    const changeId = (e: ChangeEvent<HTMLInputElement>) => {
        setId(e.currentTarget.value)
    }
    return <div>
        <input
            placeholder={'Todolist ID'}
            onChange={changeId}
            value={id}
        />
        <button
            onClick={deleteTL}>
            Delete Todolist
        </button>

        {JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const [id, setId] = useState<any>(null)
    const [title, setTitle] = useState<any>(null)
    const updateTLTitle = () => {
        todolistsAPI.updateTodolistTitle(id, title)
            .then((res) => {
                setState(res.data);
            })
    }
    const changeId = (e: ChangeEvent<HTMLInputElement>) => {
        setId(e.currentTarget.value)
    }

    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    return <div>
        <input
            placeholder={'Todolist ID'}
            onChange={changeId}
            value={id}/>
        <input
            placeholder={'Todolist title'}
            onChange={changeTitle}
            value={title}/>
        <button
            onClick={updateTLTitle}>
            update Todolist Title
        </button>

        {JSON.stringify(state)}</div>
}

export const GetTasks = () => {
    const [state, setState] = useState({});
    const [todoListId, setTodoListId] = useState<string>('');

    const getTasks = () => {
        todolistsAPI.getTasks(todoListId)
            .then(res => setState(res.data.items));
    }

    return (
        <div>
            {JSON.stringify(state)}
            <div>
                <input
                    placeholder={"todoListId"}
                    value={todoListId}
                    onChange={(e) => setTodoListId(e.currentTarget.value)}
                />
                <button onClick={getTasks}>
                    Get tasks
                </button>
            </div>
        </div>
    )
};

export const CreateTask = () => {
    const [state, setState] = useState<any>(null);
    const [taskTitle, setTaskTitle] = useState<string>('');
    const [todoListId, setTodoListId] = useState<string>('');

    const createTask = () => {
        todolistsAPI.createTask(todoListId, taskTitle)
            .then(res => setState(res.data));
    }

    return (
        <div>
            {JSON.stringify(state)}
            <div>
                <input
                    placeholder={"todoListId"}
                    value={todoListId}
                    onChange={(e) => setTodoListId(e.currentTarget.value)}
                />
                <input
                    placeholder={"taskTitle"}
                    value={taskTitle}
                    onChange={(e) => setTaskTitle(e.currentTarget.value)}
                />
                <button onClick={createTask}>
                    Create task
                </button>
            </div>
        </div>

    )
};

export const DeleteTask = () => {
    const [state, setState] = useState({});
    const [taskId, setTaskId] = useState("");
    const [todolistId, setTodoListId] = useState("");

    const deleteTask = () => {
        todolistsAPI.deleteTask(todolistId, taskId)
            .then(res => setState(res.data));
    }

    return (
        <div>
            {JSON.stringify(state)}
            <div>
                <input
                    placeholder={"todolistId"}
                    value={todolistId}
                    onChange={(e) => {
                        setTodoListId(e.currentTarget.value)
                    }}
                />
                <input
                    placeholder={"taskId"}
                    value={taskId}
                    onChange={(e) => {
                        setTaskId(e.currentTarget.value)
                    }}
                />
                <button onClick={deleteTask}>
                    delete task
                </button>
            </div>
        </div>
    )
};

export const UpdateTask = () => {
    const [state, setState] = useState<any>(null);
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [status, setStatus] = useState<number>(0);
    const [priority, setPriority] = useState<number>(0);
    const [todoListId, setTodoListId] = useState<string>('');
    const [taskId, setTaskId] = useState<string>('');

    const createTask = () => {
        todolistsAPI.updateTask(todoListId, taskId, {
            deadline: '',
            description: description,
            priority: priority,
            startDate: '',
            status: status,
            title: title
        }).then(res => setState(res.data));
    }

    return (
        <div>
            {JSON.stringify(state)}
            <div>
                <input
                    placeholder={"taskId"}
                    value={taskId}
                    onChange={(e) => {
                        setTaskId(e.currentTarget.value)
                    }}
                />
                <input
                    placeholder={"todolistId"}
                    value={todoListId}
                    onChange={(e) => {
                        setTodoListId(e.currentTarget.value)
                    }}
                />
                <input
                    placeholder={"task title"}
                    value={title}
                    onChange={(e) => {
                        setTitle(e.currentTarget.value)
                    }}
                />
                <input
                    placeholder={"task description"}
                    value={description}
                    onChange={(e) => {
                        setDescription(e.currentTarget.value)
                    }}
                />
                <input
                    placeholder={"status"}
                    value={status}
                    type={'number'}
                    onChange={(e) => {
                        setStatus(+e.currentTarget.value)
                    }}
                />
                <input
                    placeholder={"priority"}
                    value={priority}
                    type={'number'}
                    onChange={(e) => {
                        setPriority(+e.currentTarget.value)
                    }}
                />
                <button onClick={createTask}>
                    Create task
                </button>
            </div>
        </div>
    )
};

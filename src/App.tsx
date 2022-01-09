import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";
import {v1} from "uuid";

export type FilterValuesType = "all" | "completed" | "active"
type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {
    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistID1, title: 'Buy', filter: 'all'},
        {id: todolistID2, title: 'Learn', filter: 'all'}
    ])

    function addTask(title: string, todolistID: string) {
        let task = {id: v1(), title: title, isDone: false}
       let  tasks = tasksObj[todolistID]
        let newTasks = [task, ...tasks]
        tasksObj[todolistID] = newTasks
        setTasks({...tasksObj})
    }

    function removeTask(id: string, todolistID: string) {
      let tasks = tasksObj[todolistID]
        let filteredTasks = tasks.filter((t) => t.id !== id)
        tasksObj[todolistID] = filteredTasks
        setTasks({...tasksObj})
    }

    function changeStatus(taskID: string, isDone: boolean, todolistID: string) {
        let  tasks = tasksObj[todolistID]
        let task = tasks.find(t => t.id === taskID)
        if (task) {
            task.isDone = isDone
            setTasks({...tasksObj})
        }

    }

    function changeFilter(value: FilterValuesType, todolistID: string) {
        let todolist = todolists.find(tl => tl.id === todolistID)
        if (todolist) {
            todolist.filter = value
            setTodolists([...todolists])
        }
    }

    let removeTodolist = (todolistID: string) => {
        let filteredTodolist = todolists.filter((tl) => tl.id !== todolistID)
        setTodolists(filteredTodolist)
        delete tasksObj[todolistID]
        setTasks({...tasksObj})
    }

        let [tasksObj, setTasks]=useState({
            [todolistID1]:[ {id: v1(), title: "CSS", isDone: true},
                {id: v1(), title: "JS", isDone: true},
                {id: v1(), title: "React", isDone: false},
                {id: v1(), title: "Redux", isDone: false},],
            [todolistID2]: [ {id: v1(), title: "CSS", isDone: true},
                {id: v1(), title: "JS", isDone: true},
                {id: v1(), title: "React", isDone: false},
                {id: v1(), title: "Redux", isDone: false},]
        })

    return (
        <div className="App">
            {todolists.map(tl => {
                let tasksForTodolist = tasksObj[tl.id]
                if (tl.filter === "completed") {
                    tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true)
                }
                if (tl.filter === "active") {
                    tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false)
                }
                return (<TodoList
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={tl.filter}
                        removeTodolist={removeTodolist}/>
                )
            })}


        </div>);
}

export default App;

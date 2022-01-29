import {
    removeTaskAC,
    addTaskAC,
    changeTaskTitleAC,
    changeTaskStatusAC,
    tasksReducer
} from './tasks-reducer';
import {v1} from 'uuid';
import {TasksStateType} from '../App';
import {addTodolistAC} from "./todolists-reducer";

test('correct task should be removed', () => {
    let todolistID1 = v1();
    let todolistID2 = v1();
    let id = v1();

    const startState: TasksStateType = {
        [todolistID1]: [{id: v1(), title: "CSS", isDone: true},
            {id: id, title: "JS", isDone: true},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "Redux", isDone: false},],
        [todolistID2]: [{id: v1(), title: "butter", isDone: true},
            {id: v1(), title: "milk", isDone: true},
            {id: v1(), title: "tea", isDone: false},
            {id: v1(), title: "bread", isDone: false},]
    }

    const endState = tasksReducer(startState, removeTaskAC(todolistID1, id))

    expect(endState[todolistID1].length).toBe(3);
    expect(endState[todolistID1][1].title).toBe('React');
});

test('correct task should be added', () => {
    let todolistID1 = v1();
    let todolistID2 = v1();
    let newTaskTitle = "New Task";

    const startState: TasksStateType = {
        [todolistID1]: [{id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "Redux", isDone: false},],
        [todolistID2]: [{id: v1(), title: "butter", isDone: true},
            {id: v1(), title: "milk", isDone: true},
            {id: v1(), title: "tea", isDone: false},
            {id: v1(), title: "bread", isDone: false},]
    }

    const endState = tasksReducer(startState, addTaskAC(todolistID1, newTaskTitle))

    expect(endState[todolistID1].length).toBe(5);
    expect(endState[todolistID2].length).toBe(4);
    expect(endState[todolistID1][0].id).toBeDefined();
    expect(endState[todolistID1][0].title).toBe(newTaskTitle);
    expect(endState[todolistID1][0].isDone).toBe(false);
});

test('correct task should change its title', () => {
    let todolistID1 = v1();
    let todolistID2 = v1();
    let id = v1();
    let newTaskTitle = "modified Task";

    const startState: TasksStateType = {
        [todolistID1]: [{id: v1(), title: "CSS", isDone: true},
            {id: id, title: "React", isDone: true},
            {id: v1(), title: "Redux", isDone: false},],
        [todolistID2]: [{id: v1(), title: "butter", isDone: true},
            {id: id, title: "milk", isDone: true},
            {id: v1(), title: "tea", isDone: false},
            {id: v1(), title: "bread", isDone: false},]
    }

    const action = changeTaskTitleAC(todolistID2, id, newTaskTitle)

    const endState = tasksReducer(startState, action);

    expect(endState[todolistID2][1].title).toBe(newTaskTitle);
    expect(endState[todolistID2][0].title).toBe("butter");
});

test('status of specified task should be changed', () => {
    let todolistID1 = v1();
    let todolistID2 = v1();
    let id = v1();
    let isDone = true;

    const startState: TasksStateType = {
        [todolistID1]: [{id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "Redux", isDone: false},],
        [todolistID2]: [{id: v1(), title: "butter", isDone: true},
            {id: id, title: "milk", isDone: false},
            {id: v1(), title: "tea", isDone: false},
            {id: v1(), title: "bread", isDone: false},]
    }

    const action = changeTaskStatusAC(todolistID2, id, isDone)

    const endState = tasksReducer(startState, action);

    expect(endState[todolistID2][0].isDone).toBe(true);
    expect(endState[todolistID2][1].isDone).toBe(true);
    expect(endState[todolistID1][1].isDone).toBe(false);
});

test('new property with new array should be added when new todolist added', () => {
    let todolistID1 = v1();
    let todolistID2 = v1();

    const startState: TasksStateType = {
        [todolistID1]: [{id: '1', title: "CSS", isDone: true},
            {id: '2', title: "React", isDone: false},
            {id: '3', title: "Redux", isDone: false},],
        [todolistID2]: [{id: '1', title: "butter", isDone: true},
            {id: '2', title: "milk", isDone: false},
            {id: '3', title: "tea", isDone: false},
            {id: '4', title: "bread", isDone: false},]
    }

    const action = addTodolistAC('title')
    const endState = tasksReducer(startState, action);

    const keys = Object.keys(endState)
    const newKey = keys.find(k => k != todolistID1 && k != todolistID2)

    if (!newKey) {
        throw Error('new key should be added')
    }
    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});

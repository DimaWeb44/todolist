import {
    removeTaskAC,
    addTaskAC,
    changeTaskTitleAC,
    changeTaskStatusAC,
    tasksReducer
} from './tasks-reducer';
import {v1} from 'uuid';
import {TasksStateType} from '../App';
import {addTodolistAC, removeTodolistAC} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses} from "../api/todolists-api";

test('correct task should be removed', () => {
    let todolistID1 = v1();
    let todolistID2 = v1();
    let id = v1();

    const startState: TasksStateType = {
        [todolistID1]: [{
            id: v1(),
            title: "CSS",
            status: TaskStatuses.Completed,
            addedDate: '',
            deadline: '',
            description: '',
            order: 0,
            priority: TaskPriorities.Urgently,
            startDate: '',
            todoListId: todolistID1
        },
            {
                id: id,
                title: "JS",
                status: TaskStatuses.Completed,
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: TaskPriorities.Urgently,
                startDate: '',
                todoListId: todolistID1
            },
            {
                id: v1(),
                title: "React",
                status: TaskStatuses.New,
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: TaskPriorities.Urgently,
                startDate: '',
                todoListId: todolistID1
            },
            {
                id: v1(),
                title: "Redux",
                status: TaskStatuses.New,
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: TaskPriorities.Urgently,
                startDate: '',
                todoListId: todolistID1
            },],
        [todolistID2]: [{
            id: v1(),
            title: "butter",
            status: TaskStatuses.Completed,
            addedDate: '',
            deadline: '',
            description: '',
            order: 0,
            priority: TaskPriorities.Urgently,
            startDate: '',
            todoListId: todolistID2
        },
            {
                id: v1(),
                title: "milk",
                status: TaskStatuses.Completed,
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: TaskPriorities.Urgently,
                startDate: '',
                todoListId: todolistID2
            },
            {
                id: v1(),
                title: "tea",
                status: TaskStatuses.New,
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: TaskPriorities.Urgently,
                startDate: '',
                todoListId: todolistID1
            },
            {
                id: v1(),
                title: "bread",
                status: TaskStatuses.New,
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: TaskPriorities.Urgently,
                startDate: '',
                todoListId: todolistID2
            },],
    }

    const endState = tasksReducer(startState, removeTaskAC(id, todolistID1))

    expect(endState[todolistID1].length).toBe(3);
    expect(endState[todolistID1][1].title).toBe('React');
});

test('correct task should be added', () => {
    let todolistID1 = v1();
    let todolistID2 = v1();
    let newTaskTitle = "New Task";

    const startState: TasksStateType = {
        [todolistID1]: [{
            id: v1(),
            title: "CSS",
            status: TaskStatuses.Completed,
            addedDate: '',
            deadline: '',
            description: '',
            order: 0,
            priority: TaskPriorities.Urgently,
            startDate: '',
            todoListId: todolistID1
        },
            {
                id: v1(),
                title: "JS",
                status: TaskStatuses.Completed,
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: TaskPriorities.Urgently,
                startDate: '',
                todoListId: todolistID1
            },
            {
                id: v1(),
                title: "React",
                status: TaskStatuses.New,
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: TaskPriorities.Urgently,
                startDate: '',
                todoListId: todolistID1
            },
            {
                id: v1(),
                title: "Redux",
                status: TaskStatuses.New,
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: TaskPriorities.Urgently,
                startDate: '',
                todoListId: todolistID1
            },],
        [todolistID2]: [{
            id: v1(),
            title: "butter",
            status: TaskStatuses.Completed,
            addedDate: '',
            deadline: '',
            description: '',
            order: 0,
            priority: TaskPriorities.Urgently,
            startDate: '',
            todoListId: todolistID2
        },
            {
                id: v1(),
                title: "milk",
                status: TaskStatuses.Completed,
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: TaskPriorities.Urgently,
                startDate: '',
                todoListId: todolistID2
            },
            {
                id: v1(),
                title: "tea",
                status: TaskStatuses.New,
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: TaskPriorities.Urgently,
                startDate: '',
                todoListId: todolistID1
            },
            {
                id: v1(),
                title: "bread",
                status: TaskStatuses.New,
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: TaskPriorities.Urgently,
                startDate: '',
                todoListId: todolistID2
            },],
    }

    const endState = tasksReducer(startState, addTaskAC(newTaskTitle, todolistID1))

    expect(endState[todolistID1].length).toBe(5);
    expect(endState[todolistID2].length).toBe(4);
    expect(endState[todolistID1][0].id).toBeDefined();
    expect(endState[todolistID1][0].title).toBe(newTaskTitle);
    expect(endState[todolistID1][0].status).toBe(TaskStatuses.New);
});

test('correct task should change its title', () => {
    let todolistID1 = v1();
    let todolistID2 = v1();
    let id = v1();
    let newTaskTitle = "modified Task";

    const startState: TasksStateType = {
        [todolistID1]: [{
            id: v1(),
            title: "CSS",
            status: TaskStatuses.Completed,
            addedDate: '',
            deadline: '',
            description: '',
            order: 0,
            priority: TaskPriorities.Urgently,
            startDate: '',
            todoListId: todolistID1
        },
            {
                id: id,
                title: "JS",
                status: TaskStatuses.Completed,
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: TaskPriorities.Urgently,
                startDate: '',
                todoListId: todolistID1
            },
            {
                id: v1(),
                title: "React",
                status: TaskStatuses.New,
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: TaskPriorities.Urgently,
                startDate: '',
                todoListId: todolistID1
            },
            {
                id: v1(),
                title: "Redux",
                status: TaskStatuses.New,
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: TaskPriorities.Urgently,
                startDate: '',
                todoListId: todolistID1
            },],
        [todolistID2]: [{
            id: v1(),
            title: "butter",
            status: TaskStatuses.Completed,
            addedDate: '',
            deadline: '',
            description: '',
            order: 0,
            priority: TaskPriorities.Urgently,
            startDate: '',
            todoListId: todolistID2
        },
            {
                id: v1(),
                title: "milk",
                status: TaskStatuses.Completed,
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: TaskPriorities.Urgently,
                startDate: '',
                todoListId: todolistID2
            },
            {
                id: v1(),
                title: "tea",
                status: TaskStatuses.New,
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: TaskPriorities.Urgently,
                startDate: '',
                todoListId: todolistID1
            },
            {
                id: v1(),
                title: "bread",
                status: TaskStatuses.New,
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: TaskPriorities.Urgently,
                startDate: '',
                todoListId: todolistID2
            },],
    }

    const action = changeTaskTitleAC(id, newTaskTitle, todolistID1)

    const endState = tasksReducer(startState, action);

    expect(endState[todolistID1][1].title).toBe(newTaskTitle);
    expect(endState[todolistID2][0].title).toBe("butter");
});

test('status of specified task should be changed', () => {
    let todolistID1 = v1();
    let todolistID2 = v1();
    let id = v1();



    const startState: TasksStateType = {
        [todolistID1]: [{
            id: v1(),
            title: "CSS",
            status: TaskStatuses.Completed,
            addedDate: '',
            deadline: '',
            description: '',
            order: 0,
            priority: TaskPriorities.Urgently,
            startDate: '',
            todoListId: todolistID1
        },
            {
                id: id,
                title: "JS",
                status: TaskStatuses.Completed,
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: TaskPriorities.Urgently,
                startDate: '',
                todoListId: todolistID1
            },
            {
                id: v1(),
                title: "React",
                status: TaskStatuses.New,
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: TaskPriorities.Urgently,
                startDate: '',
                todoListId: todolistID1
            },
            {
                id: v1(),
                title: "Redux",
                status: TaskStatuses.New,
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: TaskPriorities.Urgently,
                startDate: '',
                todoListId: todolistID1
            },],
        [todolistID2]: [{
            id: v1(),
            title: "butter",
            status: TaskStatuses.Completed,
            addedDate: '',
            deadline: '',
            description: '',
            order: 0,
            priority: TaskPriorities.Urgently,
            startDate: '',
            todoListId: todolistID2
        },
            {
                id: v1(),
                title: "milk",
                status: TaskStatuses.Completed,
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: TaskPriorities.Urgently,
                startDate: '',
                todoListId: todolistID2
            },
            {
                id: v1(),
                title: "tea",
                status: TaskStatuses.New,
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: TaskPriorities.Urgently,
                startDate: '',
                todoListId: todolistID1
            },
            {
                id: v1(),
                title: "bread",
                status: TaskStatuses.New,
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: TaskPriorities.Urgently,
                startDate: '',
                todoListId: todolistID2
            },],
    }
    const action = changeTaskStatusAC(id, TaskStatuses.New, todolistID2)

    const endState = tasksReducer(startState, action);

    expect(endState[todolistID2][0].status).toBe(TaskStatuses.Completed);
    expect(endState[todolistID2][1].status).toBe(TaskStatuses.Completed);
    expect(endState[todolistID1][1].status).toBe(TaskStatuses.Completed);
});

test('new property with new array should be added when new todolist added', () => {
    let todolistID1 = v1();
    let todolistID2 = v1();


    const startState: TasksStateType = {
        [todolistID1]: [{
            id: v1(),
            title: "CSS",
            status: TaskStatuses.Completed,
            addedDate: '',
            deadline: '',
            description: '',
            order: 0,
            priority: TaskPriorities.Urgently,
            startDate: '',
            todoListId: todolistID1
        },
            {
                id: v1(),
                title: "JS",
                status: TaskStatuses.Completed,
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: TaskPriorities.Urgently,
                startDate: '',
                todoListId: todolistID1
            },
            {
                id: v1(),
                title: "React",
                status: TaskStatuses.New,
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: TaskPriorities.Urgently,
                startDate: '',
                todoListId: todolistID1
            },
            {
                id: v1(),
                title: "Redux",
                status: TaskStatuses.New,
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: TaskPriorities.Urgently,
                startDate: '',
                todoListId: todolistID1
            },],
        [todolistID2]: [{
            id: v1(),
            title: "butter",
            status: TaskStatuses.Completed,
            addedDate: '',
            deadline: '',
            description: '',
            order: 0,
            priority: TaskPriorities.Urgently,
            startDate: '',
            todoListId: todolistID2
        },
            {
                id: v1(),
                title: "milk",
                status: TaskStatuses.Completed,
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: TaskPriorities.Urgently,
                startDate: '',
                todoListId: todolistID2
            },
            {
                id: v1(),
                title: "tea",
                status: TaskStatuses.New,
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: TaskPriorities.Urgently,
                startDate: '',
                todoListId: todolistID1
            },
            {
                id: v1(),
                title: "bread",
                status: TaskStatuses.New,
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: TaskPriorities.Urgently,
                startDate: '',
                todoListId: todolistID2
            },],
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

test('property with todolistId should be deleted', () => {

    const startState: TasksStateType = {
        ['todolistID1']: [{
            id: v1(),
            title: "CSS",
            status: TaskStatuses.Completed,
            addedDate: '',
            deadline: '',
            description: '',
            order: 0,
            priority: TaskPriorities.Urgently,
            startDate: '',
            todoListId: 'todolistID1'
        },
            {
                id: v1(),
                title: "JS",
                status: TaskStatuses.Completed,
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: TaskPriorities.Urgently,
                startDate: '',
                todoListId: 'todolistID1'
            },
            {
                id: v1(),
                title: "React",
                status: TaskStatuses.New,
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: TaskPriorities.Urgently,
                startDate: '',
                todoListId: 'todolistID1'
            },
            {
                id: v1(),
                title: "Redux",
                status: TaskStatuses.New,
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: TaskPriorities.Urgently,
                startDate: '',
                todoListId: 'todolistID1'
            },],
        ['todolistID2']: [{
            id: v1(),
            title: "butter",
            status: TaskStatuses.Completed,
            addedDate: '',
            deadline: '',
            description: '',
            order: 0,
            priority: TaskPriorities.Urgently,
            startDate: '',
            todoListId: 'todolistID2'
        },
            {
                id: v1(),
                title: "milk",
                status: TaskStatuses.Completed,
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: TaskPriorities.Urgently,
                startDate: '',
                todoListId: 'todolistID2'
            },
            {
                id: v1(),
                title: "tea",
                status: TaskStatuses.New,
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: TaskPriorities.Urgently,
                startDate: '',
                todoListId: 'todolistID1'
            },
            {
                id: v1(),
                title: "bread",
                status: TaskStatuses.New,
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: TaskPriorities.Urgently,
                startDate: '',
                todoListId: 'todolistID2'
            },],
    }

    const action = removeTodolistAC("todolistID2");

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).toBeUndefined();
});


import React, {useCallback, useEffect} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, LinearProgress, Paper, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {
    changeTodolistFilterAC,
    createTodolistTC,
    deleteTodolistTC,
    FilterValuesType,
    getTodolistsTC,
    TodolistDomainType,
    updateTodolistTitleTC
} from "./state/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "./state/store";
import {TaskType} from "./api/todolists-api";
import {ErrorSnackbar} from "./components/ErrorSnackbar/ErrorSnackbar";
import {RequestStatusType} from "./state/app-reducer";


export type  TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    
    const status = useSelector<RootStateType, RequestStatusType>(state => state.app.status)

    const dispatch = useDispatch()
    const todolists = useSelector<RootStateType, Array<TodolistDomainType>>(state => state.todolists)
    useEffect(() => {
        dispatch(getTodolistsTC())
    }, [])

    const changeTodolistTitle = useCallback((newTitle: string, todolistID: string) => {
        dispatch(updateTodolistTitleTC(todolistID, newTitle))
    }, [dispatch])

    const changeFilter = useCallback((value: FilterValuesType, todolistID: string) => {
        dispatch(changeTodolistFilterAC(value, todolistID))
    }, [dispatch])

    const removeTodolist = useCallback((todolistID: string) => {
        dispatch(deleteTodolistTC(todolistID))
    }, [dispatch])

    const addTodolist = useCallback((title: string) => {
        dispatch(createTodolistTC(title))
    }, [dispatch])

    return (
        <div className="App">
            <ErrorSnackbar/>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
                { status === 'loading' && <LinearProgress/>}
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {todolists.map(tl => {
                        return <Grid item key={tl.id}>
                            <Paper style={{padding: '10px'}}>
                                <TodoList
                                    key={tl.id}
                                    id={tl.id}
                                    title={tl.title}
                                    changeFilter={changeFilter}
                                    filter={tl.filter}
                                    removeTodolist={removeTodolist}
                                    changeTodolistTitle={changeTodolistTitle}
                                />
                            </Paper>
                        </Grid>
                    })}
                </Grid>
            </Container>
        </div>);
}

export default App;

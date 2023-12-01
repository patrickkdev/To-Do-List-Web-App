import { Box, ButtonBase, Container, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import TodoData from "./models/TodoList";
import Task from "./models/Task";
import TaskItem from "./components/task/task-item";
import StyledTextInput from "./components/text-input/text-input";
import ToggleTheme from "./components/theme/toggle-theme";
import { Add } from "@mui/icons-material";

export default function TodoApp() {

  const [todoData, setTodoData] = React.useState<TodoData>({
    title: 'Titulo da lista de tarefas',
    description: 'Descrição da lista de tarefas',
    tasks: [],
  });
  
  const isInitialRender = React.useRef(true);
  
  // #region data persistence

  React.useEffect(() => {
  // restore data from localStorage on first render
    const storedData = localStorage.getItem('todoData');
  
    if (storedData) {
      setTodoData(JSON.parse(storedData));
    }
  }, []);
  
  React.useEffect(() => {
    // save data to localStorage when it changes

    // Skip the initial render
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }
  
    function saveData() {
      localStorage.setItem('todoData', JSON.stringify(todoData));
    }
  
    saveData();
  }, [todoData]);

  // #endregion

  // #region crud functions

  function createNewTask() {
    const newTask: Task = {
      id: new Date().getTime(),
      title: 'Nova tarefa',
      description: 'Descrição da tarefa',
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    setTodoData({
      ...todoData,
      tasks: [...todoData.tasks, newTask],
    });
  }

  function updateTask(id: number, updatedTask: Task) {
    const updatedAt = new Date();

    setTodoData({
      ...todoData,
      tasks: todoData.tasks.map((task) => (task.id === id ? {...updatedTask, updatedAt} : task)),
    })
  }

  function deleteTask(id: number) {
    setTodoData({
      ...todoData,
      tasks: todoData.tasks.filter((task) => task.id !== id),
    });
  }
  
  //#endregion

  return (
    <Container maxWidth="md">
      <div style={{paddingTop: "24px"}}/>
      <ToggleTheme />
      <Box sx={{paddingTop: "48px", display: "flex", flexDirection: "column", width: "100%", gap: "24px"}}>
        <StyledTextInput
          style={{fontSize: "48px"}}
          value={todoData.title}
          onChange={(e) => {
            setTodoData({ ...todoData, title: e.target.value });
          }}
          onBlur={() => {
            if (todoData.title === '') {
              setTodoData({ ...todoData, title: 'Titulo da sua lista de tarefas' });
            }
          }}
        />
        <StyledTextInput
          style={{fontSize: "24px"}}
          value={todoData.description}
          onChange={(e) => {
            setTodoData({ ...todoData, description: e.target.value });
          }}
          onBlur={() => {
            if (todoData.description === '') {
              setTodoData({ ...todoData, description: 'Descrição da sua lista de tarefas' });
            }
          }}
        />
        <Stack direction={"column"} spacing={2}>
        {
          todoData.
          tasks.filter((task) => !task.completed).
          map((task, index) => (
            <TaskItem
              key={index}
              task={task}
              updateTask={(updatedTask) => updateTask(task.id, updatedTask)}
              deleteTask={() => deleteTask(task.id)}
            />
          ))
        }
        <>
          <hr />
          <Typography>{"Tarefas concluídas: " + todoData.tasks.filter((t) => t.completed).length}</Typography>
        </>
        {
          todoData.
          tasks.filter((task) => task.completed).
          map((task, index) => (
            <TaskItem
              key={index}
              task={task}
              updateTask={(updatedTask) => updateTask(task.id, updatedTask)}
              deleteTask={() => deleteTask(task.id)}
            />
          ))
        }
        </Stack>
        <Paper elevation={3}>
          <ButtonBase onClick={() => createNewTask()} sx={{display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", padding: "16px", borderRadius: "5px"}}>
            <Typography>{"Adicionar Tarefa"}</Typography>
            <Add />
          </ButtonBase>
        </Paper>
      </Box>
    </Container>
  );
}
import React from 'react'
import Task from '../../models/Task';
import { Box, Collapse, IconButton, Paper, TextField, Tooltip, useTheme } from '@mui/material';
import { ArrowUpward, Delete, Done, ExpandLess, ExpandMore } from '@mui/icons-material';
import { useConfirmationDialog } from '../dialogs/confirm-action';

interface Props {
  task: Task
  updateTask: (task: Task) => void
  deleteTask: () => void
}

const TaskItem = ({task, updateTask, deleteTask}: Props) => {

  const {askConfirmation} = useConfirmationDialog();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  async function handleDelete () {
    const confirmation = await askConfirmation('Tem certeza que deseja excluir esta tarefa?');

    if (!confirmation) {
      return
    }

    deleteTask();
  }

  return (
    <Paper elevation={3} sx={{opacity: task.completed ? 0.5 : 1}}>
      <Box sx={{width: "100%", padding: "12px", borderRadius: "5px", flexDirection: "column"}}>
        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%"}}>
          <div>
            <IconButton onClick={() => {
              setOpen(!open);
            }}>
              {open ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
            <input
              type='text'
              value={task.title}
              onChange={(e) => updateTask({...task, title: e.target.value})}
              onBlur={() => {
                if (task.title === '') {
                  updateTask({...task, title: 'Tarefa'})
                }
              }}
              style={{color: theme.palette.text.primary, border: "0", outline: "none", fontWeight: "bold", backgroundColor: "transparent", resize: "none"}}
            />
          </div>
          <div>
            <Tooltip title={task.completed ? "Desmarcar como concluída" : "Marcar como concluída"}>
              <IconButton onClick={() => updateTask({...task, completed: !task.completed})}>
              {
                task.completed ?
                <ArrowUpward />
                :
                <Done />
              }
              </IconButton>
            </Tooltip>
            <IconButton onClick={() => handleDelete()}>
              <Delete />
            </IconButton>
          </div>
        </div>
        <Collapse in={open} sx={{width: "100%"}}>
          <div style={{padding: "24px"}}>
            <TextField
              fullWidth
              multiline
              minRows={2}
              value={task.description}
              onChange={(e) => updateTask({...task, description: e.target.value})}
              onBlur={() => {
                if (task.description === '') {
                  updateTask({...task, description: 'Descrição da tarefa'})
                }
              }}
            />
          </div>
        </Collapse>
      </Box>
    </Paper>
  )
}

export default TaskItem
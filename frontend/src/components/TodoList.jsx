import * as React from "react";
import {useState, useMemo, useContext, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import axios from "../api/axios.jsx";

import {
  Container,
  Card,
  CardContent,
  Button,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  Grid,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
} from "@mui/material";

import Todo from "./Todo.jsx";
import {ToastContext} from "../contexts/ToastContext.jsx";
import {useTodos} from "../contexts/todosContexts.jsx";

export default function TodoList() {
  const {showHideToast} = useContext(ToastContext);
  const {todos, setTodos} = useTodos();
  const navigate = useNavigate();

  const [titleInput, setTitleInput] = useState("");
  const [detailsInput, setDetailsInput] = useState("");
  const [taskDate, setTaskDate] = useState("");

  const [displayedTodosType, setDisplayedTodosType] = useState("all");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [dialogTodo, setDialogTodo] = useState(null);
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    axios
      .get("/todos")
      .then((res) => {
        setTodos(res.data);
      })
      .catch((err) => {
        if (err.response?.status === 401) {
          navigate("/login");
        }
      });
  }, [setTodos, navigate]);

  function handleCheckClick(todo) {
    const updatedTodo = {
      ...todo,
      is_completed: !todo.is_completed,
    };

    axios
      .put(`/todos/${todo.id}`, updatedTodo)
      .then((res) => {
        setTodos(todos.map((t) => (t.id === todo.id ? res.data : t)));
        showHideToast("Status updated successfully", "success");
      })
      .catch((err) => {
        console.log(err);
        showHideToast("Error updating status", "error");
      });
  }

  const filteredAndSortedTodos = useMemo(() => {
    let list = todos.filter((t) => {
      if (displayedTodosType === "completed") return t.is_completed;
      if (displayedTodosType === "non-completed") return !t.is_completed;
      return true;
    });

    return [...list].sort((a, b) => {
      if (!a.date) return 1;
      if (!b.date) return -1;
      return new Date(a.date) - new Date(b.date);
    });
  }, [todos, displayedTodosType]);

  const todosJsx = filteredAndSortedTodos.map((t) => (
    <Todo
      key={t.id}
      todo={t}
      showDelete={openDeleteDialog}
      showUpdate={openUpdateDialog}
      onCheck={handleCheckClick}
    />
  ));

  function handleAddClick() {
    const payload = {title: titleInput, is_completed: 0, date: taskDate};
    if (detailsInput.trim() !== "") payload.details = detailsInput;

    axios
      .post("/todos", payload)
      .then((res) => {
        setTodos([...todos, res.data]);
        setTitleInput("");
        setDetailsInput("");
        setTaskDate("");
        showHideToast("Task added successfully", "success");
      })
      .catch((err) => {
        showHideToast("An error occurred", "error");
        console.log(err);
      });
  }

  function openDeleteDialog(todo) {
    setDialogTodo(todo);
    setShowDeleteDialog(true);
  }

  function handleDeleteDialogClose() {
    setShowDeleteDialog(false);
  }

  function handleDeleteConfirm() {
    axios
      .delete(`/todos/${dialogTodo.id}`)
      .then(() => {
        setTodos(todos.filter((t) => t.id !== dialogTodo.id));
        setShowDeleteDialog(false);
        showHideToast("Deleted successfully", "error");
      })
      .catch((err) => {
        console.log(err);
        showHideToast("Error during deletion", "error");
      });
  }

  function openUpdateDialog(todo) {
    setDialogTodo(todo);
    setShowUpdateDialog(true);
  }

  function handleUpdateDialogClose() {
    setShowUpdateDialog(false);
  }

  function handleUpdateConfirm() {
    const payload = {
      title: dialogTodo.title,
      details: dialogTodo.details,
      is_completed: dialogTodo.is_completed,
      date: dialogTodo.date,
    };
    axios
      .put(`/todos/${dialogTodo.id}`, payload)
      .then((res) => {
        setTodos(todos.map((t) => (t.id === dialogTodo.id ? res.data : t)));
        setShowUpdateDialog(false);
        showHideToast("Updated successfully", "info");
      })
      .catch((err) => {
        console.log(err);
        showHideToast("Error during update", "error");
      });
  }

  function changeDisplayedType(e, newValue) {
    if (newValue !== null) setDisplayedTodosType(newValue);
  }

  return (
    <>
      {/* Delete Dialog */}
      <Dialog
        open={showDeleteDialog}
        onClose={handleDeleteDialogClose}
        style={{direction: "ltr"}}
      >
        <DialogTitle>Are you sure you want to delete this task?</DialogTitle>
        <DialogContent>
          <DialogContentText>This action cannot be undone.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteConfirm} color="error">
            Yes, delete it
          </Button>
          <Button onClick={handleDeleteDialogClose}>Cancel</Button>
        </DialogActions>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog
        open={showUpdateDialog}
        onClose={handleUpdateDialogClose}
        style={{direction: "ltr"}}
      >
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            fullWidth
            variant="standard"
            value={dialogTodo?.title || ""}
            onChange={(e) =>
              setDialogTodo({...dialogTodo, title: e.target.value})
            }
          />
          <TextField
            margin="dense"
            label="Details"
            fullWidth
            variant="standard"
            value={dialogTodo?.details || ""}
            onChange={(e) =>
              setDialogTodo({...dialogTodo, details: e.target.value})
            }
          />
          <TextField
            margin="dense"
            label="Due Date"
            type="date"
            fullWidth
            variant="standard"
            InputLabelProps={{shrink: true}}
            value={dialogTodo?.date || ""}
            onChange={(e) =>
              setDialogTodo({...dialogTodo, date: e.target.value})
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateConfirm}>Confirm</Button>
          <Button onClick={handleUpdateDialogClose}>Cancel</Button>
        </DialogActions>
      </Dialog>

      <Container maxWidth="lg" sx={{mt: 5}}>
        <Card
          sx={{
            minWidth: 275,
            borderRadius: "12px",
            alignItems: "center",
            border: "1px solid #e0d9f0",
            background: "#ffffff",
            boxShadow: "0 15px 40px rgba(0,0,0,0.06)",
          }}
        >
          <CardContent sx={{p: 4}}>
            <Typography
              variant="h3"
              fontWeight="bold"
              sx={{color: "#615184", textAlign: "center", mb: 2}}
            >
              My Tasks
            </Typography>

            <Box sx={{display: "flex", justifyContent: "center", mb: 4}}>
              <ToggleButtonGroup
                value={displayedTodosType}
                exclusive
                onChange={changeDisplayedType}
                sx={{
                  gap: "12px",
                  "& .MuiToggleButtonGroup-grouped": {
                    border: "1px solid #e0d9f0 !important",
                    borderRadius: "8px !important",
                    color: "#615184",
                    px: 3,
                    fontWeight: "600",
                    "&.Mui-selected": {
                      color: "#fff",
                      backgroundColor: "#615184 !important",
                    },
                  },
                }}
              >
                <ToggleButton value="all">All</ToggleButton>
                <ToggleButton value="completed">Completed</ToggleButton>
                <ToggleButton value="non-completed">Uncompleted</ToggleButton>
              </ToggleButtonGroup>
            </Box>

            <Box
              sx={{
                maxHeight: "450px",
                overflowY: "auto",
                pr: 1,
                mb: 3,
                "&::-webkit-scrollbar": {width: "4px"},
                "&::-webkit-scrollbar-thumb": {
                  background: "#6151844f",
                  borderRadius: "10px",
                },
              }}
            >
              {todosJsx.length > 0 ? (
                todosJsx
              ) : (
                <Typography sx={{textAlign: "center", color: "gray", mt: 4}}>
                  No tasks found.
                </Typography>
              )}
            </Box>

            <Grid
              container
              spacing={2}
              alignItems="center"
              sx={{mt: 2, ml: 0, width: "100%"}}
            >
              <Grid item xs={12} md={5}>
                <TextField
                  fullWidth
                  label="Task title"
                  variant="outlined"
                  value={titleInput}
                  onChange={(e) => setTitleInput(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  label="Details"
                  variant="outlined"
                  value={detailsInput}
                  onChange={(e) => setDetailsInput(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={2.5}>
                <TextField
                  fullWidth
                  type="date"
                  label="Due Date"
                  variant="outlined"
                  InputLabelProps={{shrink: true}}
                  value={taskDate}
                  onChange={(e) => setTaskDate(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={1.5}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleAddClick}
                  disabled={titleInput.trim().length === 0}
                  sx={{
                    height: "55px",
                    bgcolor: "#615184",
                    "&:hover": {bgcolor: "#4a3d66"},
                  }}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}

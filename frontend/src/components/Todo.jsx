import React, {useContext} from "react";
import {ToastContext} from "@/contexts/ToastContext";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export default function Todo({todo, showDelete, showUpdate, onCheck}) {
  const {showHideToast} = useContext(ToastContext);

  function handleCheckClick() {
    onCheck(todo);
    showHideToast("Task status updated");
  }

  function handleDeleteClick() {
    showDelete(todo);
  }

  function handleUpdateClick() {
    showUpdate(todo);
  }

  return (
    <Card
      sx={{
        minWidth: 275,
        background: "linear-gradient(90deg, #615184 0%, #a090b5 100%)",
        color: "white",
        marginTop: 2,
        direction: "ltr",
        borderRadius: "8px",
      }}
    >
      <CardContent>
        <Grid
          container
          alignItems="center"
          justifyContent="space-between"
          sx={{direction: "ltr"}}
        >
          <Grid item xs={8}>
            <Typography
              variant="h5"
              sx={{
                textAlign: "left",
                textDecoration: todo.is_completed ? "line-through" : "none",
                fontWeight: "bold",
              }}
            >
              {todo.title}
            </Typography>
            {todo.details && (
              <Typography variant="body2" sx={{textAlign: "left"}}>
                {todo.details}
              </Typography>
            )}
            {todo.date && (
              <Typography
                variant="caption"
                sx={{display: "block", textAlign: "left", opacity: 0.8}}
              >
                Deadline: {todo.date}
              </Typography>
            )}
          </Grid>

          <Grid
            item
            xs={4}
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
            sx={{gap: 2}}
          >
            <IconButton
              onClick={handleCheckClick}
              sx={{
                color: todo.is_completed ? "white" : "#177f3d",
                background: todo.is_completed ? "#177f3d" : "white",
                border: "2px solid #177f3d",
                "&:hover": {
                  background: todo.is_completed ? "#145c2d" : "#f0f0f0",
                },
              }}
            >
              <CheckIcon />
            </IconButton>

            <IconButton
              onClick={handleUpdateClick}
              sx={{
                color: "#615184",
                background: "white",
                border: "2px solid white",
                "&:hover": {background: "#f0f0f0"},
              }}
            >
              <EditIcon />
            </IconButton>

            <IconButton
              onClick={handleDeleteClick}
              sx={{
                color: "#EF4444",
                background: "white",
                border: "2px solid white",
                "&:hover": {background: "#f0f0f0"},
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

import React, {useEffect} from "react";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import {useTodos} from "../contexts/todosContexts.jsx";

import AssignmentIcon from "@mui/icons-material/Assignment";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import DateRangeIcon from "@mui/icons-material/DateRange";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CalendarView from "./CalendarView";
import axios from "../api/axios.jsx";

const StatCard = ({title, value, icon, color, subText}) => (
  <Paper
    elevation={0}
    sx={{
      p: 4,
      borderRadius: "8px",
      display: "flex",
      alignItems: "center",
      gap: 4,
      border: "1px solid #f0f0f0",
      transition: "all 0.3s ease",
      "&:hover": {
        transform: "translateY(-5px)",
        boxShadow: "0px 20px 40px rgba(0,0,0,0.05)",
      },
    }}
  >
    <Box
      sx={{
        width: 70,
        height: 70,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "8px",
        bgcolor: `${color}15`,
        color: color,
      }}
    >
      {React.cloneElement(icon, {sx: {fontSize: 35}})}
    </Box>

    <Box>
      <Typography
        variant="body2"
        sx={{color: "text.secondary", fontWeight: 600, mb: 0.5}}
      >
        {title}
      </Typography>
      <Typography
        variant="h4"
        sx={{fontWeight: 800, color: "#2d2d2d", lineHeight: 1}}
      >
        {value}
      </Typography>
      <Typography
        variant="caption"
        sx={{color: "text.disabled", display: "block", mt: 0.5}}
      >
        {subText}
      </Typography>
    </Box>
  </Paper>
);

export default function Dashboard() {
  const {todos, setTodos} = useTodos();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && todos.length === 0) {
      axios
        .get("/todos")
        .then((res) => {
          setTodos(res.data);
        })
        .catch((err) => {
          console.error("Error fetching todos in dashboard:", err);
        });
    }
  }, [setTodos, todos.length]);
  const total = todos.length;
  const completed = todos.filter((t) => t.is_completed).length;
  const pending = total - completed;
  const progressPercentage =
    total > 0 ? Math.round((completed / total) * 100) : 0;

  const now = new Date();

  const completedThisWeek = todos.filter((todo) => {
    if (!todo.is_completed || !todo.date) return false;
    const todoDate = new Date(todo.date);
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    startOfWeek.setHours(0, 0, 0, 0);
    return todoDate >= startOfWeek;
  }).length;

  const completedThisMonth = todos.filter((todo) => {
    if (!todo.is_completed || !todo.date) return false;
    const todoDate = new Date(todo.date);
    return (
      todoDate.getMonth() === now.getMonth() &&
      todoDate.getFullYear() === now.getFullYear()
    );
  }).length;

  return (
    <Box
      sx={{
        width: "60%",
        mx: "auto",
        bgcolor: "#e8e0f1",
        minHeight: "100vh",
        borderRadius: "8px",
        pt: 6,
        pb: 8,
      }}
    >
      <Container maxWidth="lg">
        {/* Header Section */}
        <Box
          sx={{
            mb: 6,
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 800,
                color: "#615184",
                mb: 1,
              }}
            >
              Dashboard
            </Typography>
            {/* <Typography
              variant="body1"
              sx={{color: "text.secondary"}}
            ></Typography> */}
          </Box>
        </Box>

        <Grid
          container
          spacing={1.2}
          sx={{mb: 6, width: "100% !important", ml: "0 !important"}}
        >
          {" "}
          {[
            {
              title: "Total Tasks",
              value: total,
              icon: <AssignmentIcon />,
              color: "#615184",
              sub: "Activities",
            },
            {
              title: "Completed",
              value: completed,
              icon: <DoneAllIcon />,
              color: "#177931",
              sub: "Keep it up!",
            },
            {
              title: "Pending",
              value: pending,
              icon: <HourglassEmptyIcon />,
              color: "#EF4444",
              sub: "Focus",
            },
            {
              title: "This Week",
              value: completedThisWeek,
              icon: <DateRangeIcon />,
              color: "#3B82F6",
              sub: "Weekly",
            },
            {
              title: "This Month",
              value: completedThisMonth,
              icon: <CalendarMonthIcon />,
              color: "#8B5CF6",
              sub: "Monthly",
            },
          ].map((item, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={2.4}
              key={index}
              sx={{display: "flex"}}
            >
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  width: "100%",
                  transition: "transform 0.3s ease",
                  "&:hover": {transform: "translateY(-5px)"},
                }}
              >
                <Box
                  sx={{
                    width: 55,
                    height: 55,
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "8px",
                    bgcolor: `${item.color}15`,
                    color: item.color,
                  }}
                >
                  {React.cloneElement(item.icon, {sx: {fontSize: 30}})}
                </Box>

                <Box sx={{flexGrow: 1}}>
                  <Typography
                    variant="caption"
                    sx={{
                      color: "text.secondary",
                      fontWeight: 600,
                      display: "block",
                      fontSize: "0.90rem",
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    variant="h4"
                    sx={{fontWeight: 800, color: "#2d2d2d", my: 0.2}}
                  >
                    {item.value}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: "text.disabled",
                      fontSize: "0.80rem",
                      display: "block",
                    }}
                  >
                    {item.sub}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Progress Banner */}
        <Paper
          elevation={0}
          sx={{
            p: 4,
            mt: 6,
            borderRadius: "8px",
            background: "linear-gradient(90deg, #615184 0%, #8b76b2 100%)",
            color: "white",
            display: "flex",
            flexDirection: {xs: "column", sm: "row"},
            alignItems: "center",
            justifyContent: "space-between",
            gap: 3,
            boxShadow: "0px 15px 35px rgba(97, 81, 132, 0.2)",
          }}
        >
          <Box sx={{textAlign: {xs: "center", sm: "left"}}}>
            <Typography variant="h5" fontWeight="800" sx={{mb: 1}}>
              {progressPercentage === 100 && total !== 0
                ? "Great job! You've finished everything for today! 🎉"
                : "Daily Progress ✨"}
            </Typography>
            <Typography variant="body1" sx={{opacity: 0.9}}>
              You have completed <b>{completed}</b> out of <b>{total}</b> tasks.
              {progressPercentage < 100
                ? " Just a little more to reach your goal!"
                : " You've crushed all your goals for today!"}
            </Typography>
          </Box>

          <Box sx={{position: "relative", display: "inline-flex"}}>
            <CircularProgress
              variant="determinate"
              value={100}
              size={110}
              thickness={5}
              sx={{color: "rgba(255,255,255,0.2)"}}
            />
            <CircularProgress
              variant="determinate"
              value={progressPercentage}
              size={110}
              thickness={5}
              sx={{
                color: "white",
                position: "absolute",
                left: 0,
                strokeLinecap: "round",
              }}
            />
            <Box
              sx={{
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                position: "absolute",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="h6" component="div" fontWeight="800">
                {`${progressPercentage}%`}
              </Typography>
            </Box>
          </Box>
        </Paper>

        <Box sx={{width: "100%", mt: 4}}>
          <CalendarView fullWidth={true} />
        </Box>
      </Container>
    </Box>
  );
}

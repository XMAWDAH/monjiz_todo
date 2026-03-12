import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import {Box, Paper, Typography} from "@mui/material";
import {useTodos} from "../contexts/todosContexts.jsx";
import "../App.css";
export default function CalendarView({fullWidth = false}) {
  const {todos} = useTodos();

  const events = todos
    .filter((todo) => todo.date)
    .map((todo) => ({
      id: todo.id,
      title: todo.title,
      start: todo.date,
      backgroundColor: todo.is_completed ? "#3e9841ae" : "#615184",
      borderColor: "transparent",
      allDay: true,
    }));

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        mt: fullWidth ? 0 : 4,
        pb: 6,
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: fullWidth ? "none" : "1100px",
          px: fullWidth ? 0 : {xs: 2, md: 4},
        }}
      >
        <Paper
          elevation={0}
          sx={{
            p: {xs: 2, md: 4},
            borderRadius: fullWidth ? "8px" : "8px",
            border: "1px solid #e0d9f0",
            background: "#ffffff",
            boxShadow: "0 15px 40px rgba(0,0,0,0.06)",
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={events}
            height="auto"
            fixedWeekCount={false}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,dayGridWeek",
            }}
            dayCellContent={(arg) => (
              <div
                style={{
                  fontSize: "1.0rem",
                  fontWeight: "400",
                  color: "#33333360",
                  padding: "6px",
                }}
              >
                {arg.dayNumberText}
              </div>
            )}
            eventDisplay="block"
          />
        </Paper>
      </Box>
    </Box>
  );
}

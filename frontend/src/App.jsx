import {useState, useEffect} from "react";
import "./App.css";
import TodoList from "./components/TodoList.jsx";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import axios from "./api/axios.jsx";
import {ToastProvider} from "./contexts/ToastContext.jsx";
import TodosProvider from "./contexts/todosContexts.jsx";
import Navbar from "./components/Navbar.jsx";
import Login from "./components/Login.jsx";
import Contact from "./components/Contact.jsx";
import {Routes, Route, useNavigate} from "react-router-dom";
import Dashboard from "./components/Dashboard.jsx";
import CalendarView from "./components/CalendarView.jsx";
import Register from "./components/Register.jsx";

const theme = createTheme({
  typography: {fontFamily: ["Cairo"]},
  palette: {
    primary: {
      main: "#615184",
    },
  },
});

function App() {
  const [todos, setTodos] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post("/logout");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
      navigate("/login");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <TodosProvider value={{todos, setTodos}}>
        <ToastProvider>
          <Navbar user={user} handleLogout={handleLogout} />

          <div className="App" style={{paddingTop: "120px"}}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/mytask" element={<TodoList />} />
              <Route path="/calendar" element={<CalendarView />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </div>
        </ToastProvider>
      </TodosProvider>
    </ThemeProvider>
  );
}

export default App;

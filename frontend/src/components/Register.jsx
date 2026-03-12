import React, {useState, useContext} from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Link,
  InputAdornment,
} from "@mui/material";

import {ToastContext} from "../contexts/ToastContext.jsx";
import axios from "../api/axios.jsx";
import {useNavigate} from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [loading, setLoading] = useState(false);
  const {showHideToast} = useContext(ToastContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value});
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("/register", form);

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      showHideToast("Welcome! Your account has been created.");

      window.location.href = "/dashboard";
    } catch (err) {
      if (err.response && err.response.data && err.response.data.errors) {
        const errors = err.response.data.errors;
        const firstErrorKey = Object.keys(errors)[0];
        showHideToast(errors[firstErrorKey][0]);
      } else {
        showHideToast("Registration failed. Please try again.");
      }
      console.error("Register Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs" sx={{mt: 5}}>
      <Box
        component="form"
        onSubmit={handleRegister}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2.2,
          bgcolor: "background.paper",
          p: {xs: 3, sm: 4},
          borderRadius: 4,
          boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
          textAlign: "center",
          border: "1px solid rgba(97, 81, 132, 0.1)",
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1.5,
            color: "#615184",
            mb: 1,
          }}
        >
          <img src="/logo.png" alt="Logo" style={{width: 45, height: 45}} />
          Sign Up
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{mb: 1, px: 1}}>
          Create a new account to manage your todos
        </Typography>

        <TextField
          name="name"
          placeholder="Enter your full name"
          value={form.name}
          onChange={handleChange}
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon sx={{color: "#615184", opacity: 0.6}} />
              </InputAdornment>
            ),
            style: {borderRadius: 12},
          }}
          fullWidth
        />

        <TextField
          name="email"
          placeholder="Enter your email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon sx={{color: "#615184", opacity: 0.6}} />
              </InputAdornment>
            ),
            style: {borderRadius: 12},
          }}
          fullWidth
        />

        <TextField
          name="password"
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={handleChange}
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon sx={{color: "#615184", opacity: 0.6}} />
              </InputAdornment>
            ),
            style: {borderRadius: 12},
          }}
          fullWidth
        />

        <TextField
          name="password_confirmation"
          placeholder="Confirm password"
          type="password"
          value={form.password_confirmation}
          onChange={handleChange}
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon sx={{color: "#615184", opacity: 0.6}} />
              </InputAdornment>
            ),
            style: {borderRadius: 12},
          }}
          fullWidth
        />

        <Button
          variant="contained"
          type="submit"
          disabled={loading}
          sx={{
            bgcolor: "#615184",
            borderRadius: "12px",
            fontWeight: "bold",
            fontSize: "16px",
            py: 1.5,
            textTransform: "none",
            boxShadow: "0 4px 12px rgba(97, 81, 132, 0.3)",
            "&:hover": {bgcolor: "#4d3f69"},
            mt: 1,
          }}
          fullWidth
        >
          {loading ? "Creating Account..." : "Register Now"}
        </Button>

        <Typography variant="body2" color="text.secondary" sx={{mt: 1}}>
          Already have an account?{" "}
          <Link
            onClick={() => navigate("/login")}
            underline="none"
            sx={{cursor: "pointer", color: "#615184", fontWeight: "bold"}}
          >
            Login
          </Link>
        </Typography>
      </Box>
    </Container>
  );
}

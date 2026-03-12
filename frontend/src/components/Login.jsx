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
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const {showHideToast} = useContext(ToastContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("/login", {email, password});

      const token = response.data.access_token;
      const user = response.data.user;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      setEmail("");
      setPassword("");
      showHideToast("Login successful! Welcome back.");

      navigate("/");

      window.location.reload();
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Incorrect email address or password";
      showHideToast(errorMessage);
      console.log("Login Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs" sx={{mt: 8}}>
      <Box
        component="form"
        onSubmit={handleLogin}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2.5,
          bgcolor: "background.paper",
          p: {xs: 3, sm: 4},
          borderRadius: 4,
          boxShadow: "0px 10px 30px rgba(0,0,0,0.1)",
          textAlign: "center",
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
          <img src="/logo.png" alt="Logo" style={{width: 50, height: 50}} />
          Sign In
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{mb: 2, px: 1}}>
          Enter your infromation to sign in to your account
        </Typography>

        <TextField
          variant="outlined"
          placeholder="Enter your email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon color="action" sx={{opacity: 0.5}} />
              </InputAdornment>
            ),
            style: {borderRadius: 12},
          }}
          fullWidth
        />

        <TextField
          variant="outlined"
          placeholder="Enter your password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon color="action" sx={{opacity: 0.5}} />
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
            borderRadius: 3,
            fontWeight: "bold",
            fontSize: "16px",
            py: 1.8,
            textTransform: "none",
            "&:hover": {
              bgcolor: "#4a3d66",
            },
            mt: 1,
          }}
          fullWidth
        >
          {loading ? "Logging in..." : "Login"}
        </Button>

        <Typography variant="body2" color="text.secondary" sx={{mt: 1}}>
          Don't have an account?{" "}
          <Link
            onClick={() => navigate("/register")}
            underline="none"
            sx={{
              cursor: "pointer",
              color: "#615184",
              fontWeight: "bold",
              "&:hover": {textDecoration: "underline"},
            }}
          >
            Signup Now
          </Link>
        </Typography>
      </Box>
    </Container>
  );
}

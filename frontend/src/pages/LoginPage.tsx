import { useState } from "react";
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  Alert,
  InputAdornment,
  IconButton,
} from "@mui/material";
import {
  LockOutlined as LockIcon,
  MailOutlined as MailIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  BadgeRounded as BadgeIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

import api from "../api/api";
import type { LoginResponse } from "../types/auth";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      setError("");
      setLoading(true);

      const response = await api.post<LoginResponse>("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.accessToken);
      navigate("/dashboard");
    } catch {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "radial-gradient(circle at 10% 20%, rgba(216, 241, 230, 0.46) 0.1%, rgba(233, 226, 226, 0.28) 90.1%), linear-gradient(135deg, #e0e7ff 0%, #faf5ff 100%)",
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #a5b4fc 0%, #818cf8 100%)",
          filter: "blur(80px)",
          top: "10%",
          left: "15%",
          opacity: 0.5,
          zIndex: 0,
        },
        "&::after": {
          content: '""',
          position: "absolute",
          width: "350px",
          height: "350px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #c084fc 0%, #a855f7 100%)",
          filter: "blur(100px)",
          bottom: "10%",
          right: "15%",
          opacity: 0.4,
          zIndex: 0,
        },
      }}
    >
      <Paper
        elevation={0}
        component="form"
        onSubmit={handleLogin}
        sx={{
          width: 440,
          p: 5,
          borderRadius: 4,
          zIndex: 1,
          backdropFilter: "blur(20px)",
          backgroundColor: "rgba(255, 255, 255, 0.75)",
          border: "1px solid rgba(255, 255, 255, 0.6)",
          boxShadow: "0 10px 30px -5px rgba(79, 70, 229, 0.1), 0 20px 40px -15px rgba(0, 0, 0, 0.05)",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 4 }}>
          <Box
            sx={{
              width: 56,
              height: 56,
              borderRadius: "16px",
              background: "linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "0 8px 16px rgba(79, 70, 229, 0.3)",
              mb: 2,
            }}
          >
            <BadgeIcon sx={{ color: "white", fontSize: 32 }} />
          </Box>
          <Typography variant="h5" align="center" gutterBottom sx={{ fontWeight: 800, color: "text.primary" }}>
            Welcome to ESMS
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center">
            Employee Salary Management System
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
            {error}
          </Alert>
        )}

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
          <TextField
            fullWidth
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <MailIcon sx={{ color: "text.secondary", fontSize: 20 }} />
                  </InputAdornment>
                ),
              },
            }}
          />

          <TextField
            fullWidth
            label="Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon sx={{ color: "text.secondary", fontSize: 20 }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      size="small"
                    >
                      {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />

          <Button
            fullWidth
            type="submit"
            variant="contained"
            disabled={loading}
            sx={{
              mt: 1.5,
              py: 1.4,
              fontSize: "1rem",
              borderRadius: "10px",
              boxShadow: "0 4px 12px rgba(79, 70, 229, 0.2)",
            }}
          >
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
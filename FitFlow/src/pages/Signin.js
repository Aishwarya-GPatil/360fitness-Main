import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Box,
  Typography,
  Link,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { useNavigate } from "react-router-dom"; // For redirection

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false, // State for "Remember Me" checkbox
  });
  const [error, setError] = useState({ email: "", password: "" }); // State for error messages

  const navigate = useNavigate(); // Hook to navigate to other pages

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    setError({ email: "", password: "" }); // Clear errors when the user types
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email regex
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let valid = true;
    let newError = { email: "", password: "" };

    if (!validateEmail(formData.email)) {
      newError.email = "Invalid email format. Please enter a valid email.";
      valid = false;
    }

    if (!validatePassword(formData.password)) {
      newError.password =
        "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a digit, and a special character.";
      valid = false;
    }

    if (!valid) {
      setError(newError);
      return;
    }

    console.log("Login Data: ", formData);
    alert("Login Successful!");
    navigate("/"); // Redirect to home or dashboard after login
  };

  return (
    <Box
      sx={{
        height: "100vh", // Full height of the viewport
        display: "flex", // Use flexbox
        alignItems: "center", // Center vertically
        justifyContent: "center", // Center horizontally
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          filter: "blur(8px)", // Apply blur effect
          zIndex: -1, // Ensure it stays behind the content
        }}
      >
        <source src="/fitnessworkout.mp4" type="video/mp4" />
      </video>

      {/* Login Form */}
      <Container
        maxWidth="sm"
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.9)", // Semi-transparent white background
          borderRadius: 2,
          padding: 4,
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)", // Subtle shadow
          zIndex: 1, // Ensure it stays above the video
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          sx={{
            fontWeight: "bold",
            mb: 2,
            color: "#333",
          }}
        >
          Login
        </Typography>

        <Typography
          variant="h6"
          sx={{
            mb: 3,
            fontWeight: "normal",
            color: "#555",
            fontSize: "1rem",
          }}
        >
          Login to access your personalized dashboard.
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            name="email"
            label="Email"
            variant="outlined"
            margin="normal"
            value={formData.email}
            onChange={handleChange}
            error={!!error.email}
            helperText={error.email}
          />
          <TextField
            fullWidth
            name="password"
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            value={formData.password}
            onChange={handleChange}
            error={!!error.password}
            helperText={error.password}
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={formData.rememberMe}
                onChange={handleChange}
                name="rememberMe"
                color="primary"
              />
            }
            label="Remember Me"
            sx={{ mt: 2 }}
          />

          <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: "#D32F2F",
                color: "white",
                "&:hover": {
                  backgroundColor: "#B71C1C",
                },
              }}
            >
              Login
            </Button>
          </Box>
        </form>

        <Typography variant="body2" sx={{ mt: 2 }}>
          Don't have an account?{" "}
          <Link
            onClick={() => navigate("/signup")}
            sx={{
              cursor: "pointer",
              color: "#D32F2F",
              fontWeight: "bold",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            Sign-Up
          </Link>
        </Typography>
      </Container>
    </Box>
  );
};

export default Login;

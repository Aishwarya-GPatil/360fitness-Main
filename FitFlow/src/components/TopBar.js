import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

const TopBar = () => {
  return (
    <AppBar
      position="static"
      sx={{
        background: "linear-gradient(to right, #D32F2F, #000000)", // Linear gradient from red to black
        boxShadow: "none", // Optional: remove shadow for a cleaner look
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            fontWeight: "bold",
            textDecoration: "none",
            color: "white",
            fontSize: "24px", // Adjust the font size for a modern look
          }}
        >
          FitFlow
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            color="inherit"
            component={Link}
            to="/"
            sx={{
              "&:hover": { backgroundColor: "#B71C1C" }, // Darker red for hover effect
              textTransform: "none", // Remove uppercase transformation
            }}
          >
            Home
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/services" // Link to Services page
            sx={{
              "&:hover": { backgroundColor: "#B71C1C" },
              textTransform: "none",
            }}
          >
            Services
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/signup"
            sx={{
              "&:hover": { backgroundColor: "#B71C1C" },
              textTransform: "none",
            }}
          >
            Signup
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/signin"
            sx={{
              "&:hover": { backgroundColor: "#B71C1C" },
              textTransform: "none",
            }}
          >
            Login
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/profile"
            sx={{
              "&:hover": { backgroundColor: "#B71C1C" },
              textTransform: "none",
            }}
          >
            Profile
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;

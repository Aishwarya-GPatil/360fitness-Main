import React, { useRef, useState, useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import Services from "./Services"; // Import the Services component

const Dashboard = () => {
  const servicesRef = useRef(null);
  const [hasVisitedBefore, setHasVisitedBefore] = useState(false); // Track if user has visited before

  // Check if the user has visited before (using localStorage)
  useEffect(() => {
    const visited = localStorage.getItem("hasVisitedBefore");
    if (!visited) {
      // Set the flag to true for future visits
      localStorage.setItem("hasVisitedBefore", "true");
    } else {
      setHasVisitedBefore(true); // User has visited before
    }
  }, []);

  return (
    <>
      {/* Home Section */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "100vh", // Full viewport height
          overflow: "hidden",
        }}
      >
        {/* Video Background */}
        <video
          autoPlay
          muted
          loop={false} // Ensure the video doesn't loop
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            objectFit: "cover", // Maintain aspect ratio while covering the section
            zIndex: -1,
          }}
        >
          <source src="/fitnessworkout.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Overlay Content */}
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            color: "#fff",
            zIndex: 1,
          }}
        >
          {/* Welcome to FitFlow Animation */}
          <Typography
            variant="h2"
            sx={{
              fontWeight: "bold",
              animation: "slideInLeft 2s ease-out",
              color: "white",
              "@keyframes slideInLeft": {
                "0%": { transform: "translateX(-100%)", opacity: 0 },
                "100%": { transform: "translateX(0)", opacity: 1 },
              },
            }}
          >
            Welcome to FitFlow
          </Typography>

          {/* Subtitle Animation */}
          <Typography
            variant="h5"
            sx={{
              mt: 2,
              animation: "slideInRight 2s ease-out",
              animationDelay: "0.5s",
              color: "white",
              "@keyframes slideInRight": {
                "0%": { transform: "translateX(100%)", opacity: 0 },
                "100%": { transform: "translateX(0)", opacity: 1 },
              },
            }}
          >
            Your journey to fitness and nutrition starts here!
          </Typography>

          {/* Scroll Button with Hover Animation */}
          <Button
            variant="contained"
            onClick={() => servicesRef.current?.scrollIntoView({ behavior: "smooth" })}
            sx={{
              mt: 4,
              backgroundColor: "#ff4081",
              "&:hover": {
                backgroundColor: "#f50057",
                transform: "scale(1.1)",
                transition: "transform 0.3s ease",
              },
              transition: "background-color 0.3s ease",
            }}
          >
            Explore Our Services
          </Button>
        </Box>
      </Box>

      {/* Spacer for Gap */}
      <Box
        sx={{
          height: "50px", // Adjust the gap height as needed
          backgroundColor: "#f5f5f5", // Neutral background for the gap
        }}
      />

      {/* Services Section */}
      <Box
        id="services-section"
        ref={servicesRef}
        sx={{
          animation: "fadeInUp 1s ease-out", // Smooth fade-in and slide-up animation
          "@keyframes fadeInUp": {
            "0%": { opacity: 0, transform: "translateY(20px)" },
            "100%": { opacity: 1, transform: "translateY(0)" },
          },
        }}
      >
        <Services />
      </Box>
    </>
  );
};

export default Dashboard;

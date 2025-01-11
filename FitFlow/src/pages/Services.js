import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";
import { motion } from "framer-motion";

function Services() {
  const services = [
    {
      title: "Fitness",
      image: "/fitnesscard.jpg",
      video: "/fitnessvideo.mp4",
      color: "#004d40",
      description: "Get fit with personalized fitness plans and workouts.",
    },
    {
      title: "Nutrition",
      image: "/nutritioncards.jpg",
      video: "/nutritionvideo.mp4",
      color: "#880e4f",
      description: "Fuel your body with healthy and balanced nutrition.",
    },
    {
      title: "Aerobics",
      image: "/aerobicscards.jpg",
      video: "/aerobicsvideo.mp4",
      color: "#6a1b9a",
      description: "Boost your cardio health with fun aerobics routines.",
    },
    {
      title: "Yoga",
      image: "/yogacards.jpg",
      video: "/yogavideo1.mp4",
      color: "#1b5e20",
      description: "Relax your mind and body with yoga practices.",
    },
    {
      title: "Meditation",
      image: "/mediationcards.jpg",
      video: "/meditationvideo1.mp4",
      color: "#bf360c",
      description: "Achieve inner peace with guided meditation.",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleTypingEffect = (text) => {
    let i = 0;
    setTypedText("");  // Clear the previous text
    setIsTyping(true);
    const interval = setInterval(() => {
      if (i < text.length) {
        setTypedText((prev) => prev + text[i]); // Append the next character
        i++;
      } else {
        clearInterval(interval);
        setIsTyping(false); // Stop typing when done
      }
    }, 100); // Adjust speed of typing effect
  };

  useEffect(() => {
    handleTypingEffect(services[activeIndex].description); // Start typing effect when activeIndex changes
  }, [activeIndex]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      style={{
        textAlign: "center",
        padding: "20px",
        height: "100vh",
        width: "100vw",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Dynamic Background Video for the Service Section */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          overflow: "hidden",
          zIndex: -1, // Ensures background is behind content
        }}
      >
        <video
          autoPlay
          loop
          muted
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 1,
            transition: "opacity 1s ease-in-out", // Smooth transition
          }}
          src={services[activeIndex].video}
        />
      </div>

      {/* Title with Creative Font */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontFamily: "'Poppins', sans-serif",
            color: "#fff",
            marginBottom: "30px",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
            marginTop: "100px",
            fontWeight: "bold",
            fontSize: "3rem",
            animation: "fadeIn 1.5s ease-in-out", // Fade-in animation
          }}
        >
          Our Services
        </Typography>
      </motion.div>

      {/* Typing Effect for Dynamic Text */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 1, ease: "easeOut" }}
      >
        <Typography
          variant="h5"
          sx={{
            fontFamily: "'Lobster', cursive",
            color: "#fff",
            marginBottom: "20px",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
            fontWeight: "bold",
            fontSize: "1.5rem",
            animation: "fadeIn 2s ease-in-out", // Fade-in animation
          }}
        >
          {typedText}
        </Typography>
      </motion.div>

      {/* Cards Section with Horizontal Scrolling */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          padding: "20px",
          alignItems: "center",
          height: "calc(100vh - 250px)", // Adjusted to create space for the text
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          marginTop: "30px", // Adjusted to create space for the text
        }}
      >
        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{
              scale: activeIndex === index ? 1.15 : 1,
              opacity: 1,
            }}
            transition={{ duration: 0.6, delay: 0.5 }}
            style={{
              scrollSnapAlign: "center",
              flexShrink: 0,
              width: 300,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            onClick={() => setActiveIndex(index)} // Update active card on click
          >
            <Card
              sx={{
                width: "100%",
                height: "100%",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                borderRadius: "12px",
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  height: 150,
                  backgroundImage: `url(${service.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              <CardContent>
                <Typography
                  variant="h5"
                  component="div"
                  sx={{
                    color: service.color,
                    marginBottom: "8px",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  {service.title}
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#0288d1",
                    color: "#fff",
                    fontWeight: "bold",
                    textTransform: "none",
                    marginTop: "10px",
                    "&:hover": {
                      backgroundColor: "#0277bd",
                    },
                  }}
                >
                  Get Started
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <style>
        {`
          div::-webkit-scrollbar {
            display: none; /* Hide scrollbar for Chrome, Safari, and Opera */
          }
          
          @keyframes fadeIn {
            0% {
              opacity: 0;
            }
            100% {
              opacity: 1;
            }
          }
        `}
      </style>
    </motion.div>
  );
}

export default Services;

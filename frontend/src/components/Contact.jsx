import React from "react";
import {Container, Box, Typography, Grid} from "@mui/material";

import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LanguageIcon from "@mui/icons-material/Language";

export default function Contact() {
  const contactDetails = [
    {
      icon: <PhoneIcon sx={{fontSize: 32}} />,
      title: "Phone Number",
      value: "+966 50 000 0000",
      color: "#177931",
    },
    {
      icon: <EmailIcon sx={{fontSize: 32}} />,
      title: "Email Address",
      value: "monjiztodo@example.com",
      color: "#615184",
    },
    {
      icon: <LocationOnIcon sx={{fontSize: 32}} />,
      title: "Our Location",
      value: "Buraydah, Al Qassim, KSA",
      color: "#EF4444",
    },
    {
      icon: <LanguageIcon sx={{fontSize: 32}} />,
      title: "Website",
      value: "www.monjiztodo.com",
      color: "#3B82F6",
    },
  ];

  return (
    <Container maxWidth="lg" sx={{mt: 8, mb: 8}}>
      <Box sx={{textAlign: "center", mb: 8}}>
        <Typography
          variant="h3"
          fontWeight="900"
          sx={{color: "#615184", mb: 2}}
        >
          Contact Us
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: "#615184b9",
            opacity: 0.8,
            maxWidth: "900px",
            mx: "auto",
            fontWeight: 500,
            lineHeight: 1.6,
          }}
        >
          Our support experts are here to ensure you have the best experience.
          <br />
          If you’re facing any issues or need guidance, don’t hesitate to
          contact us.
        </Typography>
      </Box>

      <Grid container spacing={4} justifyContent="center">
        {contactDetails.map((item, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Box
              sx={{
                p: 4,
                borderRadius: "8px",
                bgcolor: "rgba(255, 255, 255, 0.6)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                transition: "all 0.3s ease-in-out",
                height: "100%",
                "&:hover": {
                  transform: "translateY(-10px)",
                  bgcolor: "#a594cb5e",
                  boxShadow: "0px 20px 40px rgba(0,0,0,0.05)",
                },
              }}
            >
              <Box
                sx={{
                  width: 70,
                  height: 70,
                  borderRadius: "8px",
                  bgcolor: "#ffffff78",
                  color: item.color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: 3,
                  boxShadow: "0px 10px 20px rgba(0,0,0,0.03)",
                }}
              >
                {item.icon}
              </Box>

              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 800,
                  color: "#615184b9",
                  mb: 1,
                  textTransform: "uppercase",
                  letterSpacing: 1.5,
                  fontSize: "0.9rem",
                }}
              >
                {item.title}
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  fontWeight: 800,
                  color: "#615184",
                  wordBreak: "break-word",
                  fontSize: "1.2rem",
                }}
              >
                {item.value}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>

      <Box sx={{mt: 10, textAlign: "center"}}>
        <Typography variant="body2" sx={{color: "#615184", fontWeight: 600}}>
          Working Hours: Sunday - Thursday | 9:00 AM - 5:00 PM
        </Typography>
      </Box>
    </Container>
  );
}

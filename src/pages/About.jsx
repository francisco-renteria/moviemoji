import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Paper,
  BottomNavigation,
  Link,
} from "@mui/material";

const About = () => {
  return (
    <>
      <Container
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "7rem",
          maxWidth: "80% !important",
        }}
      >
        <Paper
          elevation={7}
          style={{
            padding: 0,
            margin: "32px",
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            mt={4}
          >
            <Typography
              variant="h4"
              align="center"
              gutterBottom
              style={{ fontWeight: 700 }}
            >
              ¿Qué es TMDB2EMOJIS?
            </Typography>
            <br />
            <Typography variant="h4" align="center">
              🎬👾🍿
            </Typography>

            <Box mt={4} maxWidth={600} padding={"1rem"} textAlign="center">
              <Typography variant="body1">
                TMDB2EMOJIS es una forma innovadora de explorar películas
                utilizando emojis. Este proyecto fue diseñado para proporcionar
                una experiencia visual única al representar visualmente las
                sinopsis de películas mediante emojis.
              </Typography>
              <Typography variant="body1" mb={4}>
                Utilizando algoritmos avanzados de Procesamiento de lenguaje
                natural (Natural Language Processing, NLP por sus siglas en
                inglés), TMDB2EMOJIS analiza las sinopsis de películas y
                selecciona emojis relevantes que capturan la esencia de cada
                película.
              </Typography>
              <Typography variant="body1" mb={4}>
                Este proyecto fue desarrollado por{" "}
                <Link href="https://github.com/francisco-renteria">
                  Francisco Rentería
                </Link>{" "}
                en el año 2024.
              </Typography>

              <Typography variant="body1" mb={4}>
                Para más detalles, contáctame por correo electrónico:{" "}
                <Link href="mailto:luisfrancisco.renteria@gmail.com">
                  luisfrancisco.renteria@gmail.com
                </Link>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Container>
      <BottomNavigation
        elevation={7}
        style={{
          padding: 0,
          margin: "0px",
          width: "100%",
          boxSizing: "border-box",
          position: "fixed",
          left: 0,
          bottom: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography align="center">
          TMDB2EMOJIS utiliza{" "}
          <Link href="https://www.themoviedb.org/documentation/api">
            la API de TMDb
          </Link>{" "}
          💙
        </Typography>
      </BottomNavigation>
    </>
  );
};

export default About;

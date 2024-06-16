import React, { useState } from "react";
import {
  Button,
  Container,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Paper,
  BottomNavigation,
  Link,
  TextField,
  Tooltip,
} from "@mui/material";
import axios from "axios";
import SendIcon from "@mui/icons-material/Send";
import convertCodeToEmoji from "./convertEmojiCode";
const API_URL = process.env.REACT_APP_API_URL;
console.log(process.env.REACT_APP_API_URL);

const App = () => {
  const [movieName, setMovieName] = useState("");
  const [keywords, setKeywords] = useState([]);
  const [emojis, setEmojis] = useState([]);
  const [title, setTitle] = useState("");
  const [original_title, setOriginalTitle] = useState("");
  const [synopsisEN, setSynopsisEN] = useState("");
  const [synopsisES, setSynopsisES] = useState("");
  const [image, setImage] = useState("");
  const [score, setScore] = useState("0");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [emojiClass, setEmojiClass] = useState("openmoji-demo");

  const toggleEmojiClass = () => {
    setEmojiClass((prevClass) =>
      prevClass === "openmoji-demo" ? "openmoji-ios" : "openmoji-demo"
    );
  };

  const handleMovieChange = (event) => {
    setMovieName(event.target.value);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(false);
    console.log(API_URL);
    try {
      const response = await axios.get(`${API_URL}/find`, {
        params: {
          movie: movieName,
        },
      });
      setKeywords(response.data.keywords);
      setEmojis(response.data.emojis);
      setTitle(response.data.title);
      setOriginalTitle(response.data.original_title);
      setSynopsisEN(response.data.synopsisEN);
      setSynopsisES(response.data.synopsisES);
      setImage(response.data.image);
      setScore(String(response.data.score));
      console.log(response.data);
      console.log(response.data.emojis);
    } catch (error) {
      console.error("Error fetching movie data:", error);
      setError("Error al buscar la película. Por favor, inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const handleEmojiClick = (textarea) => {};

  return (
    <>
      <Container
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "90vh",
          maxWidth: "80% !important",
        }}
      >
        <Paper
          elevation={7}
          style={{
            padding: "24px 16px 16px 16px",
            margin: "32px 0px 8px 0px",
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          <Typography
            variant="h3"
            align="center"
            gutterBottom
            style={{ fontWeight: 1000 }}
          >
            Película a Emojis
          </Typography>
        </Paper>
        <Paper
          elevation={7}
          style={{
            padding: 16,
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
            <label htmlFor="movie-name">
              <Typography variant="h6" align="center" gutterBottom>
                Ingresa el nombre de la película:
              </Typography>
            </label>
            <TextField
              id="movie-name"
              type="text"
              value={movieName}
              onChange={handleMovieChange}
              label="Ej. Inception"
              style={{ width: "100%", marginTop: 8, alignContent: "center" }}
              variant="filled"
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              disabled={!movieName}
              style={{ marginTop: 16 }}
              endIcon={<SendIcon />}
            >
              Generar Emojis
            </Button>
            {loading && <CircularProgress style={{ marginTop: 16 }} />}
            {error && (
              <Box mt={2}>
                <Alert severity="error">{error}</Alert>
              </Box>
            )}
            {keywords.length > 0 && (
              <Box mt={4} textAlign="center" padding={"5%"}>
                <Typography
                  variant="h4"
                  gutterBottom
                  style={{ fontWeight: 1000 }}
                >
                  {title + " (" + original_title + ")"}
                </Typography>
                <Box mt={4} textAlign="center" style={{ display: "flex" }}>
                  <Box mt={4} width={"100%"}>
                    <Box
                      component={"img"}
                      src={`https://image.tmdb.org/t/p/w400${image}`}
                      width="20rem"
                    ></Box>
                    <Typography variant="h6" gutterBottom>
                      {score + "/10"}
                    </Typography>
                  </Box>
                  <Typography
                    variant="body1"
                    style={{ alignContent: "center", padding: "2rem" }}
                  >
                    {synopsisES}
                    <br></br> <br></br>
                    {synopsisEN}
                  </Typography>
                </Box>
                <Typography
                  variant="h6"
                  gutterBottom
                  style={{ fontWeight: 1000 }}
                >
                  Palabras Clave:
                </Typography>
                <Typography variant="body1" style={{ marginBottom: 16 }}>
                  {keywords.join(", ")}
                </Typography>
                <Typography variant="h6" gutterBottom>
                  Emojis correspondientes:
                </Typography>
                <Box display="flex" justifyContent="center" flexWrap="wrap">
                  {emojis.map((emoji, index) => (
                    <>
                      {emoji && (
                        <Box key={index} m={1}>
                          <Tooltip
                            title={
                              <Typography fontSize={"2rem"}>
                                {keywords[index]}
                              </Typography>
                            }
                          >
                            <Button
                              variant="contained"
                              color="primary"
                              style={{ textTransform: "none" }}
                              onClick={() => {
                                handleEmojiClick();
                                toggleEmojiClass(); // Llama a la función para cambiar la clase
                              }}
                              size="small"
                            >
                              <Typography fontSize={"6rem"}>
                                <span className={emojiClass}>
                                  {convertCodeToEmoji(emoji)}
                                </span>
                              </Typography>
                            </Button>
                          </Tooltip>
                        </Box>
                      )}
                    </>
                  ))}
                </Box>
              </Box>
            )}
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
          height: "10vh",
        }}
      >
        <Typography align="center" gutterBottom style={{ height: "10vh" }}>
          Consulta realizada utilizando la API de TMDb. Más información en:
          <Link href="https://www.themoviedb.org/documentation/api">
            https://www.themoviedb.org/documentation/api
          </Link>
        </Typography>
      </BottomNavigation>
    </>
  );
};

export default App;

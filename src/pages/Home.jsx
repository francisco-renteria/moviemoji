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
  Tooltip,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";
import convertCodeToEmoji from "../utils/convertEmojiCode";
import SearchBar from "material-ui-search-bar";
import MediaQuery from "react-responsive";

const API_URL = process.env.REACT_APP_API_URL;
console.log(process.env.REACT_APP_API_URL);

const Home = () => {
  const [movieName, setMovieName] = useState("");
  const [keywords, setKeywords] = useState([]);
  const [emojis, setEmojis] = useState([]);
  const [title, setTitle] = useState("");
  const [original_title, setOriginalTitle] = useState("");
  const [synopsisEN, setSynopsisEN] = useState("");
  const [synopsisES, setSynopsisES] = useState("");
  const [image, setImage] = useState("");
  const [score, setScore] = useState(0);
  const [backdrop_path, setBackdropPath] = useState("");
  const [release_date, setReleaseDate] = useState("");
  const [runtime, setRuntime] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [emojiClass, setEmojiClass] = useState("openmoji-demo");

  const toggleEmojiClass = () => {
    setEmojiClass((prevClass) =>
      prevClass === "openmoji-demo" ? "openmoji-ios" : "openmoji-demo"
    );
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
      setScore(response.data.score);
      setBackdropPath(response.data.backdrop_path);
      setReleaseDate(response.data.release_date);
      setRuntime(response.data.runtime);

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
          marginBottom: "7rem",
          maxWidth: "80% !important",
        }}
      >
        {/* <Paper
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
        </Paper> */}
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
              ¡Descubre los Emojis de una Película!
            </Typography>
            <br></br>
            <Typography variant="h4" align="center">
              🎬👾🍿
            </Typography>
            <SearchBar
              value={movieName}
              onChange={setMovieName}
              onRequestSearch={handleSubmit}
              onCancelSearch={setMovieName}
              style={{
                width: "100%",
                margin: 32,
                alignContent: "center",
                background: "whitesmoke",
              }}
              placeholder="Buscar Película"
            />

            {loading && <CircularProgress style={{ margin: 16 }} />}
            {error && (
              <Box mt={2}>
                <Alert severity="error">{error}</Alert>
              </Box>
            )}
            {keywords.length > 0 && (
              <MediaQuery query="(max-width: 899px)">
                <Box padding={"0%"} width={"100%"}>
                  <Box
                    style={{
                      display: "flex",

                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                      backgroundBlendMode: "screen",
                      backgroundPosition: "left 17vw top",
                      // borderRadius: "0.5rem",
                    }}
                    sx={{
                      background: ` url('https://image.tmdb.org/t/p/w500${backdrop_path}')}`,
                    }}
                  >
                    <Box
                      width={"100%"}
                      style={{
                        backgroundImage:
                          "linear-gradient(to right, rgba(73.5, 115.5, 199.5, 1) calc(20vw), rgba(73.5, 115.5, 199.5, 0.84) 25%, rgb(73 115 199 / 0%) 100%)",
                      }}
                    >
                      <Box
                        component={"img"}
                        src={`https://image.tmdb.org/t/p/w500${image}`}
                        width="30vw"
                        borderRadius={"0.5rem"}
                        margin={"1rem"}
                      />
                    </Box>
                  </Box>
                </Box>
              </MediaQuery>
            )}
            {keywords.length > 0 && (
              <Box textAlign="center" padding={"0%"}>
                <Box
                  textAlign="center"
                  style={{
                    display: "flex",

                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundBlendMode: "screen",
                    // borderRadius: "0.5rem",
                  }}
                  sx={{
                    background: {
                      xs: "none", // Sin fondo para pantallas menores a 900px

                      md: `rgba(210, 200, 210) url('https://image.tmdb.org/t/p/w500${backdrop_path}')`, // Fondo para pantallas mayores a 900px
                    },
                  }}
                >
                  <MediaQuery query="(min-width: 900px)">
                    <Box
                      mt={4}
                      width={"100%"}
                      marginTop={"0px"}
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "column",
                      }}
                    >
                      <Box
                        component={"img"}
                        src={`https://image.tmdb.org/t/p/w500${image}`}
                        width="20rem"
                        borderRadius={"0.5rem"}
                        margin={"1rem"}
                      />
                    </Box>
                  </MediaQuery>

                  <Box marginTop={"32px"}>
                    <Typography
                      variant="h4"
                      gutterBottom
                      style={{ fontWeight: 700 }}
                    >
                      {title + " (" + original_title + ")"}
                    </Typography>
                    <Box sx={{ position: "relative", display: "inline-flex" }}>
                      <CircularProgress
                        color="primary"
                        variant="determinate"
                        value={score * 10}
                        size={80}
                        thickness={7}
                      />
                      <Box
                        sx={{
                          top: 0,
                          left: 0,
                          bottom: 0,
                          right: 0,
                          position: "absolute",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Typography
                          variant="caption"
                          component="div"
                          color="text.primary"
                          fontSize={"2rem"}
                          fontWeight={"700"}
                        >
                          {`${Math.round(score * 10)}`}
                        </Typography>
                      </Box>
                    </Box>
                    <Typography>
                      {"Año:" + release_date.substring(0, 4)} {runtime + "min"}
                    </Typography>
                    <MediaQuery query="(min-width: 900px)">
                      <Typography
                        variant="body1"
                        style={{
                          alignContent: "center",
                          padding: "2rem",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                        }}
                      >
                        {synopsisES}
                        <br></br> <br></br>
                        {synopsisEN}
                      </Typography>
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
                    </MediaQuery>
                    <MediaQuery query="(max-width: 899px)">
                      <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                          Resumen
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography
                            variant="body1"
                            style={{
                              alignContent: "center",
                              padding: "2rem",
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "center",
                            }}
                          >
                            {synopsisES}
                            <br></br> <br></br>
                            {synopsisEN}
                          </Typography>
                        </AccordionDetails>
                      </Accordion>
                      <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                          Palabras Clave
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography
                            variant="body1"
                            style={{ marginBottom: 16 }}
                          >
                            {keywords.join(", ")}
                          </Typography>
                        </AccordionDetails>
                      </Accordion>
                    </MediaQuery>
                  </Box>
                </Box>
                <Accordion
                  defaultExpanded={true}
                  expandIcon={<ExpandMoreIcon />}
                >
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    Emojis
                  </AccordionSummary>
                  <AccordionDetails></AccordionDetails>

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
                </Accordion>
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

export default Home;

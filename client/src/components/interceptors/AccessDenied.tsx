import { useNavigate } from "react-router-dom";

import { Box, Button, ThemeProvider } from "@mui/material";
import { darkTheme } from "../style/darkTheme";

export const AccessDenied = () => {
  const navigate = useNavigate();
  const imgSrc =
    "https://images.vexels.com/media/users/3/153827/isolated/preview/050d23fc87215157ef54f2d21e131fa2-icone-de-cadeado-colorido.png";

  return (
    <ThemeProvider theme={darkTheme}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          margin: "0 20px",
        }}
      >
        <img
          style={{
            marginTop: "5px",
            width: "120px",
            height: "120px",
            maxWidth: "30%",
          }}
          src={imgSrc}
          alt="Padlock icon"
        ></img>
        <h1 style={{ marginBottom: "10px" }}>Access denied</h1>
        <hr style={{ width: "50%" }} />
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <p>Você não tem permissão para acessar essa página.</p>
          <p>
            Entre em contato com um administrador para ter acesso a página ou
            ter alguma ajuda para acessar.
          </p>
        </div>
        <Button
          variant="contained"
          color="success"
          onClick={() => {
            navigate("/login");
          }}
        >
          Vá para o Login
        </Button>
      </Box>
    </ThemeProvider>
  );
};

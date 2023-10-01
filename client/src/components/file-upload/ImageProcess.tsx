import * as React from "react";

import { ThemeProvider } from "@mui/material";
import { UploadImage } from "./UploadImage";
import { darkTheme } from "../style/darkTheme";

export const ImageProcess = () => {
  return (
    // TODO: Página de receber imagem e mandar para a API de resultado
    <ThemeProvider theme={darkTheme}>
      <UploadImage/>
    </ThemeProvider>
  );
};

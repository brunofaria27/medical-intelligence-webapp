import * as React from "react";

import { ThemeProvider } from "@mui/material";
import { UploadImage } from "./UploadImage";
import { darkTheme } from "../style/darkTheme";

export const ImageProcess = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <UploadImage/>
    </ThemeProvider>
  );
};

import * as React from "react";

import { darkTheme } from "../style/darkTheme";

import {
  Container,
  ThemeProvider,
  Typography,
  Table,
  TableCell
} from "@mui/material";
import { getDiagnostics } from "../../repositories/diagnostic_repository";
import { Diagnostic } from "../../models/Diagnostic";

export const DiagnosticHistory = () => {

  const [diagnosticList, setDiagnosticList] = React.useState<any[]>([]);

  React.useEffect(() => {
    const loadDiagnostics = async () => {
      try {
        const userEmail = localStorage.getItem("userEmail");
        if (!userEmail) {
          return <>PRECISA LOGAR</>;
        }

        const response = await getDiagnostics(userEmail);
        if (response) {
          setDiagnosticList(response.diagnostics);
        }
      } catch (error) {
      }
    };

    loadDiagnostics();
  }, []);

  return (
    <ThemeProvider theme={darkTheme}>
      <Container
        sx={{
          marginTop: "50px",
          padding: "15px",
          boxShadow: 12,
          backgroundColor: "white",
          borderRadius: "12px",
        }}
      >
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            marginBottom: "15px",
          }}
        >
          🤖 <strong>DIAGNÓSTICOS PASSADOS</strong>
        </Typography>
        
        {diagnosticList.map((diagnostic: Diagnostic) => (<>{diagnostic.accuracy}</>))}
      </Container>
    </ThemeProvider>
  );
};

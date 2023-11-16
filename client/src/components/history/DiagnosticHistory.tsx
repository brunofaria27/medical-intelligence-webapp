import * as React from "react";

import { darkTheme } from "../style/darkTheme";

import {
  Container,
  CircularProgress,
  ThemeProvider,
  Typography,
  Table,
  TableCell,
  TableRow,
  TableBody,
  TableContainer,
  TableHead,
  IconButton,
  Box
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteDiagnostic, getDiagnostics } from "../../repositories/diagnostic_repository";
import { Alerts } from "../notifications/Alerts";

export const DiagnosticHistory = () => {
  const [errorDeleteDiagnostic, setErrorDeleteDiagnostic] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [diagnosticList, setDiagnosticList] = React.useState<any[]>([]);

  const userEmail = React.useMemo(() => localStorage.getItem("userEmail"), [])

  React.useEffect(() => {
    const loadDiagnostics = async () => {
      try {
        if (!userEmail) {
          return;
        }

        setIsLoading(true);
        const response = await getDiagnostics(userEmail);
        setIsLoading(false);

        if (response) {
          setDiagnosticList(response.diagnostics);
        }
      } catch (error) {
      }
    };

    loadDiagnostics();
  }, [userEmail]);

  async function handleDeleteDiagnostic(date: string, time: string) {
    try {
      if (!userEmail) {
        setErrorDeleteDiagnostic(true);
        setTimeout(() => {
          setErrorDeleteDiagnostic(false);
        }, 5000);
        return;
      }
      await deleteDiagnostic(userEmail, date, time)
      const response = await getDiagnostics(userEmail);
      if (response) {
        setDiagnosticList(response.diagnostics);
      }
    } catch (error) {
      setErrorDeleteDiagnostic(true);
      setTimeout(() => {
        setErrorDeleteDiagnostic(false);
      }, 5000);
    }
  }

  function getAccuracyColor(accuracy: number) {
    if (accuracy >= 0.9) {
      return "rgba(7, 152, 16, 0.8) !important"
    }
    return "rgba(255, 181, 0, 1) !important"
  }

  return (
    <ThemeProvider theme={darkTheme}>
      {errorDeleteDiagnostic && (
        <Alerts
          severity={"error"}
          messageTitle={"Error!"}
          message={"Erro ao deletar o diagnóstico."}
        />
      )}

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
        <hr style={{ marginBottom: "20px" }}></hr>
        {isLoading &&
          <Box sx={{
            textAlign: "center",
            padding: "16px"
          }}>
            <CircularProgress color="error" />
          </Box>}
        {diagnosticList.length > 0 ?
          <TableContainer sx={{ justifyContent: "flex-end", "& td, th": { border: "none" }, "& table": { borderSpacing: "0px" } }}>
            <Table sx={{ "& .MuiTableCell-root": { color: "black", padding: "8px", justifyContent: "center" } }} aria-label="simple table">
              <TableHead>
                <TableRow sx={{ "& .MuiTableCell-root": { fontWeight: 600, fontSize: "14px" } }}>
                  <TableCell >Doença</TableCell>
                  <TableCell>Acurácia</TableCell>
                  <TableCell>Data</TableCell>
                  <TableCell>Hora</TableCell>
                </TableRow>
              </TableHead>
              <TableBody
                sx={{
                }}>
                {diagnosticList.map((diagnostic) => (
                  <TableRow
                    key={diagnostic.date}
                    sx={{
                      "& .MuiTableCell-root": { fontSize: "16px", paddingLeft: "16px" },
                      borderRadius: "10px",
                      ":hover": { backgroundColor: "rgba(0, 0, 0, 0.09)" }
                    }}
                  >
                    <TableCell>{diagnostic.classification}</TableCell>
                    <TableCell sx={{ color: getAccuracyColor(diagnostic.accuracy), fontWeight: "600 !important" }}>{(diagnostic.accuracy * 100).toString().substring(0, 5)}%</TableCell>
                    <TableCell>{diagnostic.date}</TableCell>
                    <TableCell>{diagnostic.time}</TableCell>
                    <IconButton aria-label="delete" size="large" onClick={() => handleDeleteDiagnostic(diagnostic.date, diagnostic.time)}>
                      <DeleteIcon fontSize="inherit" htmlColor="black" />
                    </IconButton>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer> :
          !isLoading && <Typography
            sx={{
              fontSize: "20px",
              marginTop: "15px",
              marginLeft: "15px",
            }}
          >
            Você não possui nenhum diagnóstico salvo.
          </Typography>}

      </Container>
    </ThemeProvider>
  );
};

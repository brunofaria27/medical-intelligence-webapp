import {
  Box,
  Typography,
  Container,
  Table,
  TableCell,
  TableRow,
  TableBody,
  TableContainer,
  TableHead,
  CircularProgress,
} from "@mui/material";
import React from "react";
import { getDoctors } from "../../repositories/user_repository";


export const DoctorsList = () => {
  const [doctorsList, setDoctorsList] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    const loadDoctors = async () => {
      try {


        setIsLoading(true);
        const response = await getDoctors();
        setIsLoading(false);

        if (response) {
          setDoctorsList(response.doctors);
        }
      } catch (error) {
      }
    };

    loadDoctors();
  }, []);

  function getMapsLink(lat: string, long: string) {
    return `https://maps.google.com?q=${lat},${long}`
  }

  return (
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
        <strong>MÉDICOS INDICADOS</strong>
      </Typography>
      <hr style={{ marginBottom: "20px" }}></hr>
      {isLoading &&
        <Box sx={{
          textAlign: "center",
          padding: "16px"
        }}>
          <CircularProgress color="error" />
        </Box>}

      {doctorsList.length > 0 ?
        <TableContainer sx={{ justifyContent: "flex-end", "& td, th": { border: "none" }, "& table": { borderSpacing: "0px" } }}>
          <Table sx={{ "& .MuiTableCell-root": { color: "black", padding: "8px", justifyContent: "center" } }} aria-label="simple table">
            <TableHead>
              <TableRow sx={{ "& .MuiTableCell-root": { fontWeight: 600, fontSize: "14px" } }}>
                <TableCell >Médico</TableCell>
                <TableCell>Atuação</TableCell>
                <TableCell>Clínica</TableCell>
                <TableCell>Endereço</TableCell>
                <TableCell>Descrição</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody
              sx={{
              }}>
              {doctorsList.map((doctor) => (
                <TableRow
                  key={doctor.email}
                  sx={{
                    "& .MuiTableCell-root": { fontSize: "16px", paddingLeft: "16px" },
                    borderRadius: "10px",
                    ":hover": { backgroundColor: "rgba(0, 0, 0, 0.09)" }
                  }}
                >
                  <TableCell>{doctor.name}</TableCell>
                  <TableCell>{doctor.doctor_category}</TableCell>
                  <TableCell>{doctor.doctorClinic.clinic_name}</TableCell>
                  <TableCell>
                    <a href={getMapsLink(doctor.coordinate.latitude, doctor.coordinate.longitude)} target="_blank" rel="noreferrer">
                      {doctor.doctorClinic.clinic_street}, {doctor.doctorClinic.clinic_number} - {doctor.doctorClinic.clinic_city}, {doctor.doctorClinic.clinic_state}
                    </a>
                  </TableCell>
                  <TableCell>{doctor.doctorClinic.clinic_about}</TableCell>
                  <img
                    src={doctor.doctorClinic.clinic_picture}
                    loading="lazy"
                    alt="Preview Site Images"
                    style={{
                      maxWidth: "80px",
                      borderRadius: "10px",
                      margin: "10px"
                    }}
                  />
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
          Não há nenhum médico disponível.
        </Typography>}
    </Container>
  );
}
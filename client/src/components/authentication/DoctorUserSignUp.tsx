import * as React from "react";

import {
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  IconButton,
  ImageListItem,
  ImageListItemBar,
  Input,
  InputLabel,
  Link,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import { darkTheme } from "../style/darkTheme";
import { getAddressByCEP } from "../../repositories/maps";
import { DoctorUser } from "../../models/DoctorUser";
import { DoctorClinic } from "../../models/DoctorClinic";
import { imageToBase64 } from "../../utils/image_base64";
import { Alerts } from "../notifications/Alerts";
import { AxiosError } from "axios";
import { doctorRegister } from "../../repositories/user_repository";

const roles = ["Nenhuma", "Dermatologista", "Cardiologista", "Urologista"];

export const DoctorUserSignUp = () => {
  const [selectedRole, setSelectedRole] = React.useState("Nenhuma");
  const [street, setStreet] = React.useState("");
  const [number, setNumber] = React.useState("");
  const [city, setCity] = React.useState("");
  const [state, setState] = React.useState("");
  const [cep, setCEP] = React.useState("");
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);

  const [errorCreate, setErrorCreate] = React.useState(false);
  const [errorEmail, setErrorEmail] = React.useState(false);
  const [errorSelectImage, setErrorSelectImage] = React.useState(false);

  function handleRemoveImage() {
    setSelectedFile(null);
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleChangeRole = (event: SelectChangeEvent) => {
    setSelectedRole(event.target.value);
  };

  async function handleCEPChange(event: { target: { value: any } }) {
    const newCEP = event.target.value;
    setCEP(newCEP);

    if (newCEP.length === 8) {
      try {
        const address = await getAddressByCEP(newCEP);
        setStreet(address.logradouro);
        setNumber(address.complemento);
        setCity(address.localidade);
        setState(address.uf);
      } catch (error) {
        console.log(error);
      }
    }
  }

  async function createDoctorUser(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    
    const pictureBase64 = await imageToBase64(selectedFile);
    if (pictureBase64 === null) {
      setErrorSelectImage(true);
      setTimeout(() => {
        setErrorSelectImage(false);
      }, 5000);
      return;
    }

    const doctorClinic: DoctorClinic = {
      clinic_name: formData.get("clinic_name") as string,
      clinic_about: formData.get("clinic_about") as string,
      clinic_picture: pictureBase64,
      clinic_cep: cep,
      clinic_street: street,
      clinic_number: number,
      clinic_city: city,
      clinic_state: state,
    };

    const doctorUser: DoctorUser = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      doctor_category: selectedRole,
      doctorClinic: doctorClinic,
      userType: "Médico",
    };

    try {
      const response = await doctorRegister(doctorUser);

      if (response) {
        window.location.href = "/login";
        setErrorCreate(false);
        setErrorEmail(false);
      }
    } catch (error: unknown) {
      if (
        error instanceof AxiosError &&
        error.response &&
        error.response.status === 406
      ) {
        setErrorCreate(false);
        setErrorEmail(true);
        setTimeout(() => {
          setErrorEmail(false);
        }, 15000);
      } else {
        setErrorEmail(false);
        setErrorCreate(true);
        setTimeout(() => {
          setErrorCreate(false);
        }, 15000);
      }
    }
  }

  return (
    <ThemeProvider theme={darkTheme}>
      {errorCreate && (
        <Alerts
          severity={"error"}
          messageTitle={"Erro!"}
          message={"Não foi possivel criar o usuário."}
        />
      )}

      {errorEmail && (
        <Alerts
          severity={"warning"}
          messageTitle={"Aviso!"}
          message={"O endereço de email já está cadastrado."}
        />
      )}

      {errorSelectImage && (
        <Alerts
          severity={"warning"}
          messageTitle={"Aviso!"}
          message={"Selecione alguma imagem para a sua clinica."}
        />
      )}

      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            component="form"
            noValidate
            onSubmit={createDoctorUser}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Nome"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Senha"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <Select
                  required
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={selectedRole}
                  label="Especialização"
                  onChange={handleChangeRole}
                  sx={{ width: "100%" }}
                >
                  {roles.map((role) => (
                    <MenuItem key={role} value={role}>
                      {role}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={12} sx={{ marginTop: "20px" }}>
                <Typography component="h1" variant="body1">
                  🏥 <strong> Informações do consultório </strong>{" "}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="clinic_name"
                  label="Nome da clinica"
                  type="text"
                  id="clinic_name"
                  autoComplete="new-clinic_name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  multiline
                  name="clinic_about"
                  label="Descrição da clinica"
                  type="text"
                  id="clinic_about"
                  autoComplete="new-clinic_about"
                />
              </Grid>
              <Grid item xs={12}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    component="h1"
                    variant="body1"
                    sx={{ marginBottom: "10px" }}
                  >
                    <strong> Logo do consultório: </strong>
                  </Typography>
                  <InputLabel htmlFor="fileInput">
                    <Input
                      type="file"
                      id="fileInput"
                      style={{ display: "none" }}
                      onChange={handleFileChange}
                      inputProps={{ "aria-label": "Foto" }}
                    />
                    <Button
                      component="span"
                      variant="contained"
                      startIcon={<CloudUploadIcon />}
                    >
                      Selecionar
                    </Button>
                  </InputLabel>
                </Box>
              </Grid>
              <Grid item xs={12}>
                {selectedFile && (
                  <Box>
                    <Typography
                      component="h1"
                      variant="body1"
                      sx={{ marginBottom: "10px" }}
                    >
                      <strong> 🖼️ Imagem selecionada: </strong>
                    </Typography>
                    <ImageListItem>
                      <img
                        src={URL.createObjectURL(selectedFile)}
                        loading="lazy"
                        alt="Preview Site Images"
                      />
                      <ImageListItemBar
                        position="top"
                        actionIcon={
                          <IconButton
                            sx={{ color: "red" }}
                            onClick={() => handleRemoveImage()}
                          >
                            <DeleteIcon />
                          </IconButton>
                        }
                        actionPosition="right"
                      />
                    </ImageListItem>
                  </Box>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="cep"
                  label="CEP"
                  id="cep"
                  value={cep}
                  onChange={handleCEPChange}
                  inputProps={{
                    maxLength: 8,
                    pattern: "[0-9]*",
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="street"
                  label="Rua"
                  id="street"
                  value={street}
                  onChange={(event) => setStreet(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  name="number"
                  label="Número"
                  id="number"
                  value={number}
                  onChange={(event) => setNumber(event.target.value)}
                  inputProps={{
                    pattern: "[0-9]*",
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  required
                  fullWidth
                  name="city"
                  label="Cidade"
                  id="city"
                  value={city}
                  onChange={(event) => setCity(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  required
                  fullWidth
                  name="state"
                  label="Estado"
                  id="state"
                  value={state}
                  onChange={(event) => setState(event.target.value)}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Cadastrar
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Você já tem uma conta? Entre
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

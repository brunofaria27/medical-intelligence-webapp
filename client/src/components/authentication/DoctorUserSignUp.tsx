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

const roles = ["Nenhuma", "Dermatologista", "Cardiologista", "Urologista"];

export const DoctorUserSignUp = () => {
  const [selectedRole, setSelectedRole] = React.useState("Nenhuma");
  const [street, setStreet] = React.useState("");
  const [number, setNumber] = React.useState("");
  const [city, setCity] = React.useState("");
  const [state, setState] = React.useState("");
  const [cep, setCEP] = React.useState("");
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);

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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <ThemeProvider theme={darkTheme}>
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
            onSubmit={handleSubmit}
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
                  id="clinic_name"
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

import * as React from "react";

import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  Link,
  TextField,
  ThemeProvider,
} from "@mui/material";
import { getAddressByCEP } from "../../repositories/maps";
import { userRegister } from "../../repositories/user_repository";
import { CommonUser } from "../../models/CommonUser";
import { AxiosError } from "axios";
import { darkTheme } from "../style/darkTheme";

export const CommonUserSignUp = () => {
  const [street, setStreet] = React.useState("");
  const [number, setNumber] = React.useState("");
  const [city, setCity] = React.useState("");
  const [state, setState] = React.useState("");
  const [cep, setCEP] = React.useState("");

  const [errorCreate, setErrorCreate] = React.useState(false);
  const [errorEmail, setErrorEmail] = React.useState(false);

  async function createCommonUser(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const commonUser: CommonUser = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      cep: cep,
      street: street,
      number: number,
      city: city,
      state: state,
      userType: "Cliente",
    };

    try {
      const response = await userRegister(commonUser);

      if (response) {
        setErrorCreate(false);
        setErrorEmail(false);
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError && error.response && error.response.status === 406) {
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
            onSubmit={createCommonUser}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                {errorCreate && (
                  <div id="request-alert">
                    <Alert severity="error">
                      <AlertTitle>
                        <strong>Erro!</strong>
                      </AlertTitle>
                      Não foi possivel criar o usuário.
                    </Alert>
                  </div>
                )}

                {errorEmail && (
                  <div id="request-alert">
                    <Alert severity="warning">
                      <AlertTitle>
                        <strong>Aviso!</strong>
                      </AlertTitle>
                      O endereço de email já está cadastrado.
                    </Alert>
                  </div>
                )}
              </Grid>
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

import * as React from "react";

import {
  Avatar,
  Container,
  FormControlLabel,
  Switch,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import LockIcon from '@mui/icons-material/Lock';

import { DoctorUserSignUp } from "./DoctorUserSignUp";
import { CommonUserSignUp } from "./CommonUserSignUp";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1976d2",
    },
  },
});

export const SignUp = () => {
  const [switchSelected, setSwitchSelected] = React.useState(false);

  const handleSwitchChange = (event: { target: { checked: any } }) => {
    setSwitchSelected(event.target.checked);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Container
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {switchSelected ? (`Cadastro médico`) : (`Cadastro comum`)}
        </Typography>
        <FormControlLabel
          control={
            <Switch
              color="secondary"
              checked={switchSelected}
              onChange={handleSwitchChange}
            />
          }
          label={switchSelected ? ("Cadastro comum?") : ("Cadastro médico?")}
        />
        {switchSelected ? <DoctorUserSignUp /> : <CommonUserSignUp />}
      </Container>
    </ThemeProvider>
  );
};

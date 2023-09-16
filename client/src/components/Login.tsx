import * as React from "react";

import {
  Alert,
  AlertTitle,
  Button,
  Card,
  CardContent,
  Link,
  TextField,
  Typography,
} from "@mui/material";

import { authLogin } from "../auth/auth_treatment";

export const Login = () => {
  const [requestError, setRequestError] = React.useState(false);

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const loginStatus = await authLogin(email.trim(), password);

      if (loginStatus) {
        window.location.href = "/admin";
        setRequestError(false);
      } else {
        setRequestError(true);
        setTimeout(() => {
          setRequestError(false);
        }, 15000);
      }
    } catch (error) {
      setRequestError(true);
      setTimeout(() => {
        setRequestError(false);
      }, 15000);
    }
  }

  const imageSrc = requestError
    ? "https://static.wixstatic.com/media/c92b5c_9c71fcce860f4aebbaf1892fa021e883~mv2.gif"
    : "https://i.pinimg.com/originals/e5/93/ab/e593ab0589d5f1b389e4dfbcce2bce20.gif";

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        margin: "0 20px",
      }}
    >
      <form method="POST" onSubmit={handleLogin}>
        <Card
          sx={{
            width: "100%",
            maxWidth: 530,
            backgroundColor: "#F0F8FF",
            boxShadow: "0px 0px 100px rgba(0, 0, 0, 0.2)",
            borderRadius: 3,
          }}
        >
          <CardContent>
            <div
              style={{
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="h4"
                component="h4"
                display={"flex"}
                alignItems={"center"}
                fontSize={25}
                color={"black"}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  paddingBottom: 4,
                }}
              >
                <strong>Administrator Page - Login</strong>
              </Typography>

              <img
                style={{
                  marginTop: "5px",
                  maxWidth: "30%",
                  height: "auto",
                }}
                src={imageSrc}
                alt="Animated GIF"
              ></img>
            </div>

            {requestError && (
              <div id="request-alert">
                <Alert severity="error">
                  <AlertTitle>
                    <strong>Error!</strong>
                  </AlertTitle>
                  User not found.
                </Alert>
              </div>
            )}

            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
            >
              Log In
            </Button>

            <Typography variant="body2" color="text.secondary" align="center">
              Having problems when loggin in? contact the
              <Link
                href="https://www.instagram.com/fariabruno_/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none" }}
              >
                <Button color="primary" style={{ textTransform: "none" }}>
                  <span style={{ textTransform: "capitalize" }}>Developer</span>
                </Button>
              </Link>
            </Typography>
          </CardContent>
        </Card>
      </form>
    </div>
  );
};
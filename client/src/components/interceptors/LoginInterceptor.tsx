import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";

import {
  getAuthorization,
  getAuthorizationLogin,
} from "../../repositories/auth_repository";

interface LoginInterceptor {
  children: React.ReactNode;
}

export const LoginInterceptor = ({ children }: LoginInterceptor) => {
  const [loading, setLoading] = useState(true);
  const [accessDenied, setAccessDenied] = useState(false);

  useEffect(() => {
    async function checkPermissions() {
      const token = await getAuthorization();

      if (!token) {
        setAccessDenied(true);
        setLoading(false);
        return;
      } else {
        const isLogged = await getAuthorizationLogin(token);

        if (!isLogged) {
          setAccessDenied(true);
          setLoading(false);
          return;
        }
      }

      setLoading(false);
    }

    checkPermissions();
  }, []);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  if (accessDenied) {
    return <Navigate to="/access-denied" />;
  }

  return <>{children}</>;
};

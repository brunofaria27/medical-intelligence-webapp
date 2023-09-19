import * as React from "react";

import Alert, { AlertColor } from "@mui/material/Alert";
import { AlertTitle } from "@mui/material";

interface AlertProps {
  severity: AlertColor;
  messageTitle: string;
  message: string;
}

export const Alerts: React.FC<AlertProps> = ({
  severity,
  messageTitle,
  message,
}) => {
  const [isVisible, setIsVisible] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return isVisible ? (
    <Alert
      severity={severity}
      sx={{
        position: "fixed",
        top: "20px",
        right: "20px",
        zIndex: 9999,
        width: "300px",
        marginTop: "55px",
      }}
    >
      <AlertTitle>{messageTitle}</AlertTitle>
      {message}
    </Alert>
  ) : null;
};

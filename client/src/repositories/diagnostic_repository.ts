import { Diagnostic } from "../models/Diagnostic";

import api from "./api";

export async function getDiagnostics(email: string) {
  const response = await api.get("/diagnostic/history", {
    params: {
      userEmail: email
    },
  });

  const data = await response.data;
  return data;
}

export async function deleteDiagnostic(email: string, date: string, time: string) {
  const response = await api.delete("/diagnostic/delete", {
    params: {
      userEmail: email,
      date: date,
      time: time
    },
  });

  const data = await response.data;
  return data;
}

export async function deleteAllDiagnostics(email: string) {
  const response = await api.delete("/diagnostic/delete-all", {
    params: {
      userEmail: email,
    },
  });

  const data = await response.data;
  return data;
}

export async function postDiagnostic(diagnostic: Diagnostic) {
  const response = await api.post(
    "/diagnostic/register",
    { diagnostic },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.data;
  return data;
}


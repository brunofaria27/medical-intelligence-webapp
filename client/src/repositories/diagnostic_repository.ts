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

export async function deleteDiagnostics(email: string, date: Date) {
  const response = await api.delete("/diagnostic/delete", {
    params: {
      userEmail: email,
      date: date
    },
  });

  const data = await response.data;
  return data;
}

export async function postDiagnostic(diagnostic: Diagnostic) {
  console.log(diagnostic)
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


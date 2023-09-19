import { CommonUser } from "../models/CommonUser";
import api from "./api";

export async function userLogin(email: string, password: string) {
  const response = await api.post(
    "/user/login",
    { email: email, password: password },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const token = await response.data;
  return token;
}

export async function userRegister(commonUser: CommonUser) {
  const response = await api.post(
    "/user/register",
    { commonUser },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.data;
  return data;
}

export async function doctorRegister() {
  const response = await api.post(
    "/user/register-doctor",
    {}, // TODO: send doctor data
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.data;
  return data;
}

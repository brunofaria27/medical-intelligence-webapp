import { CommonUser } from "../models/CommonUser";
import { DoctorUser } from "../models/DoctorUser";
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

export async function doctorRegister(doctorUser: DoctorUser) {
  const response = await api.post(
    "/user/register-doctor",
    { doctorUser },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.data;
  return data;
}

export async function getDoctors() {
  const response = await api.get(
    "/user/doctors"
  );
  const data = await response.data;
  return data;
}
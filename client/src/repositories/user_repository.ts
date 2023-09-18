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

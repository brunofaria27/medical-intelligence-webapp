import api from "./api";

export async function getAuthorization() {
  try {
    const storedToken = localStorage.getItem("authorization");
    return storedToken;
  } catch (error) {
    return null;
  }
}

export async function setAuthorization(authorization: string) {
  try {
    localStorage.setItem("authorization", authorization);
  } catch (error) {
    return null;
  }
}

export async function logoutAuthorization() {
  try {
    localStorage.removeItem("authorization");
  } catch (error) {
    return null;
  }
}

export async function getAuthorizationUser(token: string) {
  try {
    const response = await api.get("/auth/verify-admin", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}

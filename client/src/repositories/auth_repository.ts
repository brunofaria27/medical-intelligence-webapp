export async function getAuthorization() {
    try {
      const storedToken = localStorage.getItem("authorization");
      return storedToken;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  
  export async function setAuthorization(authorization: string) {
    try {
      localStorage.setItem("authorization", authorization);
    } catch (error) {
      console.log(error);
    }
  }
  
  export async function logoutAuthorization() {
    try {
      localStorage.removeItem("authorization");
    } catch (error) {
      console.log(error);
    }
  }
  
  export async function getAuthorizationUser(token: string) {
    try {
      const response = await fetch(
        "http://localhost:8000/api/auth/verify-admin",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (response.ok) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }
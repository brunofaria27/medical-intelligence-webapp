export async function userLogin(email: string, password: string) {
  const response = await fetch("http://localhost:8000/api/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const token = await response.json();
  return token;
}

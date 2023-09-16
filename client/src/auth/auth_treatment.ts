import { setAuthorization } from "../repositories/auth_repository";
import { userLogin } from "../repositories/user_repository";

export async function authLogin(email: string, password: string): Promise<boolean> {
  try {
    const tokenJSON = await userLogin(email, password);
    if (tokenJSON.token != null) {
        setAuthorization(tokenJSON.token);
        return true;
    } 
    return false;
  } catch (error) {
    throw new Error("An error occurred during login: " + error);
  }
}
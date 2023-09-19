export interface CommonUser {
  name: string;
  email: string;
  password: string;
  cep: string;
  street: string;
  number?: string | null;
  city: string;
  state: string;
  userType: string;
}

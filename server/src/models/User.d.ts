import { Coordinates } from "./Coordinates"

export interface User {
  name: string
  email: string
  password: string
  cep: string
  street: string
  number?: string | null
  city: string
  state: string
  coordinate: Coordinates
  userType: string
}

import * as yup from 'yup'
import { User } from '../models/User'

/* Validator /login */
export const loginSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
})

export const registerSchema = yup.object<User>({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
  cep: yup.string().required(),
  street: yup.string().required(),
  number: yup.string(),
  city: yup.string().required(),
  state: yup.string().required(),
  userType: yup.string().required(),
})

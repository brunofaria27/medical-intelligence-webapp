import * as yup from 'yup'

/* Validator /login */
export const loginSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
})

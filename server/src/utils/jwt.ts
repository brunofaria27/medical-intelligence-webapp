import * as jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'

import { UserAttributes } from '../models/UserAttributes'

dotenv.config()
const jwtSecret = process.env.JWT_SECRET

export const validateJwt: (token?: string) => UserAttributes = (
  token?: string
) => {
  if (token === undefined) throw new Error('Missing athentication')

  return jwt.verify(token, jwtSecret) as unknown as UserAttributes
}

export const signJwt = (user: UserAttributes) => {
  return jwt.sign(user, jwtSecret)
}

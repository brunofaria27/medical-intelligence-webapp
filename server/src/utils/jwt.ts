import * as jwt from 'jsonwebtoken'

import { UserAttributes } from '../typescript/user'

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

export const verifyAdmin = async (token?: string) => {
  const validatedUser = await validateJwt(token)

  if (validatedUser.userType !== 'Admin') {
    return { status: 403, error: 'Access Denied.' }
  }

  return { status: 200, error: 'Access granted.' }
}

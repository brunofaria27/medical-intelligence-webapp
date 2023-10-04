import { Router } from 'express'
import { validateJwt } from '../utils/jwt'

export const authRouter = Router()

authRouter.get('/verify-login', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1]

  if (!token) {
    return res.status(401).json({ message: 'Token Missing' })
  }
  try {
    const decodedToken = validateJwt(token)

    if (decodedToken !== undefined) {
      return res.status(200).json({ message: 'Access granted' })
    } else {
      return res.status(403).json({ message: 'Access denied' })
    }
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' })
  }
})

authRouter.get('/verify-doctor', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1]

  if (!token) {
    return res.status(401).json({ message: 'Token Missing' })
  }
  try {
    const decodedToken = validateJwt(token)

    if (decodedToken.userType === 'Médico') {
      return res.status(200).json({ message: 'Access granted' })
    } else {
      return res.status(403).json({ message: 'Access denied' })
    }
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' })
  }
})

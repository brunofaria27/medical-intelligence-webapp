import { ObjectId } from 'mongodb'
import * as mongoDB from 'mongodb'

import { Router } from 'express'
import { sha256 } from '../utils/crypto'
import {
  closeDatabaseConnection,
  collections,
  connectToDatabase,
} from '../services/server'
import { signJwt } from '../utils/jwt'
import { UserAttributes } from '../models/UserAttributes'

export const userRouter = Router()
/* TODO - {
  Se o user for MEDICO => Deve passar coordenadas do consultório e um meio de contato (ideia = coordenada ser capturada no front atraves de um mapinha)
} */
userRouter.post('/registration', async (req, res, next) => {
  let client: mongoDB.MongoClient | null = null

  try {
    client = await connectToDatabase()
    const user = collections.users

    if (!user) {
      return res.status(400).send('Error in registration: user undefined')
    }

    const { name, email, password, userType } = req.body

    const userByEmail = await user.findOne({ email })
    if (userByEmail) {
      return res.status(400).send('User already exists')
    }

    const passwordHash = sha256(password)

    await user.insertOne({ name, email, passwordHash, userType })
    res.status(200).json({ message: 'User Created' })
  } catch (error) {
    next(error)
  } finally {
    if (client) {
      await closeDatabaseConnection(client)
    }
  }
})

userRouter.post('/login', async (req, res, next) => {
  let client: mongoDB.MongoClient | null = null

  try {
    client = await connectToDatabase()
    const user = collections.users

    if (!user) {
      return res
        .status(400)
        .send('Error in registration: collection user undefined')
    }

    const { email, password } = req.body
    const passwordHash = sha256(password)

    const userInstance = await user.findOne({ email, passwordHash: passwordHash });
    if (!userInstance) {
      return res.status(400).send('User not found')
    }

    const signedJwt = signJwt({
      _id: userInstance._id,
      name: userInstance.name,
      email: userInstance.email,
      password: userInstance.passwordHash,
      userType: userInstance.userType,
    })

    res.status(200).json({
      token: signedJwt,
    })
  } catch (error) {
    next(error)
  } finally {
    if (client) {
      await closeDatabaseConnection(client)
    }
  }
})

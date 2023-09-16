import { ObjectId } from 'mongodb'
import * as mongoDB from 'mongodb'

import { Router } from 'express'
import { sha256 } from '../utils/crypto'
import {
  closeDatabaseConnection,
  collections,
  connectToDatabase,
} from '../services/server'

export const userRouter = Router()

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

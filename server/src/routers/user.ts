import * as mongoDB from 'mongodb'

import { Router } from 'express'
import { sha256 } from '../utils/crypto'
import {
  closeDatabaseConnection,
  collections,
  connectToDatabase,
} from '../services/server'
import { signJwt } from '../utils/jwt'
import { loginSchema } from '../validators/user_validate'
import { getCoordinate } from '../utils/coordinates_maps'

export const userRouter = Router()

userRouter.post('/register', async (req, res, next) => {
  let client: mongoDB.MongoClient | null = null

  try {
    client = await connectToDatabase()
    const user = collections.users

    if (!user) {
      return res.status(400).send('Error in registration: user undefined')
    }

    const { commonUser } = req.body

    const userByEmail = await user.findOne({ email: commonUser.email })
    if (userByEmail) {
      return res.status(406).send({ message: 'User already exists', status: 406 })
    }

    const passwordHash = sha256(commonUser.password)
    commonUser.password = passwordHash

    commonUser['coordinate'] = await getCoordinate(commonUser.street)

    await user.insertOne(commonUser)
    res.status(200).json({ message: 'User Created' })
  } catch (error) {
    next(error)
  } finally {
    if (client) {
      await closeDatabaseConnection(client)
    }
  }
})

userRouter.post('/register-doctor', async (req, res, next) => {
  let client: mongoDB.MongoClient | null = null

  try {
    client = await connectToDatabase()
    const doctor = collections.doctors
    const user = collections.users

    if (!user) {
      return res.status(400).send('Error in registration: user undefined')
    }

    if (!doctor) {
      return res.status(400).send('Error in registration: doctors undefined')
    }

    const { doctorUser } = req.body

    const userByEmailCommon = await doctor.findOne({ email: doctorUser.email })
    const userByEmailDoctor = await user.findOne({ email: doctorUser.email })
    if (userByEmailCommon || userByEmailDoctor) {
      return res.status(406).send({ message: 'User already exists', status: 406 })
    }

    const passwordHash = sha256(doctorUser.password)
    doctorUser.password = passwordHash

    doctorUser['coordinate'] = await getCoordinate(doctorUser.doctorClinic.clinic_street)

    await doctor.insertOne(doctorUser)
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
  let client: mongoDB.MongoClient | null = null;

  try {
    client = await connectToDatabase();
    const user = collections.users;
    const doctor = collections.doctors;

    if (!user) {
      return res.status(400).send('Error in login: collection user undefined');
    }

    if (!doctor) {
      return res.status(400).send('Error in login: collection doctor undefined');
    }

    const { email, password } = await loginSchema.validate(req.body);
    const passwordHash = sha256(password);

    const commonUser = await user.findOne({
      email: email,
      password: passwordHash,
    });

    const doctorUser = await doctor.findOne({
      email: email,
      password: passwordHash,
    });

    if (!commonUser && !doctorUser) {
      return res.status(400).send('User not found');
    }

    const userDataToSign = commonUser || doctorUser;
    if (!userDataToSign) {
      return res.status(400).send('User not found');
    }

    const signedJwt = signJwt({
      _id: userDataToSign._id,
      name: userDataToSign.name,
      email: userDataToSign.email,
      userType: userDataToSign.userType,
    });

    res.status(200).json({
      token: signedJwt,
    });
  } catch (error) {
    next(error);
  } finally {
    if (client) {
      await closeDatabaseConnection(client);
    }
  }
});


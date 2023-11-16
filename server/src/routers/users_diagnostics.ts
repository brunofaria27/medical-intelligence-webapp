import * as mongoDB from 'mongodb'
import { closeDatabaseConnection, collections, connectToDatabase } from '../services/server'
import { Router } from 'express'

export const diagnosticRouter = Router()

diagnosticRouter.get('/history', async (req, res, next) => {
  let client: mongoDB.MongoClient | null = null

  try {
    client = await connectToDatabase()
    const diagnosticsUsers = collections.diagnosticsUsers

    if (diagnosticsUsers === undefined) {
      return res.status(400).send('Error in fetching diagnostics: collection undefined')
    }

    const userEmail = req.query.userEmail as string

    if (!userEmail) {
      return res.status(400).send('Error: userEmail not provided in headers')
    }

    const userDiagnostics = await diagnosticsUsers.find({ 'userEmail': userEmail }).toArray()

    res.status(200).json({ count: userDiagnostics.length, diagnostics: userDiagnostics })
  } catch (error) {
    next(error)
  } finally {
    if (client) {
      await closeDatabaseConnection(client)
    }
  }
})

diagnosticRouter.delete('/delete', async (req, res, next) => {
  let client: mongoDB.MongoClient | null = null

  try {
    client = await connectToDatabase()
    const diagnosticsUsers = collections.diagnosticsUsers

    if (!diagnosticsUsers) {
      return res.status(400).send('Error in registration: diagnostic undefined')
    }

    const userEmail = req.query.userEmail
    const date = req.query.date
    const time = req.query.time

    await diagnosticsUsers.findOneAndDelete({ userEmail: userEmail, date: date, time: time })

    res.status(200).json({ message: 'Diagnostic Deleted' })
  } catch (error) {
    next(error)
  } finally {
    if (client) {
      await closeDatabaseConnection(client)
    }
  }
})

diagnosticRouter.delete('/delete-all', async (req, res, next) => {
  let client: mongoDB.MongoClient | null = null

  try {
    client = await connectToDatabase()
    const diagnosticsUsers = collections.diagnosticsUsers

    if (!diagnosticsUsers) {
      return res.status(400).send('Error in registration: diagnostic undefined')
    }

    const userEmail = req.query.userEmail

    await diagnosticsUsers.deleteMany({ 'userEmail': userEmail })
    res.status(200).json({ message: 'Diagnostics Deleted' })

  } catch (error) {
    next(error)
  } finally {
    if (client) {
      await closeDatabaseConnection(client)
    }
  }
})

diagnosticRouter.post('/register', async (req, res, next) => {
  let client: mongoDB.MongoClient | null = null

  try {
    client = await connectToDatabase()
    const diagnosticsUsers = collections.diagnosticsUsers

    if (!diagnosticsUsers) {
      return res.status(400).send('Error in registration: diagnostic undefined')
    }

    const { diagnostic } = req.body

    await diagnosticsUsers.insertOne(diagnostic)

    res.status(200).json({ message: 'Diagnostic Added' })
  } catch (error) {
    next(error)
  } finally {
    if (client) {
      await closeDatabaseConnection(client)
    }
  }
})

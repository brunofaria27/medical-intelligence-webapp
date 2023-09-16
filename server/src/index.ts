import * as express from 'express'
import * as cors from 'cors'

import { Request } from 'express'

import { sequelize } from './services/sequelize'
import { userRouter } from './routers/user-router'
import { authRouter } from './routers/auth-router'
import { productsRouter } from './routers/products-router'
import { postRouter } from './routers/post-router'

const port = process.env.PORT_ADRESS

// Connection to database
const configureSequelize = async () => {
  await sequelize
    .authenticate()
    .then(() => console.log('Database auth ok'))
    .catch(console.log)

  await sequelize
    .sync({ alter: true, force: false, logging: false })
    .then(() => console.log('Database sync ok'))
    .catch(console.log)
}

const main = async () => {
  await configureSequelize()

  const app = express()

  app.use(express.json())
  app.use(cors<Request>())

  app.use('/api/user', userRouter)
  app.use('/api/auth', authRouter)
  app.use('/api/products', productsRouter)
  app.use('/api/posts', postRouter)

  app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
  })
}

main()

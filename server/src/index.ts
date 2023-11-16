import * as express from 'express'
import * as cors from 'cors'

import { Request } from 'express'
import { userRouter } from './routers/user'
import { diagnosticRouter } from './routers/users_diagnostics'
import { authRouter } from './routers/auth'

const app = express()
const port = 8000

app.use(express.json()) 
app.use(cors<Request>())

app.use('/api/user', userRouter)
app.use('/api/auth', authRouter)
app.use('/api/diagnostic', diagnosticRouter)

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})
import * as express from 'express'
import * as cors from 'cors'

import { Request } from 'express'
import { userRouter } from './routers/user'

const app = express()
const port = 8000

app.use(express.json()) 
app.use(cors<Request>())

{/* TODO: endpoints */}
app.use('/api/user', userRouter)

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})
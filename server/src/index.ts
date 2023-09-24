import * as express from 'express'
import * as cors from 'cors'

import { Request } from 'express'
import { userRouter } from './routers/user'
import { imgageProcessingRouter } from './routers/image_processing'
import { authRouter } from './routers/auth'

const app = express()
const port = 8000

app.use(express.json()) 
app.use(cors<Request>())

{/* TODO: endpoints */}
app.use('/api/user', userRouter)
app.use('/api/imageProcessing', imgageProcessingRouter)
app.use('/api/auth', authRouter)

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})
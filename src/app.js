import express, { json } from 'express'
import cors from 'cors'

// route import
import userRouter from './routes/user.js'

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
  credentials: true
}

export default function createApp ({ UserModel }) {
  const app = express()
  app.use(json())
  app.disable('x-powered-by')
  app.use(cors(corsOptions))

  app.use('/', userRouter({ UserModel }))

  const PORT = process.env.PORT ?? 3000
  app.listen(PORT, (req, res) => {
    console.log(`server listening on port http://localhost:${PORT}`)
  })
}

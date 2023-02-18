/**
 * Required External Modules
 */
import * as dotenv from 'dotenv'
import express, { Express } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import routes from './api/v1/routes'
import { connectDB } from './api/v1/config'
import { errorHandler } from './api/v1/middlewares'

dotenv.config()

const PORT: number = parseInt(process.env.PORT as string, 10)
/**
 * App Variables
 */
if (!process.env.PORT) {
  process.exit(1)
}

const app: Express = express()

/**
 *  App Configuration
 */
app.use(helmet())
app.use(
  cors({
    origin: process.env.FRONTEND_URL as string,
    credentials: true as boolean,
    optionsSuccessStatus: 200 as number,
  })
)
app.use(express.json())
app.use(cookieParser())
app.use(routes)
app.use(errorHandler)

/**
 * Server Activation
 */
const startApp = async () => {
  try {
    await connectDB()
    console.log(`MongoDB connected`)

    app.listen(PORT, () => {
      console.log(`App Listening on port ${PORT}`)
    })
  } catch (error) {
    console.log(error)
  }
}

startApp()

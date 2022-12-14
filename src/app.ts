/**
 * Required External Modules
 */
import * as dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import { connectDB } from './api/v1/config'

dotenv.config()

/**
 * App Variables
 */
if (!process.env.PORT) {
  process.exit(1)
}

const PORT: number = parseInt(process.env.PORT as string, 10)

const app = express()

/**
 *  App Configuration
 */
// Enabling cors
const corsOptions = {
  origin: process.env.FRONTEND_URL as string,
  credentials: true as boolean,
  optionsSuccessStatus: 200 as number, // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(helmet())
app.use(cors(corsOptions))
app.use(express.json())

/**
 * Server Activation
 */
const start = async () => {
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

start()

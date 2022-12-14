/**
 * Required External Modules
 */
import * as dotenv from 'dotenv'
import express, { Express } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import routes from './api/v1/routes'
import { corsOptions, startApp } from './api/v1/config'
import { errorHandler } from './api/v1/middlewares'

dotenv.config()

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
app.use(cors(corsOptions))
app.use(express.json())
app.use(routes)
app.use(errorHandler)

/**
 * Server Activation
 */
startApp()

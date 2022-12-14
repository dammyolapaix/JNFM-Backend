import express, { Express } from 'express'
import * as dotenv from 'dotenv'
import connectDB from './db'

dotenv.config()

const PORT: number = parseInt(process.env.PORT as string, 10)

console.log(PORT)

const app: Express = express()

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

export default startApp

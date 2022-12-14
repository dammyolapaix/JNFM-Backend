import mongoose from 'mongoose'

const connectDB = () => {
  const DB_URI = process.env.MONGO_URI as string
  const dbOptions: object = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }

  return mongoose.connect(DB_URI, dbOptions)
}

export default connectDB

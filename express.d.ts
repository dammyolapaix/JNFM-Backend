import { Request } from 'express'
import { IUser } from './src/api/v1/features/user'

declare module 'express-serve-static-core' {
  interface Request {
    user?: IUser
  }
}

import { Request } from 'express'
import { Types } from 'mongoose'

export enum UserRole {
  Admin = 'Admin',
  Leader = 'Leader',
}

export interface IBaseUser {
  firstName?: string
  lastName: string
  otherNames?: string | undefined
  fullName: string
  email: string
  password: string
  roles: Array<UserRole>
}

export default interface IUser extends IBaseUser {
  _id: Types.ObjectId
}

export interface IRequestWithUer extends Request {
  user?: IUser
}

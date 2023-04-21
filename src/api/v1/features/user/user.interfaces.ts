import { Types } from 'mongoose'

export interface IBaseUser {
  firstName?: string
  lastName: string
  otherNames?: string | undefined
  fullName: string
  email: string
  password: string
  role: 'Admin' | 'User'
}

export default interface IMember extends IBaseUser {
  _id: Types.ObjectId
}

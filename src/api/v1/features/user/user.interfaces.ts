import { Types } from 'mongoose'
import { IRole } from './role'

export interface IBaseUser {
  firstName?: string
  lastName: string
  otherNames?: string | undefined
  fullName: string
  email: string
  password: string
  role?: IRole
}

export default interface IMember extends IBaseUser {
  _id: Types.ObjectId
}

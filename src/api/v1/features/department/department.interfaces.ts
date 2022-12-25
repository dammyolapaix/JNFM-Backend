import { Types } from 'mongoose'
import { IMember } from '../member'

export interface IBaseDepartment {
  name: string
  members: IMember[]
}

export default interface IDepartment extends IBaseDepartment {
  _id: Types.ObjectId
}

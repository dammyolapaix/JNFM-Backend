import { Types } from 'mongoose'
import { IMember } from '../member'

export interface IBaseDepartment {
  name: string
  members?: {
    member: IMember | IMember['_id']
  }[]
}

export default interface IDepartment extends IBaseDepartment {
  _id: Types.ObjectId
}

export interface IReqDepartment {
  member: IMember['_id']
}

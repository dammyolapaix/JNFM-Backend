import { Types } from 'mongoose'
import { IMember } from '../member'

export interface IBaseWelfare {
  date: Date
  member: IMember | IMember['_id']
  amount: number
}

export default interface IWelfare extends IBaseWelfare {
  _id: Types.ObjectId
}

export interface IReqWelfare {
  date: Date
  member: IMember['_id']
  amount: number
}

import { Types } from 'mongoose'
import { IMember } from '../member'

export interface IBaseTithe {
  date: Date
  member: IMember | IMember['_id']
  amount: number
}

export default interface ITithe extends IBaseTithe {
  _id: Types.ObjectId
}

export interface IReqTithe {
  date: Date
  member: IMember['_id']
  amount: number
}

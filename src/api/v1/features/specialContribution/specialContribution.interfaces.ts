import { Types } from 'mongoose'
import { IMember } from '../member'

export interface IBaseSpecialContribution {
  date: Date
  member: IMember | IMember['_id']
  amount: number
  items?: {
    item: {
      name: string
    }
  }[]
}

export default interface ISpecialContribution extends IBaseSpecialContribution {
  _id: Types.ObjectId
}

export interface IReqSpecialContribution {
  date: Date
  member: IMember['_id']
  amount: number
  items?: {
    item: {
      name: string
    }
  }[]
}

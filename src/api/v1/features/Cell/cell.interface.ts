import { Types } from 'mongoose'
import { IMember } from '../member'

export interface IBaseCell {
  name: string
  members?: {
    member: IMember | IMember['_id']
  }[]
}

export default interface ICell extends IBaseCell {
  _id: Types.ObjectId
}

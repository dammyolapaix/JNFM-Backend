import { Types } from 'mongoose'
import { IMember } from '../member'

export interface IBaseCell {
  name: string
}

export default interface ICell extends IBaseCell {
  _id: Types.ObjectId
}

export interface IReqCell {
  member: IMember['_id']
}

export interface IQueryCell {
  name?: string
  'members.member'?: IMember | IMember['_id']
}

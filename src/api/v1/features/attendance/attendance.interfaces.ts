import { Types } from 'mongoose'
import { IChurchService } from '../churchService'
import { IMember } from '../member'

export interface IBaseAttendance {
  member: IMember
  churchService: IChurchService
}

export default interface IAttendance extends IBaseAttendance {
  _id: Types.ObjectId
}

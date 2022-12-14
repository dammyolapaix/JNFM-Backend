import { Types } from 'mongoose'

export interface IBaseChurchService {
  date: Date
  startsAt?: Date | undefined
  endsAt?: Date | undefined
}

export default interface IChurchService extends IBaseChurchService {
  _id: Types.ObjectId
}

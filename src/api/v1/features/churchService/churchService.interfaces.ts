import { Types } from 'mongoose'
import { IChurchServiceType } from './churchServiceType'

export interface IBaseChurchService {
  date: Date
  churchServiceType: IChurchServiceType
  startsAt?: Date | undefined
  endsAt?: Date | undefined
}

export default interface IChurchService extends IBaseChurchService {
  _id: Types.ObjectId
}

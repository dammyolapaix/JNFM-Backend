import { Types } from 'mongoose'

export interface IBaseChurchServiceType {
  name: string
}

export default interface IChurchServiceType extends IBaseChurchServiceType {
  _id: Types.ObjectId
}

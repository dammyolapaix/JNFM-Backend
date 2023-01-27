import { Types } from 'mongoose'

export interface IBaseOfferingType {
  name: string
}

export default interface IOfferingType extends IBaseOfferingType {
  _id: Types.ObjectId
}

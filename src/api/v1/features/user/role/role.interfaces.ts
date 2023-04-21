import { Types } from 'mongoose'

export interface IBaseRole {
  name: 'Admin' | 'Leader'
}

export default interface IRole extends IBaseRole {
  _id: Types.ObjectId
}

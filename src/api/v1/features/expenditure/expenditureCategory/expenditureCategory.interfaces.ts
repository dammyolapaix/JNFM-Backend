import { Types } from 'mongoose'

export interface IBaseExpenditureCategory {
  name: string
}

export default interface IExpenditureCategory extends IBaseExpenditureCategory {
  _id: Types.ObjectId
}

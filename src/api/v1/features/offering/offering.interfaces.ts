import { Types } from 'mongoose'
import { IChurchService } from '../churchService'

export interface IBaseOffering {
  date: Date
  amount: number
  churchService: IChurchService | IChurchService['_id']
}

export default interface IOffering extends IBaseOffering {
  _id: Types.ObjectId
}

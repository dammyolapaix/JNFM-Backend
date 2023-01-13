import { Types } from 'mongoose'
import { IChurchService } from '../churchService'
import { IOfferingType } from './offeringType'

export interface IBaseOffering {
  date: Date
  amount: number
  churchService: IChurchService | IChurchService['_id']
  offeringType: IOfferingType
}

export default interface IOffering extends IBaseOffering {
  _id: Types.ObjectId
}

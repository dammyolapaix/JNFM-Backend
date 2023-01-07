import { Types } from 'mongoose'
import { IChurchService } from '../churchService'

export interface IBaseExpenditure {
  date: Date
  amount: number
  naration: string
  churchService?: IChurchService | IChurchService['_id']
}

export default interface IExpenditure extends IBaseExpenditure {
  _id: Types.ObjectId
}

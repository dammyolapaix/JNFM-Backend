import { Types } from 'mongoose'
import { IChurchService } from '../churchService'
import { IExpenditureCategory } from './expenditureCategory'

export interface IBaseExpenditure {
  date: Date
  amount: number
  naration: string
  expenditureCategory: IExpenditureCategory | IExpenditureCategory['_id']
  churchService?: IChurchService | IChurchService['_id']
}

export default interface IExpenditure extends IBaseExpenditure {
  _id: Types.ObjectId
}

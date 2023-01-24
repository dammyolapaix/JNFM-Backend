import { Types } from 'mongoose'
import { IOffering } from '../offering'
import { ISpecialContribution } from '../specialContribution'
import { ITithe } from '../tithe'
import { IWelfare } from '../welfare'

export interface IBaseCashBook {
  date: Date
  amount: number
  naration: string
  pvNumber?: string
  chequeNumber?: string
  account?: {
    offering?: IOffering | IOffering['_id'] | undefined
    welfare?: IWelfare | IWelfare['_id'] | undefined
    tithe?: ITithe | ITithe['_id'] | undefined
    specialContribution?:
      | ISpecialContribution
      | ISpecialContribution['_id']
      | undefined
  }
  debitCredit: 'Credit' | 'Debit'
  // balance: number
}

export default interface ICashBook extends IBaseCashBook {
  _id: Types.ObjectId
}

interface IBalance {
  _id: null
  balance: number
}
interface ITotalIncome {
  _id: null
  totalIncome: number
}
interface ITotalExpenditure {
  _id: null
  totalExpenditure: number
}

export interface ITotalCashBook {
  balance: IBalance[]
  totalIncome: ITotalIncome[]
  totalExpenditure: ITotalExpenditure[]
}

export interface ICashBookQuery {
  date?: Date
  amount?: number
  debitCredit?: 'Credit' | 'Debit'
  select?: string
  sort?: string
}

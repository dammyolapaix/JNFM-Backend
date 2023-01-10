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

import { Types } from 'mongoose'
import { IOffering } from '../offering'
import { ISpecialContribution } from '../specialContribution'
import { ITithe } from '../tithe'
import { IWelfare } from '../welfare'

export interface IBaseIncome {
  date: Date
  amount: number
  naration: string
  source: {
    offering?: IOffering | IOffering['_id'] | undefined
    welfare?: IWelfare | IWelfare['_id'] | undefined
    tithe?: ITithe | ITithe['_id'] | undefined
    specialContribution?:
      | ISpecialContribution
      | ISpecialContribution['_id']
      | undefined
  }
}

export default interface IIncome extends IBaseIncome {
  _id: Types.ObjectId
}

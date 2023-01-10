import { Schema, model } from 'mongoose'
import { IIncome } from './index'

const IncomeSchema = new Schema<IIncome>(
  {
    date: {
      type: Date,
      required: [true, 'The date is required'],
    },
    amount: {
      type: Number,
      required: [true, 'The amount is required'],
    },
    naration: {
      type: String,
      trim: true,
      required: [true, 'The naration is required'],
    },
    source: {
      offering: {
        type: Schema.Types.ObjectId,
        ref: 'Offering',
      },
      welfare: {
        type: Schema.Types.ObjectId,
        ref: 'Welfare',
      },
      tithe: {
        type: Schema.Types.ObjectId,
        ref: 'Tithe',
      },
      specialContribution: {
        type: Schema.Types.ObjectId,
        ref: 'SpecialContribution',
      },
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

const Income = model<IIncome>('Income', IncomeSchema)

export default Income

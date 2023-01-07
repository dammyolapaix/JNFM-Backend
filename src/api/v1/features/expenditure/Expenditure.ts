import { Schema, model } from 'mongoose'
import { IExpenditure } from './index'

const ExpenditureSchema = new Schema<IExpenditure>(
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
    churchService: {
      type: Schema.Types.ObjectId,
      ref: 'ChurchService',
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

const Expenditure = model<IExpenditure>('Expenditure', ExpenditureSchema)

export default Expenditure

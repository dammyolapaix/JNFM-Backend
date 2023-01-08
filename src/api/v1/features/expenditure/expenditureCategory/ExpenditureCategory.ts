import { Schema, model } from 'mongoose'
import { IExpenditureCategory } from './index'

const ExpenditureCategorySchema = new Schema<IExpenditureCategory>(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'The name is required'],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

const ExpenditureCategory = model<IExpenditureCategory>(
  'ExpenditureCategory',
  ExpenditureCategorySchema
)

export default ExpenditureCategory

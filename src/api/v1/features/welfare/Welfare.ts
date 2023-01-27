import { Schema, model } from 'mongoose'
import { IWelfare } from './index'

const WelfareSchema = new Schema<IWelfare>(
  {
    date: {
      type: Date,
      required: [true, 'The date is required'],
    },
    amount: {
      type: Number,
      required: [true, 'The amount is required'],
    },
    member: {
      type: Schema.Types.ObjectId,
      ref: 'Member',
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

const Welfare = model<IWelfare>('Welfare', WelfareSchema)

export default Welfare

import { Schema, model } from 'mongoose'
import { ITithe } from './index'

const TitheSchema = new Schema<ITithe>(
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
      required: [true, 'The member is required'],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

const Tithe = model<ITithe>('Tithe', TitheSchema)

export default Tithe

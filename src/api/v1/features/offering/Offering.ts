import { Schema, model } from 'mongoose'
import { IOffering } from './index'

const OfferingSchema = new Schema<IOffering>(
  {
    date: {
      type: Date,
      required: [true, 'The date is required'],
    },
    amount: {
      type: Number,
      required: [true, 'The amount is required'],
    },
    churchService: {
      type: Schema.Types.ObjectId,
      ref: 'ChurchService',
      required: [true, 'The Church Service is required'],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

const Offering = model<IOffering>('Offering', OfferingSchema)

export default Offering

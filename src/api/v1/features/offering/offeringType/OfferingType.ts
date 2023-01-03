import { Schema, model } from 'mongoose'
import { IOfferingType } from './index'

const OfferingTypeSchema = new Schema<IOfferingType>(
  {
    name: {
      type: String,
      unique: true,
      required: [true, 'The name is required'],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

const OfferingType = model<IOfferingType>('OfferingType', OfferingTypeSchema)

export default OfferingType

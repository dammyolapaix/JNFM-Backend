import { Schema, model } from 'mongoose'
import { IChurchServiceType } from './index'

const ChurchServiceTypeSchema = new Schema<IChurchServiceType>(
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

const ChurchServiceType = model<IChurchServiceType>(
  'ChurchServiceType',
  ChurchServiceTypeSchema
)

export default ChurchServiceType

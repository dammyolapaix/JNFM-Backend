import { Schema, model } from 'mongoose'
import { IChurchService } from './index'

const ChurchServiceSchema = new Schema<IChurchService>(
  {
    date: {
      type: Date,
      required: [true, 'The date of the church service is required'],
    },
    startsAt: {
      type: Date,
    },
    endsAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

const ChurchService = model<IChurchService>(
  'ChurchService',
  ChurchServiceSchema
)

export default ChurchService

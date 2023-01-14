import { Schema, model } from 'mongoose'
import { IChurchService } from './index'

const ChurchServiceSchema = new Schema<IChurchService>(
  {
    date: {
      type: Date,
      required: [true, 'The date of the church service is required'],
    },
    churchServiceType: {
      type: Schema.Types.ObjectId,
      ref: 'ChurchServiceType',
      required: [true, 'The church service type is required'],
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

ChurchServiceSchema.virtual('attendances', {
  ref: 'Attendance',
  localField: '_id',
  foreignField: 'churchService',
})

ChurchServiceSchema.virtual('offerings', {
  ref: 'Offering',
  localField: '_id',
  foreignField: 'churchService',
})

ChurchServiceSchema.virtual('expenditures', {
  ref: 'Expenditure',
  localField: '_id',
  foreignField: 'churchService',
})

const ChurchService = model<IChurchService>(
  'ChurchService',
  ChurchServiceSchema
)

export default ChurchService

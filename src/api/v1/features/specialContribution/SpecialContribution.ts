import { Schema, model } from 'mongoose'
import { ISpecialContribution } from './index'

const SpecialContributionSchema = new Schema<ISpecialContribution>(
  {
    date: {
      type: Date,
      required: [true, 'The date is required'],
    },
    member: {
      type: Schema.Types.ObjectId,
      ref: 'Member',
    },
    amount: {
      type: Number,
    },
    items: [
      {
        item: {
          name: {
            type: String,
          },
        },
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

const SpecialContribution = model<ISpecialContribution>(
  'SpecialContribution',
  SpecialContributionSchema
)

export default SpecialContribution

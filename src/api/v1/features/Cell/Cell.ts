import { Schema, model } from 'mongoose'
import { ICell } from './index'

const CellSchema = new Schema<ICell>(
  {
    name: {
      type: String,
      required: [true, 'The church service is required'],
      unique: true,
      trim: true,
    },
    members: [
      {
        member: {
          type: Schema.Types.ObjectId,
          ref: 'Member',
          unique: true,
          sparse: true,
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

const Cell = model<ICell>('Cell', CellSchema)

export default Cell

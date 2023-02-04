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
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

CellSchema.virtual('members', {
  ref: 'Member',
  localField: '_id',
  foreignField: 'cell.cell',
})

const Cell = model<ICell>('Cell', CellSchema)

export default Cell

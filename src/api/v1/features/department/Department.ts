import { Schema, model } from 'mongoose'
import { IDepartment } from './index'

const DepartmentSchema = new Schema<IDepartment>(
  {
    name: {
      type: String,
      required: [true, 'The church service is required'],
      unique: true,
      trim: true,
    },
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Member',
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

const Department = model<IDepartment>('Department', DepartmentSchema)

export default Department

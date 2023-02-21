import { Schema, model } from 'mongoose'
import { IRole } from './index'

const RoleSchema = new Schema<IRole>(
  {
    name: {
      type: String,
      trim: true,
      unique: true,
      enum: {
        values: ['Admin', 'Leader'],
        message: '{VALUE} is not supported',
      },
      required: [true, 'The name field is required'],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

const Role = model<IRole>('Role', RoleSchema)

export default Role

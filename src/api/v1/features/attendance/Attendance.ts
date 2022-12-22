import { Schema, model } from 'mongoose'
import { IAttendance } from './index'

const AttendanceSchema = new Schema<IAttendance>(
  {
    member: {
      type: Schema.Types.ObjectId,
      ref: 'Member',
      required: [true, 'The member is required'],
    },
    churchService: {
      type: Schema.Types.ObjectId,
      ref: 'ChurchService',
      required: [true, 'The church service is required'],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

const Attendance = model<IAttendance>('Attendance', AttendanceSchema)

export default Attendance

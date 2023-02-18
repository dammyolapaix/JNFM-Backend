import { Schema, model } from 'mongoose'
import { IUser } from './index'

const UserSchema = new Schema<IUser>(
  {
    firstName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
      required: [true, 'The last name or surname is required'],
    },
    otherNames: {
      type: String,
      trim: true,
    },
    fullName: {
      type: String,
      trim: true,
      required: [true, 'The fullname of the member is required'],
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Email is not valid, please add a valid email',
      ],
      lowercase: true,
      required: [true, 'The email is required'],
    },
    password: {
      type: String,
      trim: true,
      required: [true, 'The password is required'],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

const User = model<IUser>('User', UserSchema)

export default User

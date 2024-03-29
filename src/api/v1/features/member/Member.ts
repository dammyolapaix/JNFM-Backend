import { Schema, model } from 'mongoose'
import { IMember } from './index'

const MemberSchema = new Schema<IMember>(
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
    gender: {
      type: String,
      enum: {
        values: ['Male', 'Female'],
        message: '{VALUE} is not supported',
      },
      required: [true, "Member's gender required"],
    },
    dateOfBirth: {
      type: Date,
    },
    maritalStatus: {
      type: String,
      enum: {
        values: ['Single', 'Married', 'Divorced', 'Widowed'],
        message: '{VALUE} is not supported',
      },
    },
    occupation: {
      type: String,
      trim: true,
    },
    postalAddress: {
      type: String,
      trim: true,
    },
    homeAddress: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      // NOTE : The sparse property in email, is what tells the database to allow null values which will later be filled with unique values.
      sparse: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Email is not valid, please add a valid email',
      ],
      lowercase: true,
    },
    phoneNumber: {
      type: String,
      trim: true,
    },
    nearestRelative: {
      name: {
        type: String,
        trim: true,
      },
      relationship: {
        type: String,
        trim: true,
      },
      phoneNumber: {
        type: String,
        trim: true,
      },
    },
    cell: {
      cell: {
        type: Schema.Types.ObjectId,
        ref: 'Cell',
      },
      dateJoined: {
        type: Date,
      },
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

MemberSchema.virtual('attendances', {
  ref: 'Attendance',
  localField: '_id',
  foreignField: 'member',
})

MemberSchema.virtual('departments', {
  ref: 'Department',
  localField: '_id',
  foreignField: 'members.member',
})

MemberSchema.virtual('welfares', {
  ref: 'Welfare',
  localField: '_id',
  foreignField: 'member',
})

MemberSchema.virtual('tithes', {
  ref: 'Tithe',
  localField: '_id',
  foreignField: 'member',
})

const Member = model<IMember>('Member', MemberSchema)

export default Member

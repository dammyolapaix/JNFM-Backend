import { Types } from 'mongoose'
import { ICell } from '../cell'

export interface IBaseMember {
  firstName: string
  lastName: string
  otherNames?: string | undefined
  fullName: string
  gender: 'Male' | 'Female'
  dateOfBirth?: Date
  maritalStatus?: 'Single' | 'Married' | 'Divorced' | 'Widowed'
  occupation?: string | undefined
  postalAddress?: string | undefined
  homeAddress?: string | undefined
  email?: string | undefined
  phoneNumbers?: {
    countryCode: number
    number: number
  }[]
  nearestRelative?: {
    name?: string
    relationship?: string
    phoneNumber?: {
      countryCode: number
      number: number
    }
  }
  dateJoined?: Date
  cell: {
    cell: ICell
    dateJoined?: Date
  }
}

export default interface IMember extends IBaseMember {
  _id: Types.ObjectId
}

export interface IMemberQuery {
  fullName?: string
  gender?: 'Male' | 'Female'
  maritalStatus?: 'Single' | 'Married' | 'Divorced' | 'Widowed'
  dateOfBirth?: Date
  select?: string
  sort?: string
  page?: string
  limit?: string
}

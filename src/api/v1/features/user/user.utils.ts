import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { IUser } from './index'

export const getHashedPassword = async (
  password: IUser['password']
): Promise<string> => {
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  return hashedPassword
}

export const getSignedJwtToken = async (userId: IUser['_id']) => {
  try {
    if (process.env.JWT_SECRET && process.env.JWT_EXPIRES_IN) {
      return await jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
      })
    }
  } catch (error) {
    return error
  }
}

export const getComparedPassword = async (
  enteredPassword: IUser['password'],
  userPassword: IUser['password']
): Promise<boolean> => await bcrypt.compare(enteredPassword, userPassword)

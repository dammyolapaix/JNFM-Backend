import bcrypt from 'bcryptjs'
import { IUser } from './index'

export const getHashedPassword = async (
  password: IUser['password']
): Promise<string> => {
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  return hashedPassword
}

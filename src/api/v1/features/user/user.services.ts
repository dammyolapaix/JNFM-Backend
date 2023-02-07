import {
  getHashedPassword,
  getSignedJwtToken,
  IBaseUser,
  IUser,
  User,
} from './index'

export const getUsers = () => User.find()

export const getSingleUserByEmail = (email: IUser['email']) =>
  User.findOne({ email }).select('+password')

export const getSingleUserById = (userId: IUser['_id']) => User.findById(userId)

export const addUser = (user: IBaseUser) => User.create(user)

export const registerUser = async (user: IBaseUser) => {
  user.password = await getHashedPassword(user.password)
  const newUser = await addUser(user)

  const token = await getSignedJwtToken(newUser._id)

  return token
}

export const editUser = (userId: IUser['_id'], user: IBaseUser) =>
  User.findByIdAndUpdate(userId, user, { new: true, runValidators: true })

export const deleteUser = (userId: IUser['_id']) =>
  User.findByIdAndDelete(userId)

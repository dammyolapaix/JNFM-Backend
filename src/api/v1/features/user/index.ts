import User from './User'
import IUser, { IBaseUser } from './user.interfaces'
import {
  addUser,
  deleteUser,
  editUser,
  getSingleUserByEmail,
  getSingleUserById,
  getUsers,
  registerUser,
} from './user.services'
import { registerUserHandler } from './user.controllers'
import userRoutes from './user.routes'
import { getHashedPassword } from './user.utils'

export { User }

export { IUser, IBaseUser }

export {
  addUser,
  deleteUser,
  editUser,
  getSingleUserByEmail,
  getSingleUserById,
  getUsers,
  registerUser,
}

export { registerUserHandler }
export { userRoutes }

export { getHashedPassword }

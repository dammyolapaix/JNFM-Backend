import User from './User'
import IUser, { IBaseUser, UserRole } from './user.interfaces'
import {
  addUser,
  deleteUser,
  editUser,
  getSingleUserByEmail,
  getSingleUserById,
  getUsers,
  registerUser,
} from './user.services'
import { registerUserHandler, loginUserHandler } from './user.controllers'
import userRoutes from './user.routes'
import {
  getHashedPassword,
  getSignedJwtToken,
  getComparedPassword,
  getVerifiedJwtToken,
} from './user.utils'

import { authorizedRoles, protectRoute } from './user.middlewares'

export { User }

export { IUser, IBaseUser, UserRole }

export {
  addUser,
  deleteUser,
  editUser,
  getSingleUserByEmail,
  getSingleUserById,
  getUsers,
  registerUser,
}

export { registerUserHandler, loginUserHandler }
export { userRoutes }

export {
  getHashedPassword,
  getSignedJwtToken,
  getComparedPassword,
  getVerifiedJwtToken,
}

export { authorizedRoles, protectRoute }

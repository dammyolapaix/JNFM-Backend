import { NextFunction, Request, Response } from 'express'
import { asyncHandler } from '../../middlewares'
import { IBaseUser } from './user.interfaces'
import { addUser } from './user.services'
import { getHashedPassword } from './user.utils'

export const registerUserHandler = asyncHandler(
  async (
    req: Request<{}, {}, IBaseUser, {}>,
    res: Response,
    next: NextFunction
  ) => {
    req.body.password = await getHashedPassword(req.body.password)

    const user = await addUser(req.body)

    return res.status(201).json({ success: true, user })
  }
)

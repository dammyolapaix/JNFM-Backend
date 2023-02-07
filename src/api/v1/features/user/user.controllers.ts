import { NextFunction, Request, Response } from 'express'
import { asyncHandler } from '../../middlewares'
import { IBaseUser } from './user.interfaces'
import { registerUser } from './user.services'

export const registerUserHandler = asyncHandler(
  async (
    req: Request<{}, {}, IBaseUser, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const token = await registerUser(req.body)

    return res.status(201).json({ success: true, token })
  }
)

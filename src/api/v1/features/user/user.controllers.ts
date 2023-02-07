import { NextFunction, Request, Response } from 'express'
import { asyncHandler } from '../../middlewares'
import { ErrorResponse } from '../../utils'
import { IBaseUser } from './user.interfaces'
import { getSingleUserByEmail, registerUser } from './user.services'
import { getComparedPassword, getSignedJwtToken } from './user.utils'

export const registerUserHandler = asyncHandler(
  async (
    req: Request<{}, {}, IBaseUser, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const token = await registerUser(req.body)

    return res
      .status(201)
      .cookie('token', token, {
        expires: new Date(
          Date.now() + Number(process.env.COOKIE_EXPIRES) * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : undefined,
      })
      .json({ success: true, token })
  }
)

export const loginUserHandler = asyncHandler(
  async (
    req: Request<
      {},
      {},
      { email: IBaseUser['email']; password: IBaseUser['password'] },
      {}
    >,
    res: Response,
    next: NextFunction
  ) => {
    const { email, password } = req.body

    //  Validate email and password
    if (!email || !password) {
      return next(
        new ErrorResponse('Please enter an email and/or a password', 400)
      )
    }

    // find user by email entered and check for user
    const user = await getSingleUserByEmail(email)
    if (!user) {
      return next(new ErrorResponse('Invalid Credentials', 401))
    }

    // compare password
    const comparedPassword: boolean = await getComparedPassword(
      password,
      user.password
    )

    if (!comparedPassword) {
      return next(new ErrorResponse('Invalid Credentials', 401))
    }

    const token = await getSignedJwtToken(user._id)

    return res
      .status(200)
      .cookie('token', token, {
        expires: new Date(
          Date.now() + Number(process.env.COOKIE_EXPIRES) * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : undefined,
      })
      .json({ success: true, token })
  }
)

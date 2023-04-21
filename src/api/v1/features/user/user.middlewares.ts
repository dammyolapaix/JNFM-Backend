import { NextFunction, Request, Response } from 'express'
import { IUser, getSingleUserById } from './index'
import { asyncHandler } from '../../middlewares'
import { ErrorResponse } from '../../utils'
import { getVerifiedJwtToken } from './user.utils'

export const protectRoute = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let token: string | undefined

    if (req.cookies.token) {
      token = req.cookies.token
    }

    // Make sure token exist
    if (!token) {
      return next(new ErrorResponse('Access Denied', 401))
    }

    if (token && process.env.JWT_SECRET) {
      try {
        // Verify token
        const { payload } = await getVerifiedJwtToken(
          token,
          process.env.JWT_SECRET
        )

        // @ts-ignore
        req.user = await getSingleUserById(payload.id)
        next()
      } catch (error) {
        next(new ErrorResponse('Access Denied', 401))
      }
    } else {
      return next(new ErrorResponse('Access Denied', 401))
    }
  }
)

export const authorizedRoles = (...roles: IUser['role'][]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorResponse(
          // @ts-ignore
          `User role "${req.user.role}" is not authorized to perform this action`,
          403
        )
      )
    }
    next()
  }
}

import { NextFunction, Request, Response } from 'express'
import { IRequestWithUer, IUser, UserRole, getSingleUserById } from './index'
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

export const authorizedRoles = (...roles: IUser['roles']) => {
  return (req: IRequestWithUer, res: Response, next: NextFunction) => {
    const userRoles = req.user?.roles || []

    if (userRoles.includes(UserRole.Admin) && roles.length === 0) {
      next()
    } else if (
      userRoles.includes(UserRole.Admin) ||
      roles.some((role) => userRoles.includes(role))
    ) {
      next()
    } else {
      return next(new ErrorResponse('Access Denied', 403))
    }
  }
}

import { NextFunction, Request, Response } from 'express'
import { IRequestWithUer, IUser, getSingleUserById } from './index'
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

export const authorizedRoles = (allowedRoles: IUser['roles']) => {
  return (req: IRequestWithUer, res: Response, next: NextFunction) => {
    const user = req.user
    if (user && allowedRoles.some((role) => user.roles.includes(role))) {
      next() // User has one of the allowed roles, allow access to route
    } else {
      res.status(403).json({ message: 'Access denied' })
    }
  }
}

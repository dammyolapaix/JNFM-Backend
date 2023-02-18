import { NextFunction, Request, Response } from 'express'
import { getSingleUserById } from './index'
import { asyncHandler } from '../../middlewares'
import { ErrorResponse } from '../../utils'
import { getVerifiedJwtToken } from './user.utils'

export const protectRoute = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let token

    if (req.cookies.token) {
      token = req.cookies.token
    }

    // Make sure token exist
    if (!token) {
      next(new ErrorResponse('Access Denied', 401))
    }

    try {
      // Verify token
      if (process.env.JWT_SECRET) {
        const { payload } = await getVerifiedJwtToken(
          token,
          process.env.JWT_SECRET
        )

        // @ts-ignore
        req.user = await getSingleUserById(payload.id)
        next()
      }
    } catch (error) {
      next(new ErrorResponse('Access Denied', 401))
    }
  }
)

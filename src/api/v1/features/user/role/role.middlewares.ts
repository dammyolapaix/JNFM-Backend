import { NextFunction, Request, Response } from 'express'
import { ErrorResponse } from '../../../utils'
import IRole from './role.interfaces'

export const authorizedRoles = (...roles: IRole['name'][]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    if (!roles.includes(req.user.role.name)) {
      return next(new ErrorResponse('Access Denied', 403))
    }
    next()
  }
}

import { Request, Response, NextFunction } from 'express'
import { asyncHandler } from '../../../middlewares'
import { ErrorResponse } from '../../../utils'
import {
  addRole,
  deleteRole,
  editRole,
  getRoles,
  getSingleRoleById,
  IBaseRole,
  IRole,
} from './index'

export const getRolesHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const rolea = await getRoles()

    return res.status(200).json({ success: true, count: rolea.length, rolea })
  }
)

export const getSingleRoleByIdHandler = asyncHandler(
  async (
    req: Request<{ id: IRole['_id'] }, {}, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const role = await getSingleRoleById(req.params.id)

    if (!role) {
      return next(
        new ErrorResponse(`Role with the id of ${req.params.id} not found`, 404)
      )
    }

    return res.status(200).json({
      success: true,
      role,
    })
  }
)

export const addRoleHandler = asyncHandler(
  async (
    req: Request<{}, {}, IBaseRole, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const role = await addRole(req.body)

    return res.status(201).json({ success: true, role })
  }
)

export const editRoleHandler = asyncHandler(
  async (
    req: Request<{ id: IRole['_id'] }, {}, IRole, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const role = await editRole(req.params.id, req.body)

    if (!role) {
      return next(
        new ErrorResponse(`Role with the id of ${req.params.id} not found`, 404)
      )
    }

    return res.status(200).json({ success: true, role })
  }
)

export const deleteRoleHandler = asyncHandler(
  async (
    req: Request<{ id: IRole['_id'] }, {}, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const role = await deleteRole(req.params.id)

    if (!role) {
      return next(
        new ErrorResponse(`Role with the id of ${req.params.id} not found`, 404)
      )
    }

    res.status(200).json({ success: true, role })
  }
)

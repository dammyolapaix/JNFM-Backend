import { Request, Response, NextFunction } from 'express'
import {
  addTithe,
  deleteTithe,
  editTithe,
  getTithes,
  getSingleTitheById,
  ITithe,
  IReqTithe,
} from './index'
import { asyncHandler } from '../../middlewares'
import { ErrorResponse } from '../../utils'
import { getSingleMemberById, IMember } from '../member'

export const getTithesHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const tithes = await getTithes().populate<{ member: IMember }>({
      path: 'member',
      select: 'fullName',
    })

    return res.status(200).json({ success: true, count: tithes.length, tithes })
  }
)

export const getSingleTitheByIdHandler = asyncHandler(
  async (
    req: Request<{ id: ITithe['_id'] }, {}, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const tithe = await getSingleTitheById(req.params.id).populate<{
      member: IMember
    }>({
      path: 'member',
      select: 'fullName',
    })

    if (!tithe) {
      return next(
        new ErrorResponse(
          `Tithe with the id of ${req.params.id} not found`,
          404
        )
      )
    }

    return res.status(200).json({
      success: true,
      tithe,
    })
  }
)

export const addTitheHandler = asyncHandler(
  async (
    req: Request<{}, {}, IReqTithe, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const { member } = req.body

    const tithe = await addTithe(req.body)

    const getMember = await getSingleMemberById(member)

    if (!getMember) {
      return next(
        new ErrorResponse(`Member with the id of ${member} not found`, 404)
      )
    }

    return res.status(201).json({ success: true, tithe })
  }
)

export const editTitheHandler = asyncHandler(
  async (
    req: Request<{ id: ITithe['_id'] }, {}, ITithe, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const tithe = await editTithe(req.params.id, req.body)

    if (!tithe) {
      return next(
        new ErrorResponse(
          `Tithe with the id of ${req.params.id} not found`,
          404
        )
      )
    }

    return res.status(200).json({ success: true, tithe })
  }
)

export const deleteTitheHandler = asyncHandler(
  async (
    req: Request<{ id: ITithe['_id'] }, {}, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const tithe = await deleteTithe(req.params.id)

    if (!tithe) {
      return next(
        new ErrorResponse(
          `Tithe with the id of ${req.params.id} not found`,
          404
        )
      )
    }

    res.status(200).json({ success: true, tithe })
  }
)

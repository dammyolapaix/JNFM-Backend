import { Request, Response, NextFunction } from 'express'
import {
  addCell,
  deleteCell,
  editCell,
  getCells,
  getSingleCellById,
  IBaseCell,
  ICell,
} from './index'
import { asyncHandler } from '../../middlewares'
import { ErrorResponse } from '../../utils'
import { IMember } from '../member'

export const getCellsHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const cells = await getCells().populate<{ members: IMember[] }>({
      path: 'members',
      select: 'fullName',
    })

    return res.status(200).json({ success: true, count: cells.length, cells })
  }
)

export const getSingleCellByIdHandler = asyncHandler(
  async (
    req: Request<{ id: ICell['_id'] }, {}, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const cell = await getSingleCellById(req.params.id).populate<{
      members: IMember[]
    }>({
      path: 'members',
      select: 'fullName',
    })

    if (!cell) {
      return next(
        new ErrorResponse(`Cell with the id of ${req.params.id} not found`, 404)
      )
    }

    return res.status(200).json({
      success: true,
      countMembers: cell.members.length,
      cell,
    })
  }
)

export const addCellHandler = asyncHandler(
  async (
    req: Request<{}, {}, IBaseCell, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const cell = await addCell(req.body)

    return res.status(201).json({ success: true, cell })
  }
)

export const editCellHandler = asyncHandler(
  async (
    req: Request<{ id: ICell['_id'] }, {}, ICell, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const cell = await editCell(req.params.id, req.body)

    if (!cell) {
      return next(
        new ErrorResponse(`Cell with the id of ${req.params.id} not found`, 404)
      )
    }

    return res.status(200).json({ success: true, cell })
  }
)

export const deleteCellHandler = asyncHandler(
  async (
    req: Request<{ id: ICell['_id'] }, {}, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const cell = await deleteCell(req.params.id)

    if (!cell) {
      return next(
        new ErrorResponse(`Cell with the id of ${req.params.id} not found`, 404)
      )
    }

    res.status(200).json({ success: true, cell })
  }
)

import { Request, Response, NextFunction } from 'express'
import {
  addCell,
  addLeaderToCell,
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
import { IUser, getSingleUserById } from '../user'

export const getCellsHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const cells = await getCells().populate<{ members: IMember[] }>({
      path: 'members',
      select: 'fullName gender dateOfBirth cell.dateJoined',
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
      select: 'fullName gender dateOfBirth cell.dateJoined',
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

export const addLeaderToCellHandler = asyncHandler(
  async (
    req: Request<{ id: ICell['_id'] }, {}, IUser, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const cell = await getSingleCellById(req.params.id)

    const user = await getSingleUserById(req.body._id)

    if (!cell) {
      return next(
        new ErrorResponse(`Cell with the id of ${req.params.id} not found`, 404)
      )
    }

    if (!user) {
      return next(
        new ErrorResponse(`User with the id of ${req.body._id} not found`, 404)
      )
    }

    const updatedCell = await addLeaderToCell(cell._id, user)

    return res.status(200).json({
      success: true,
      cell: updatedCell,
    })
  }
)

import { Request, Response, NextFunction } from 'express'
import {
  addCell,
  deleteCell,
  editCell,
  getCells,
  getSingleCell,
  getSingleCellById,
  IBaseCell,
  ICell,
  IReqCell,
} from './index'
import { asyncHandler } from '../../middlewares'
import { ErrorResponse } from '../../utils'
import { getSingleMemberById, IMember } from '../member'

export const getCellsHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const cells = await getCells().populate<{ members: IMember[] }>({
      path: 'members.member',
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
      path: 'members.member',
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

export const addMemberToCellHandler = asyncHandler(
  async (
    req: Request<{ id: ICell['_id'] }, {}, IReqCell, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const { member } = req.body

    const cell = await getSingleCellById(req.params.id)

    const getMember = await getSingleMemberById(member)

    if (!cell) {
      return next(
        new ErrorResponse(`Cell with the id of ${req.params.id} not found`, 404)
      )
    }

    if (!getMember) {
      return next(
        new ErrorResponse(`Member with the id of ${member} not found`, 404)
      )
    }

    const existingMember = await getSingleCell({ 'members.member': member })

    if (existingMember) {
      return next(
        new ErrorResponse(`This member has already being added to a cell`, 400)
      )
    }

    cell.members?.unshift({ member })

    await cell.save()

    res.status(200).json({ success: true, cell })
  }
)

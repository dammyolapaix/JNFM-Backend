import { Request, Response, NextFunction } from 'express'
import {
  addAttendance,
  deleteAttendance,
  editAttendance,
  getAttendances,
  getSingleAttendanceById,
  IBaseAttendance,
  IAttendance,
} from './index'
import { asyncHandler } from '../../middlewares'
import { ErrorResponse } from '../../utils'
import { IChurchService } from '../churchService'
import { IMember } from '../member'

export const getAttendancesHandler = asyncHandler(
  async (
    req: Request<{ churchServiceId: IAttendance['churchService'] }, {}, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const queryObject = { churchService: req.params.churchServiceId }

    const attendances = await getAttendances(
      req.params.churchServiceId && queryObject
    )
      .populate<{ churchService: IChurchService }>({
        path: 'churchService',
      })
      .populate<{ member: IMember }>({
        path: 'member',
      })

    return res
      .status(200)
      .json({ success: true, count: attendances.length, attendances })
  }
)

export const getSingleAttendanceByIdHandler = asyncHandler(
  async (
    req: Request<{ id: IAttendance['_id'] }, {}, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const attendance = await getSingleAttendanceById(req.params.id)
      .populate<{ churchService: IChurchService }>({
        path: 'churchService',
      })
      .populate<{ member: IMember }>({
        path: 'member',
      })

    if (!attendance) {
      return next(
        new ErrorResponse(
          `Attendance with the id of ${req.params.id} not found`,
          404
        )
      )
    }

    return res.status(200).json({ success: true, attendance })
  }
)

export const addAttendanceHandler = asyncHandler(
  async (
    req: Request<
      { churchServiceId: IAttendance['churchService'] },
      {},
      IBaseAttendance,
      {}
    >,
    res: Response,
    next: NextFunction
  ) => {
    req.body.churchService = req.params.churchServiceId
    const attendance = await addAttendance(req.body)

    return res.status(201).json({ success: true, attendance })
  }
)

export const editAttendanceHandler = asyncHandler(
  async (
    req: Request<{ id: IAttendance['_id'] }, {}, IAttendance, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const attendance = await editAttendance(req.params.id, req.body)

    if (!attendance) {
      return next(
        new ErrorResponse(
          `Attendance with the id of ${req.params.id} not found`,
          404
        )
      )
    }

    return res.status(200).json({ success: true, attendance })
  }
)

export const deleteAttendanceHandler = asyncHandler(
  async (
    req: Request<{ id: IAttendance['_id'] }, {}, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const attendance = await deleteAttendance(req.params.id)

    if (!attendance) {
      return next(
        new ErrorResponse(
          `Attendance with the id of ${req.params.id} not found`,
          404
        )
      )
    }

    res.status(200).json({ success: true, attendance })
  }
)

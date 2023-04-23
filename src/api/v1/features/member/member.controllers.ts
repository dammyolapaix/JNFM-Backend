import { Request, Response, NextFunction } from 'express'
import {
  addMember,
  deleteMember,
  editMember,
  getFullName,
  getMemberQueryResults,
  getSingleMemberById,
  IBaseMember,
  IMember,
} from './index'
import { asyncHandler } from '../../middlewares'
import { ErrorResponse } from '../../utils'
import { IAttendance } from '../attendance'
import { IDepartment } from '../department'
import { IWelfare } from '../welfare'
import { ITithe } from '../tithe'
import { ICell, getSingleCellById } from '../cell'
import { IUser, UserRole } from '../user'

export const getMembersHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { members, pagination } = await getMemberQueryResults(req.query)

    return res.status(200).json({
      success: true,
      count: members.length,
      pagination,
      members,
    })
  }
)

export const getSingleMemberByIdHandler = asyncHandler(
  async (
    req: Request<{ id: IMember['_id'] }, {}, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const member = await getSingleMemberById(req.params.id)
      .populate<{
        attendances: IAttendance[]
      }>({
        path: 'attendances',
        model: 'Attendance',
        select: 'churchService',
        populate: {
          path: 'churchService',
          model: 'ChurchService',
          select: 'date churchServiceType',
          populate: {
            path: 'churchServiceType',
            model: 'ChurchServiceType',
            select: 'name',
          },
        },
      })
      .populate<{
        departments: IDepartment[]
      }>({
        path: 'departments',
        model: 'Department',
      })
      .populate<{
        welfares: IWelfare[]
      }>({
        path: 'welfares',
        model: 'Welfare',
        select: 'amount date',
      })
      .populate<{
        tithes: ITithe[]
      }>({
        path: 'tithes',
        model: 'Tithe',
        select: 'amount date',
      })
      .populate<{
        cell: ICell
      }>({
        path: 'cell.cell',
        model: 'Cell',
        select: 'name',
      })

    if (!member) {
      return next(
        new ErrorResponse(
          `Member with the id of ${req.params.id} not found`,
          404
        )
      )
    }

    return res.status(200).json({ success: true, member })
  }
)

export const addMemberHandler = asyncHandler(
  async (
    req: Request<{}, {}, IBaseMember, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const authUser = req.user as IUser

    const {
      lastName,
      firstName,
      otherNames,
      cell: { cell },
    } = req.body

    // Checking if the authUser is a leader in this cell before adding the member
    const cellToAddMember = await getSingleCellById(cell as ICell['_id'])

    if (cellToAddMember && cellToAddMember.leaders) {
      const isCellLeader =
        authUser.roles.includes(UserRole.Admin) ||
        (cellToAddMember.leaders as Array<IUser['_id']>).includes(authUser._id)

      if (!isCellLeader) {
        return next(
          new ErrorResponse(
            `You can't add a new member because you are not a leader in this cell`,
            404
          )
        )
      }
    }

    req.body.fullName = getFullName(
      lastName,
      firstName && firstName,
      otherNames && otherNames
    )

    const member = await addMember(req.body)

    return res.status(201).json({ success: true, member })
  }
)

export const editMemberHandler = asyncHandler(
  async (
    req: Request<{ id: IMember['_id'] }, {}, IMember, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const authUser = req.user as IUser

    const {
      lastName,
      firstName,
      otherNames,
      cell: { cell },
    } = req.body
    // Checking if the authUser is a leader in this cell before adding the member
    const cellToAddMember = await getSingleCellById(cell as ICell['_id'])

    if (cellToAddMember && cellToAddMember.leaders) {
      const isCellLeader =
        authUser.roles.includes(UserRole.Admin) ||
        (cellToAddMember.leaders as Array<IUser['_id']>).includes(authUser._id)

      if (!isCellLeader) {
        return next(
          new ErrorResponse(
            `You can't add a new member because you are not a leader in this cell`,
            404
          )
        )
      }
    }

    req.body.fullName = getFullName(
      lastName && lastName,
      firstName && firstName,
      otherNames && otherNames
    )

    const member = await editMember(req.params.id, req.body)

    if (!member) {
      return next(
        new ErrorResponse(
          `Member with the id of ${req.params.id} not found`,
          404
        )
      )
    }

    return res.status(200).json({ success: true, member })
  }
)

export const deleteMemberHandler = asyncHandler(
  async (
    req: Request<{ id: IMember['_id'] }, {}, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const member = await deleteMember(req.params.id)

    res.status(200).json({ success: true, member })
  }
)

import { Request, Response, NextFunction } from 'express'
import {
  addDepartment,
  deleteDepartment,
  editDepartment,
  getDepartments,
  getSingleDepartmentById,
  IBaseDepartment,
  IDepartment,
  IReqDepartment,
} from './index'
import { asyncHandler } from '../../middlewares'
import { ErrorResponse } from '../../utils'
import { getSingleMemberById, IMember } from '../member'

export const getDepartmentsHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const departments = await getDepartments().populate<{ members: IMember[] }>(
      {
        path: 'members.member',
        select: 'fullName',
      }
    )

    return res
      .status(200)
      .json({ success: true, count: departments.length, departments })
  }
)

export const getSingleDepartmentByIdHandler = asyncHandler(
  async (
    req: Request<{ id: IDepartment['_id'] }, {}, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const department = await getSingleDepartmentById(req.params.id).populate<{
      members: IMember[]
    }>({
      path: 'members.member',
      select: 'fullName',
    })

    if (!department) {
      return next(
        new ErrorResponse(
          `Department with the id of ${req.params.id} not found`,
          404
        )
      )
    }

    return res.status(200).json({
      success: true,
      countMembers: department.members.length,
      department,
    })
  }
)

export const addDepartmentHandler = asyncHandler(
  async (
    req: Request<{}, {}, IBaseDepartment, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const department = await addDepartment(req.body)

    return res.status(201).json({ success: true, department })
  }
)

export const editDepartmentHandler = asyncHandler(
  async (
    req: Request<{ id: IDepartment['_id'] }, {}, IDepartment, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const department = await editDepartment(req.params.id, req.body)

    if (!department) {
      return next(
        new ErrorResponse(
          `Department with the id of ${req.params.id} not found`,
          404
        )
      )
    }

    return res.status(200).json({ success: true, department })
  }
)

export const deleteDepartmentHandler = asyncHandler(
  async (
    req: Request<{ id: IDepartment['_id'] }, {}, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const department = await deleteDepartment(req.params.id)

    if (!department) {
      return next(
        new ErrorResponse(
          `Department with the id of ${req.params.id} not found`,
          404
        )
      )
    }

    res.status(200).json({ success: true, department })
  }
)

export const addMemberToDepartmentHandler = asyncHandler(
  async (
    req: Request<{ id: IDepartment['_id'] }, {}, IReqDepartment, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const { member } = req.body

    const department = await getSingleDepartmentById(req.params.id)

    const getMember = await getSingleMemberById(member)

    if (!department) {
      return next(
        new ErrorResponse(
          `Department with the id of ${req.params.id} not found`,
          404
        )
      )
    }

    if (!getMember) {
      return next(
        new ErrorResponse(`Member with the id of ${member} not found`, 404)
      )
    }

    const isAlreadyAMember =
      typeof department.members !== 'undefined' &&
      department.members.filter((member) => member.member == req.body.member)
        .length > 0

    if (isAlreadyAMember) {
      return next(
        new ErrorResponse(
          `This member is already added to this department`,
          400
        )
      )
    }

    department.members?.unshift({ member })

    await department.save()

    res.status(200).json({ success: true, department })
  }
)

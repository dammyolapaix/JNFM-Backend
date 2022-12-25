import { Request, Response, NextFunction } from 'express'
import {
  addDepartment,
  deleteDepartment,
  editDepartment,
  getDepartments,
  getSingleDepartmentById,
  IBaseDepartment,
  IDepartment,
} from './index'
import { asyncHandler } from '../../middlewares'
import { ErrorResponse } from '../../utils'
import { IMember } from '../member'

export const getDepartmentsHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const departments = await getDepartments().populate<{ members: IMember[] }>(
      {
        path: 'members',
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
      path: 'members',
    })

    if (!department) {
      return next(
        new ErrorResponse(
          `Department with the id of ${req.params.id} not found`,
          404
        )
      )
    }

    return res
      .status(200)
      .json({
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

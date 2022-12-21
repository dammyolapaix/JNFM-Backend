import { Request, Response, NextFunction } from 'express'
import {
  addMember,
  deleteMember,
  editMember,
  getMembers,
  getSingleMemberById,
  IBaseMember,
  IMember,
} from './index'
import { asyncHandler } from '../../middlewares'
import { ErrorResponse } from '../../utils'

export const getMembersHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const members = await getMembers()

    return res
      .status(200)
      .json({ success: true, count: members.length, members })
  }
)

export const getSingleMemberByIdHandler = asyncHandler(
  async (
    req: Request<{ id: IMember['_id'] }, {}, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const member = await getSingleMemberById(req.params.id)

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

import { Request, Response, NextFunction } from 'express'
import {
  addSpecialContribution,
  deleteSpecialContribution,
  editSpecialContribution,
  getSpecialContributions,
  getSingleSpecialContributionById,
  ISpecialContribution,
  IReqSpecialContribution,
} from './index'
import { asyncHandler } from '../../middlewares'
import { ErrorResponse } from '../../utils'
import { getSingleMemberById, IMember } from '../member'

export const getSpecialContributionsHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const specialContributions = await getSpecialContributions().populate<{
      member: IMember
    }>({
      path: 'member',
      select: 'fullName',
    })

    return res.status(200).json({
      success: true,
      count: specialContributions.length,
      specialContributions,
    })
  }
)

export const getSingleSpecialContributionByIdHandler = asyncHandler(
  async (
    req: Request<{ id: ISpecialContribution['_id'] }, {}, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const specialContribution = await getSingleSpecialContributionById(
      req.params.id
    ).populate<{
      member: IMember
    }>({
      path: 'member',
      select: 'fullName',
    })

    if (!specialContribution) {
      return next(
        new ErrorResponse(
          `SpecialContribution with the id of ${req.params.id} not found`,
          404
        )
      )
    }

    return res.status(200).json({
      success: true,
      specialContribution,
    })
  }
)

export const addSpecialContributionHandler = asyncHandler(
  async (
    req: Request<{}, {}, IReqSpecialContribution, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const { member } = req.body

    const specialContribution = await addSpecialContribution(req.body)

    const getMember = await getSingleMemberById(member)

    if (!getMember) {
      return next(
        new ErrorResponse(`Member with the id of ${member} not found`, 404)
      )
    }

    return res.status(201).json({ success: true, specialContribution })
  }
)

export const editSpecialContributionHandler = asyncHandler(
  async (
    req: Request<
      { id: ISpecialContribution['_id'] },
      {},
      ISpecialContribution,
      {}
    >,
    res: Response,
    next: NextFunction
  ) => {
    const specialContribution = await editSpecialContribution(
      req.params.id,
      req.body
    )

    if (!specialContribution) {
      return next(
        new ErrorResponse(
          `SpecialContribution with the id of ${req.params.id} not found`,
          404
        )
      )
    }

    return res.status(200).json({ success: true, specialContribution })
  }
)

export const deleteSpecialContributionHandler = asyncHandler(
  async (
    req: Request<{ id: ISpecialContribution['_id'] }, {}, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const specialContribution = await deleteSpecialContribution(req.params.id)

    if (!specialContribution) {
      return next(
        new ErrorResponse(
          `SpecialContribution with the id of ${req.params.id} not found`,
          404
        )
      )
    }

    res.status(200).json({ success: true, specialContribution })
  }
)

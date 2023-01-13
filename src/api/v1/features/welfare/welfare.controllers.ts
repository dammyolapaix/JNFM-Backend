import { Request, Response, NextFunction } from 'express'
import {
  addWelfare,
  deleteWelfare,
  editWelfare,
  getWelfares,
  getSingleWelfareById,
  IBaseWelfare,
  IWelfare,
  IReqWelfare,
} from './index'
import { asyncHandler } from '../../middlewares'
import { changeToLowerDenomination, ErrorResponse } from '../../utils'
import { getSingleMemberById, IMember } from '../member'
import { addIncome } from '../income'
import { addCashBook } from '../cashBook'

export const getWelfaresHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const welfares = await getWelfares().populate<{ member: IMember }>({
      path: 'member',
      select: 'fullName',
    })

    return res
      .status(200)
      .json({ success: true, count: welfares.length, welfares })
  }
)

export const getSingleWelfareByIdHandler = asyncHandler(
  async (
    req: Request<{ id: IWelfare['_id'] }, {}, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const welfare = await getSingleWelfareById(req.params.id).populate<{
      member: IMember
    }>({
      path: 'members',
      select: 'fullName',
    })

    if (!welfare) {
      return next(
        new ErrorResponse(
          `Welfare with the id of ${req.params.id} not found`,
          404
        )
      )
    }

    return res.status(200).json({
      success: true,
      welfare,
    })
  }
)

export const addWelfareHandler = asyncHandler(
  async (
    req: Request<{}, {}, IReqWelfare, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const { member } = req.body

    req.body.amount = changeToLowerDenomination(req.body.amount)

    const getMember = await getSingleMemberById(member)

    if (!getMember) {
      return next(
        new ErrorResponse(`Member with the id of ${member} not found`, 404)
      )
    }

    const welfare = await addWelfare(req.body)

    const { _id, date, amount } = welfare

    const income = {
      date,
      amount,
      naration: `Welfare paid by ${getMember.fullName}`,
      source: { welfare: _id },
    }

    await addIncome(income)

    const { naration, source: account } = income

    await addCashBook({ date, amount, naration, account, debitCredit: 'Debit' })

    return res.status(201).json({ success: true, welfare })
  }
)

export const editWelfareHandler = asyncHandler(
  async (
    req: Request<{ id: IWelfare['_id'] }, {}, IWelfare, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const welfare = await editWelfare(req.params.id, req.body)

    if (!welfare) {
      return next(
        new ErrorResponse(
          `Welfare with the id of ${req.params.id} not found`,
          404
        )
      )
    }

    return res.status(200).json({ success: true, welfare })
  }
)

export const deleteWelfareHandler = asyncHandler(
  async (
    req: Request<{ id: IWelfare['_id'] }, {}, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const welfare = await deleteWelfare(req.params.id)

    if (!welfare) {
      return next(
        new ErrorResponse(
          `Welfare with the id of ${req.params.id} not found`,
          404
        )
      )
    }

    res.status(200).json({ success: true, welfare })
  }
)

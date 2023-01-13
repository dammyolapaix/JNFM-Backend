import { Request, Response, NextFunction } from 'express'
import {
  addIncome,
  deleteIncome,
  editIncome,
  getIncomes,
  getSingleIncomeById,
  IBaseIncome,
  IIncome,
} from './index'
import { asyncHandler } from '../../middlewares'
import { ErrorResponse } from '../../utils'

export const getIncomesHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const incomes = await getIncomes()

    return res.status(200).json({
      success: true,
      count: incomes.length,
      incomes,
    })
  }
)

export const getSingleIncomeByIdHandler = asyncHandler(
  async (
    req: Request<{ id: IIncome['_id'] }, {}, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const income = await getSingleIncomeById(req.params.id)

    if (!income) {
      return next(
        new ErrorResponse(
          `Income with the id of ${req.params.id} not found`,
          404
        )
      )
    }

    return res.status(200).json({
      success: true,
      income,
    })
  }
)

export const addIncomeHandler = asyncHandler(
  async (
    req: Request<{}, {}, IBaseIncome, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const income = await addIncome(req.body)

    return res.status(201).json({ success: true, income })
  }
)

export const editIncomeHandler = asyncHandler(
  async (
    req: Request<{ id: IIncome['_id'] }, {}, IIncome, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const income = await editIncome(req.params.id, req.body)

    if (!income) {
      return next(
        new ErrorResponse(
          `Income with the id of ${req.params.id} not found`,
          404
        )
      )
    }

    return res.status(200).json({ success: true, income })
  }
)

export const deleteIncomeHandler = asyncHandler(
  async (
    req: Request<{ id: IIncome['_id'] }, {}, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const income = await deleteIncome(req.params.id)

    if (!income) {
      return next(
        new ErrorResponse(
          `Income with the id of ${req.params.id} not found`,
          404
        )
      )
    }

    res.status(200).json({ success: true, income })
  }
)

import { Request, Response, NextFunction } from 'express'
import {
  addExpenditure,
  deleteExpenditure,
  editExpenditure,
  getExpenditures,
  getSingleExpenditureById,
  IBaseExpenditure,
  IExpenditure,
} from './index'
import { asyncHandler } from '../../middlewares'
import { changeToLowerDenomination, ErrorResponse } from '../../utils'
import { getSingleChurchServiceById, IChurchService } from '../churchService'
import { IExpenditureCategory } from './expenditureCategory'
import { addCashBook, IBaseCashBook } from '../cashBook'

export const getExpendituresHandler = asyncHandler(
  async (
    req: Request<
      { churchServiceId: IExpenditure['churchService'] },
      {},
      {},
      {}
    >,
    res: Response,
    next: NextFunction
  ) => {
    const queryObject = { churchService: req.params.churchServiceId }

    const expenditures = await getExpenditures(
      req.params.churchServiceId && queryObject
    )
      .populate<{ churchService: IChurchService }>({
        path: 'churchService',
        select: 'date',
        model: 'ChurchService',
        populate: {
          path: 'churchServiceType',
          model: 'ChurchServiceType',
          select: 'name',
        },
      })
      .populate<{ expenditureCategory: IExpenditureCategory }>({
        path: 'expenditureCategory',
        select: 'name',
        model: 'ExpenditureCategory',
      })

    const totalExpenditures = expenditures.reduce(
      (accumulatedExpenditures, currentExpenditure) =>
        accumulatedExpenditures + currentExpenditure.amount,
      0
    )

    return res.status(200).json({
      success: true,
      count: expenditures.length,
      totalExpenditures,
      expenditures,
    })
  }
)

export const getSingleExpenditureByIdHandler = asyncHandler(
  async (
    req: Request<{ id: IExpenditure['_id'] }, {}, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const expenditure = await getSingleExpenditureById(req.params.id)
      .populate<{ churchService: IChurchService }>({
        path: 'churchService',
        select: 'date',
        model: 'ChurchService',
        populate: {
          path: 'churchServiceType',
          model: 'ChurchServiceType',
          select: 'name',
        },
      })
      .populate<{ expenditureCategory: IExpenditureCategory }>({
        path: 'expenditureCategory',
        select: 'name',
        model: 'ExpenditureCategory',
      })

    if (!expenditure) {
      return next(
        new ErrorResponse(
          `Expenditure with the id of ${req.params.id} not found`,
          404
        )
      )
    }

    return res.status(200).json({
      success: true,
      expenditure,
    })
  }
)

export const addExpenditureHandler = asyncHandler(
  async (
    req: Request<
      { churchServiceId: IExpenditure['churchService'] },
      {},
      IBaseExpenditure,
      {}
    >,
    res: Response,
    next: NextFunction
  ) => {
    const { churchServiceId } = req.params
    if (churchServiceId) {
      req.body.churchService = churchServiceId
    }

    const { churchService } = req.body

    req.body.amount = changeToLowerDenomination(req.body.amount)

    const expenditure = await addExpenditure(req.body)

    if (typeof churchService === 'string') {
      const getChurchService = await getSingleChurchServiceById(churchService)

      if (!getChurchService) {
        return next(
          new ErrorResponse(
            `Church Service with the id of ${churchService} not found`,
            404
          )
        )
      }
    }

    const cashBook: IBaseCashBook = {
      date: expenditure.date,
      amount: -expenditure.amount,
      naration: expenditure.naration,
      debitCredit: 'Credit',
    }

    await addCashBook(cashBook)

    return res.status(201).json({ success: true, expenditure })
  }
)

export const editExpenditureHandler = asyncHandler(
  async (
    req: Request<{ id: IExpenditure['_id'] }, {}, IExpenditure, {}>,
    res: Response,
    next: NextFunction
  ) => {
    if (req.body.amount) {
      req.body.amount = changeToLowerDenomination(req.body.amount)
    }

    const expenditure = await editExpenditure(req.params.id, req.body)

    if (!expenditure) {
      return next(
        new ErrorResponse(
          `Expenditure with the id of ${req.params.id} not found`,
          404
        )
      )
    }

    return res.status(200).json({ success: true, expenditure })
  }
)

export const deleteExpenditureHandler = asyncHandler(
  async (
    req: Request<{ id: IExpenditure['_id'] }, {}, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const expenditure = await deleteExpenditure(req.params.id)

    if (!expenditure) {
      return next(
        new ErrorResponse(
          `Expenditure with the id of ${req.params.id} not found`,
          404
        )
      )
    }

    res.status(200).json({ success: true, expenditure })
  }
)

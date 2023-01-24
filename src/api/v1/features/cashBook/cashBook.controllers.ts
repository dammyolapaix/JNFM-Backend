import { Request, Response, NextFunction } from 'express'
import {
  addCashBook,
  deleteCashBook,
  editCashBook,
  getCashBooks,
  getSingleCashBookById,
  getTotalCashBook,
  IBaseCashBook,
  ICashBook,
  ICashBookQuery,
} from './index'
import { asyncHandler } from '../../middlewares'
import { ErrorResponse } from '../../utils'
import { IOffering } from '../offering'

export const getCashBooksHandler = asyncHandler(
  async (
    req: Request<{}, {}, {}, ICashBookQuery>,
    res: Response,
    next: NextFunction
  ) => {
    let query

    if (req.query) {
      const reqQuery = { ...req.query }

      let queryStr = JSON.stringify(req.query)

      queryStr = queryStr.replace(
        /\b(gt|gte|lt|lte|eq|in)\b/g,
        (match) => `$${match}`
      )

      // Fields to exclude in the query
      const removeFields = ['select']
      removeFields.forEach((field) => delete reqQuery[field])

      if (req.query.date) {
        req.query.date = new Date(req.query.date)
      }

      query = getCashBooks(JSON.parse(queryStr)).populate<{
        offering: IOffering
      }>({
        path: 'account.offering',
        model: 'Offering',
        select: 'churchService',
      })
    } else {
      query = getCashBooks().populate<{
        offering: IOffering
      }>({
        path: 'account.offering',
        model: 'Offering',
        select: 'churchService',
      })
    }

    if (req.query.select) {
      const fields = req.query.select.split(',').join(' ')
      query = query.select(fields)
    }

    const cashBooks = await query

    const totalCashBook = await getTotalCashBook()

    return res.status(200).json({
      success: true,
      count: cashBooks.length,
      totalCashBook,
      cashBooks,
    })
  }
)

export const getSingleCashBookByIdHandler = asyncHandler(
  async (
    req: Request<{ id: ICashBook['_id'] }, {}, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const cashBook = await getSingleCashBookById(req.params.id).populate<{
      offering: IOffering
    }>({
      path: 'account.offering',
      model: 'Offering',
      select: 'churchService',
    })

    if (!cashBook) {
      return next(
        new ErrorResponse(
          `CashBook with the id of ${req.params.id} not found`,
          404
        )
      )
    }

    return res.status(200).json({
      success: true,
      cashBook,
    })
  }
)

export const addCashBookHandler = asyncHandler(
  async (
    req: Request<{}, {}, IBaseCashBook, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const cashBook = await addCashBook(req.body)

    return res.status(201).json({ success: true, cashBook })
  }
)

export const editCashBookHandler = asyncHandler(
  async (
    req: Request<{ id: ICashBook['_id'] }, {}, ICashBook, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const cashBook = await editCashBook(req.params.id, req.body)

    if (!cashBook) {
      return next(
        new ErrorResponse(
          `CashBook with the id of ${req.params.id} not found`,
          404
        )
      )
    }

    return res.status(200).json({ success: true, cashBook })
  }
)

export const deleteCashBookHandler = asyncHandler(
  async (
    req: Request<{ id: ICashBook['_id'] }, {}, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const cashBook = await deleteCashBook(req.params.id)

    if (!cashBook) {
      return next(
        new ErrorResponse(
          `CashBook with the id of ${req.params.id} not found`,
          404
        )
      )
    }

    res.status(200).json({ success: true, cashBook })
  }
)

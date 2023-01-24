import { Request, Response, NextFunction } from 'express'
import {
  addCashBook,
  CashBook,
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
      const removeFields = ['select', 'sort', 'page', 'limit']
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

    // Selecting specific field(s)
    if (req.query.select) {
      const fields = req.query.select.split(',').join(' ')
      query = query.select(fields)
    }

    // Sort by field(s)
    if (req.query.sort) {
      const sortedBy = req.query.sort.split(',').join(' ')
      query = query.sort(sortedBy)
    } else {
      query = query.sort('-createdAt')
    }

    // Pagination
    const page = parseInt(req.query.page, 10) || 1
    const limit = parseInt(req.query.limit, 10) || 5
    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    const totalDocument = await CashBook.countDocuments()

    query = query.skip(startIndex).limit(limit)

    const cashBooks = await query

    const totalCashBook = await getTotalCashBook()

    // Pagination result
    const pagination = {}
    if (endIndex < totalDocument) {
      // @ts-ignore
      pagination.next = {
        page: page + 1,
        limit,
      }
    }
    if (startIndex > 0) {
      // @ts-ignore
      pagination.prev = {
        page: page - 1,
        limit,
      }
    }

    return res.status(200).json({
      success: true,
      count: cashBooks.length,
      pagination,
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

import { Request, Response, NextFunction } from 'express'
import {
  addCashBook,
  deleteCashBook,
  editCashBook,
  getCashBooks,
  getSingleCashBookById,
  IBaseCashBook,
  ICashBook,
} from './index'
import { asyncHandler } from '../../middlewares'
import { ErrorResponse } from '../../utils'

export const getCashBooksHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const cashBooks = await getCashBooks()

    return res.status(200).json({
      success: true,
      count: cashBooks.length,
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
    const cashBook = await getSingleCashBookById(req.params.id)

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

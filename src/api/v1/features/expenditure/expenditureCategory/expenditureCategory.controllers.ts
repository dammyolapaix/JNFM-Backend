import { Request, Response, NextFunction } from 'express'
import { asyncHandler } from '../../../middlewares'
import { ErrorResponse } from '../../../utils'
import {
  addExpenditureCategory,
  deleteExpenditureCategory,
  editExpenditureCategory,
  getExpenditureCategories,
  getSingleExpenditureCategoryById,
  IBaseExpenditureCategory,
  IExpenditureCategory,
} from './index'

export const getExpenditureCategoryiesHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const expenditureCategories = await getExpenditureCategories()

    return res.status(200).json({
      success: true,
      count: expenditureCategories.length,
      expenditureCategories,
    })
  }
)

export const getSingleExpenditureCategoryByIdHandler = asyncHandler(
  async (
    req: Request<{ id: IExpenditureCategory['_id'] }, {}, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const expenditureCategory = await getSingleExpenditureCategoryById(
      req.params.id
    )

    if (!expenditureCategory) {
      return next(
        new ErrorResponse(
          `ExpenditureCategory with the id of ${req.params.id} not found`,
          404
        )
      )
    }

    return res.status(200).json({
      success: true,
      expenditureCategory,
    })
  }
)

export const addExpenditureCategoryHandler = asyncHandler(
  async (
    req: Request<{}, {}, IBaseExpenditureCategory, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const expenditureCategory = await addExpenditureCategory(req.body)

    return res.status(201).json({ success: true, expenditureCategory })
  }
)

export const editExpenditureCategoryHandler = asyncHandler(
  async (
    req: Request<
      { id: IExpenditureCategory['_id'] },
      {},
      IExpenditureCategory,
      {}
    >,
    res: Response,
    next: NextFunction
  ) => {
    const expenditureCategory = await editExpenditureCategory(
      req.params.id,
      req.body
    )

    if (!expenditureCategory) {
      return next(
        new ErrorResponse(
          `ExpenditureCategory with the id of ${req.params.id} not found`,
          404
        )
      )
    }

    return res.status(200).json({ success: true, expenditureCategory })
  }
)

export const deleteExpenditureCategoryHandler = asyncHandler(
  async (
    req: Request<{ id: IExpenditureCategory['_id'] }, {}, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const expenditureCategory = await deleteExpenditureCategory(req.params.id)

    if (!expenditureCategory) {
      return next(
        new ErrorResponse(
          `ExpenditureCategory with the id of ${req.params.id} not found`,
          404
        )
      )
    }

    res.status(200).json({ success: true, expenditureCategory })
  }
)

import { Request, Response, NextFunction } from 'express'
import { asyncHandler } from '../../../middlewares'
import { ErrorResponse } from '../../../utils'
import {
  addOfferingType,
  deleteOfferingType,
  editOfferingType,
  getOfferingTypes,
  getSingleOfferingTypeById,
  IBaseOfferingType,
  IOfferingType,
} from './index'

export const getOfferingTypesHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const offeringTypes = await getOfferingTypes()

    return res.status(200).json({
      success: true,
      count: offeringTypes.length,
      offeringTypes,
    })
  }
)

export const getSingleOfferingTypeByIdHandler = asyncHandler(
  async (
    req: Request<{ id: IOfferingType['_id'] }, {}, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const offeringType = await getSingleOfferingTypeById(req.params.id)

    if (!offeringType) {
      return next(
        new ErrorResponse(
          `OfferingType with the id of ${req.params.id} not found`,
          404
        )
      )
    }

    return res.status(200).json({ success: true, offeringType })
  }
)

export const addOfferingTypeHandler = asyncHandler(
  async (
    req: Request<{}, {}, IBaseOfferingType, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const offeringType = await addOfferingType(req.body)

    return res.status(201).json({ success: true, offeringType })
  }
)

export const editOfferingTypeHandler = asyncHandler(
  async (
    req: Request<{ id: IOfferingType['_id'] }, {}, IOfferingType, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const offeringType = await editOfferingType(req.params.id, req.body)

    return res.status(200).json({ success: true, offeringType })
  }
)

export const deleteOfferingTypeHandler = asyncHandler(
  async (
    req: Request<{ id: IOfferingType['_id'] }, {}, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const offeringType = await deleteOfferingType(req.params.id)

    res.status(200).json({ success: true, offeringType })
  }
)

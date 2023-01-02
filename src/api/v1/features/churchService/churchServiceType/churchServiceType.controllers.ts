import { Request, Response, NextFunction } from 'express'
import { asyncHandler } from '../../../middlewares'
import { ErrorResponse } from '../../../utils'
import {
  addChurchServiceType,
  deleteChurchServiceType,
  editChurchServiceType,
  getChurchServiceTypes,
  getSingleChurchServiceTypeById,
  IBaseChurchServiceType,
  IChurchServiceType,
} from './index'

export const getChurchServiceTypesHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const churchServiceTypes = await getChurchServiceTypes()

    return res.status(200).json({
      success: true,
      count: churchServiceTypes.length,
      churchServiceTypes,
    })
  }
)

export const getSingleChurchServiceTypeByIdHandler = asyncHandler(
  async (
    req: Request<{ id: IChurchServiceType['_id'] }, {}, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const churchServiceType = await getSingleChurchServiceTypeById(
      req.params.id
    )

    if (!churchServiceType) {
      return next(
        new ErrorResponse(
          `ChurchServiceType with the id of ${req.params.id} not found`,
          404
        )
      )
    }

    return res.status(200).json({ success: true, churchServiceType })
  }
)

export const addChurchServiceTypeHandler = asyncHandler(
  async (
    req: Request<{}, {}, IBaseChurchServiceType, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const churchServiceType = await addChurchServiceType(req.body)

    return res.status(201).json({ success: true, churchServiceType })
  }
)

export const editChurchServiceTypeHandler = asyncHandler(
  async (
    req: Request<{ id: IChurchServiceType['_id'] }, {}, IChurchServiceType, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const churchServiceType = await editChurchServiceType(
      req.params.id,
      req.body
    )

    return res.status(200).json({ success: true, churchServiceType })
  }
)

export const deleteChurchServiceTypeHandler = asyncHandler(
  async (
    req: Request<{ id: IChurchServiceType['_id'] }, {}, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const churchServiceType = await deleteChurchServiceType(req.params.id)

    res.status(200).json({ success: true, churchServiceType })
  }
)

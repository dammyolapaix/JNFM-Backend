import { Request, Response, NextFunction } from 'express'
import {
  addOffering,
  deleteOffering,
  editOffering,
  getOfferings,
  getSingleOfferingById,
  IBaseOffering,
  IOffering,
} from './index'
import { asyncHandler } from '../../middlewares'
import { ErrorResponse } from '../../utils'
import { getSingleChurchServiceById, IChurchService } from '../churchService'

export const getOfferingsHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const offerings = await getOfferings().populate<{
      churchService: IChurchService
    }>({
      path: 'churchService',
      select: 'date',
      populate: {
        path: 'churchServiceType',
        model: 'churchServiceType',
        select: 'name',
      },
    })

    return res
      .status(200)
      .json({ success: true, count: offerings.length, offerings })
  }
)

export const getSingleOfferingByIdHandler = asyncHandler(
  async (
    req: Request<{ id: IOffering['_id'] }, {}, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const offering = await getSingleOfferingById(req.params.id).populate<{
      churchService: IChurchService
    }>({
      path: 'churchService',
      select: 'date',
      populate: {
        path: 'churchServiceType',
        model: 'churchServiceType',
        select: 'name',
      },
    })

    if (!offering) {
      return next(
        new ErrorResponse(
          `Offering with the id of ${req.params.id} not found`,
          404
        )
      )
    }

    return res.status(200).json({
      success: true,
      offering,
    })
  }
)

export const addOfferingHandler = asyncHandler(
  async (
    req: Request<{}, {}, IBaseOffering, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const { churchService } = req.body

    const offering = await addOffering(req.body)

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

    return res.status(201).json({ success: true, offering })
  }
)

export const editOfferingHandler = asyncHandler(
  async (
    req: Request<{ id: IOffering['_id'] }, {}, IOffering, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const offering = await editOffering(req.params.id, req.body)

    if (!offering) {
      return next(
        new ErrorResponse(
          `Offering with the id of ${req.params.id} not found`,
          404
        )
      )
    }

    return res.status(200).json({ success: true, offering })
  }
)

export const deleteOfferingHandler = asyncHandler(
  async (
    req: Request<{ id: IOffering['_id'] }, {}, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const offering = await deleteOffering(req.params.id)

    if (!offering) {
      return next(
        new ErrorResponse(
          `Offering with the id of ${req.params.id} not found`,
          404
        )
      )
    }

    res.status(200).json({ success: true, offering })
  }
)

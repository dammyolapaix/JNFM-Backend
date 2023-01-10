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
import { changeToLowerDenomination, ErrorResponse } from '../../utils'
import { getSingleChurchServiceById, IChurchService } from '../churchService'
import { IOfferingType } from './offeringType'
import { addIncome, IBaseIncome } from '../income'
import { addCashBook, IBaseCashBook } from '../cashBook'

export const getOfferingsHandler = asyncHandler(
  async (
    req: Request<{ churchServiceId: IOffering['churchService'] }, {}, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const queryObject = { churchService: req.params.churchServiceId }

    const offerings = await getOfferings(
      req.params.churchServiceId && queryObject
    )
      .populate<{ churchService: IChurchService }>({
        path: 'churchService',
        select: 'date',
        populate: {
          path: 'churchServiceType',
          model: 'ChurchServiceType',
          select: 'name',
        },
      })
      .populate<{ offeringType: IOfferingType }>({
        path: 'offeringType',
        select: 'name',
      })

    const totalOfferings = offerings.reduce(
      (accumulatedOfferings, currentOffering) =>
        accumulatedOfferings + currentOffering.amount,
      0
    )

    return res.status(200).json({
      success: true,
      count: offerings.length,
      totalOfferings,
      offerings,
    })
  }
)

export const getSingleOfferingByIdHandler = asyncHandler(
  async (
    req: Request<{ id: IOffering['_id'] }, {}, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const offering = await getSingleOfferingById(req.params.id)
      .populate<{ churchService: IChurchService }>({
        path: 'churchService',
        select: 'date',
        populate: {
          path: 'churchServiceType',
          model: 'ChurchServiceType',
          select: 'name',
        },
      })
      .populate<{ offeringType: IOfferingType }>({
        path: 'offeringType',
        select: 'name',
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
    req: Request<
      { churchServiceId: IOffering['churchService'] },
      {},
      IBaseOffering,
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

    const { date, amount, _id } = offering

    const income: IBaseIncome = {
      amount: offering.amount,
      date: offering.date,
      naration: 'Offering',
      source: {
        offering: offering._id,
      },
    }

    const cashBook: IBaseCashBook = {
      date,
      amount,
      naration: 'Offering',
      account: {
        offering: _id,
      },
      debitCredit: 'Debit',
    }

    await addIncome(income)
    await addCashBook(cashBook)

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

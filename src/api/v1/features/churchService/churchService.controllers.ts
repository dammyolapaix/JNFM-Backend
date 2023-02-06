import { Request, Response, NextFunction } from 'express'
import {
  addChurchService,
  deleteChurchService,
  editChurchService,
  getChurchServices,
  getSingleChurchServiceById,
  IBaseChurchService,
  IChurchService,
} from './index'
import { asyncHandler } from '../../middlewares'
import { ErrorResponse } from '../../utils'
import { IAttendance } from '../attendance'
import { IChurchServiceType } from './churchServiceType'
import { IOffering, Offering } from '../offering'
import { IExpenditure } from '../expenditure'

export const getChurchServicesHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const churchServices = await getChurchServices()
      .populate<{ churchServiceType: IChurchServiceType[] }>({
        path: 'churchServiceType',
        model: 'ChurchServiceType',
        select: 'name',
      })
      .populate<{ attendances: IAttendance[] }>({
        path: 'attendances',
        model: 'Attendance',
        select: 'member',
        populate: {
          path: 'member',
          model: 'Member',
          select: 'fullName gender cell',
        },
      })
      .populate<{ offerings: IOffering[] }>({
        path: 'offerings',
        model: 'Offering',
      })
      .populate<{ expenditures: IExpenditure[] }>({
        path: 'expenditures',
        model: 'Expenditure',
      })
      .sort('-date')

    return res.status(200).json({
      success: true,
      count: churchServices.length,
      churchServices,
    })
  }
)

export const getSingleChurchServiceByIdHandler = asyncHandler(
  async (
    req: Request<{ id: IChurchService['_id'] }, {}, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const churchService = await getSingleChurchServiceById(req.params.id)
      .populate<{ churchServiceType: IChurchServiceType[] }>({
        path: 'churchServiceType',
        model: 'ChurchServiceType',
        select: 'name',
      })
      .populate<{ attendances: IAttendance[] }>({
        path: 'attendances',
        model: 'Attendance',
        select: 'member',
        populate: {
          path: 'member',
          model: 'Member',
          select: 'fullName',
        },
      })
      .populate<{ offerings: IOffering[] }>({
        path: 'offerings',
        model: 'Offering',
        select: 'amount offeringType',
        populate: {
          path: 'offeringType',
          model: 'OfferingType',
          select: 'name',
        },
      })
      .populate<{ expenditures: IExpenditure[] }>({
        path: 'expenditures',
        model: 'Expenditure',
      })

    const offering = await Offering.aggregate([
      { $match: { churchService: churchService && churchService._id } },
      {
        $group: {
          _id: '$churchService',
          totalOfferings: { $sum: '$amount' },
        },
      },
    ])

    if (!churchService) {
      return next(
        new ErrorResponse(
          `ChurchService with the id of ${req.params.id} not found`,
          404
        )
      )
    }

    return res.status(200).json({
      success: true,
      totalOfferings: offering.length === 0 ? 0 : offering[0].totalOfferings,
      churchService,
    })
  }
)

export const addChurchServiceHandler = asyncHandler(
  async (
    req: Request<{}, {}, IBaseChurchService, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const churchService = await addChurchService(req.body)

    return res.status(201).json({ success: true, churchService })
  }
)

export const editChurchServiceHandler = asyncHandler(
  async (
    req: Request<{ id: IChurchService['_id'] }, {}, IChurchService, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const churchService = await editChurchService(req.params.id, req.body)

    return res.status(200).json({ success: true, churchService })
  }
)

export const deleteChurchServiceHandler = asyncHandler(
  async (
    req: Request<{ id: IChurchService['_id'] }, {}, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const churchService = await deleteChurchService(req.params.id)

    res.status(200).json({ success: true, churchService })
  }
)

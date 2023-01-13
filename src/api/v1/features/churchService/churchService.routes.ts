import express from 'express'
import { attendanceRoutes } from '../attendance'
import { expenditureRoutes } from '../expenditure'
import { offeringRoutes } from '../offering'
import {
  addChurchServiceHandler,
  deleteChurchServiceHandler,
  editChurchServiceHandler,
  getChurchServicesHandler,
  getSingleChurchServiceByIdHandler,
} from './index'

const router = express.Router()

// Re-route to other resource routers
router.use('/:churchServiceId/attendances', attendanceRoutes)
router.use('/:churchServiceId/expenditures', expenditureRoutes)
router.use('/:churchServiceId/offerings', offeringRoutes)

router.route('/').get(getChurchServicesHandler).post(addChurchServiceHandler)

router
  .route('/:id')
  .get(getSingleChurchServiceByIdHandler)
  .patch(editChurchServiceHandler)
  .delete(deleteChurchServiceHandler)

export default router

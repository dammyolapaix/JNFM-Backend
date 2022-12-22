import express from 'express'
import { attendanceRoutes } from '../attendance'
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

router.route('/').get(getChurchServicesHandler).post(addChurchServiceHandler)

router
  .route('/:id')
  .get(getSingleChurchServiceByIdHandler)
  .patch(editChurchServiceHandler)
  .delete(deleteChurchServiceHandler)

export default router

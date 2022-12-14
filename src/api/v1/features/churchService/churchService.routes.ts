import express from 'express'
import {
  addChurchServiceHandler,
  deleteChurchServiceHandler,
  editChurchServiceHandler,
  getChurchServicesHandler,
  getSingleChurchServiceByIdHandler,
} from './index'

const router = express.Router()

router.route('/').get(getChurchServicesHandler).post(addChurchServiceHandler)

router
  .route('/:id')
  .get(getSingleChurchServiceByIdHandler)
  .patch(editChurchServiceHandler)
  .delete(deleteChurchServiceHandler)

export default router

import express from 'express'
import {
  addOfferingTypeHandler,
  deleteOfferingTypeHandler,
  editOfferingTypeHandler,
  getOfferingTypesHandler,
  getSingleOfferingTypeByIdHandler,
} from './index'

const router = express.Router()

router.route('/').get(getOfferingTypesHandler).post(addOfferingTypeHandler)

router
  .route('/:id')
  .get(getSingleOfferingTypeByIdHandler)
  .patch(editOfferingTypeHandler)
  .delete(deleteOfferingTypeHandler)

export default router

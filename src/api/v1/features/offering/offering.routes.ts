import express from 'express'
import {
  addOfferingHandler,
  deleteOfferingHandler,
  editOfferingHandler,
  getOfferingsHandler,
  getSingleOfferingByIdHandler,
} from './index'

const router = express.Router()

router.route('/').get(getOfferingsHandler).post(addOfferingHandler)

router
  .route('/:id')
  .get(getSingleOfferingByIdHandler)
  .patch(editOfferingHandler)
  .delete(deleteOfferingHandler)

export default router

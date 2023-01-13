import express from 'express'
import {
  addExpenditureHandler,
  deleteExpenditureHandler,
  editExpenditureHandler,
  getExpendituresHandler,
  getSingleExpenditureByIdHandler,
} from './index'

const router = express.Router({ mergeParams: true })

router.route('/').get(getExpendituresHandler).post(addExpenditureHandler)

router
  .route('/:id')
  .get(getSingleExpenditureByIdHandler)
  .patch(editExpenditureHandler)
  .delete(deleteExpenditureHandler)

export default router

import express from 'express'
import {
  addIncomeHandler,
  deleteIncomeHandler,
  editIncomeHandler,
  getIncomesHandler,
  getSingleIncomeByIdHandler,
} from './index'

const router = express.Router()

router.route('/').get(getIncomesHandler).post(addIncomeHandler)

router
  .route('/:id')
  .get(getSingleIncomeByIdHandler)
  .patch(editIncomeHandler)
  .delete(deleteIncomeHandler)

export default router

import express from 'express'
import {
  addCashBookHandler,
  deleteCashBookHandler,
  editCashBookHandler,
  getCashBooksHandler,
  getSingleCashBookByIdHandler,
} from './index'

const router = express.Router()

router.route('/').get(getCashBooksHandler).post(addCashBookHandler)

router
  .route('/:id')
  .get(getSingleCashBookByIdHandler)
  .patch(editCashBookHandler)
  .delete(deleteCashBookHandler)

export default router

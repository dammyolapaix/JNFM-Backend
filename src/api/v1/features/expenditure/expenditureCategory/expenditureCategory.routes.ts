import express from 'express'
import {
  addExpenditureCategoryHandler,
  deleteExpenditureCategory,
  editExpenditureCategoryHandler,
  getExpenditureCategoryiesHandler,
  getSingleExpenditureCategoryById,
} from './index'

const router = express.Router()

router
  .route('/')
  .get(getExpenditureCategoryiesHandler)
  .post(addExpenditureCategoryHandler)

router
  .route('/:id')
  .get(getSingleExpenditureCategoryById)
  .patch(editExpenditureCategoryHandler)
  .delete(deleteExpenditureCategory)

export default router

import express from 'express'
import {
  addCellHandler,
  deleteCellHandler,
  editCellHandler,
  getCellsHandler,
  getSingleCellByIdHandler,
} from './index'

const router = express.Router()

router.route('/').get(getCellsHandler).post(addCellHandler)

router
  .route('/:id')
  .get(getSingleCellByIdHandler)
  .patch(editCellHandler)
  .delete(deleteCellHandler)

export default router

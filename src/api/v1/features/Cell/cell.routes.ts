import express from 'express'
import {
  addCellHandler,
  addMemberToCellHandler,
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

router.route('/:id/members/add').patch(addMemberToCellHandler)

export default router

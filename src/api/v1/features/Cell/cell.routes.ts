import express from 'express'
import {
  addCellHandler,
  addMemberToCellHandler,
  deleteCellHandler,
  editCellHandler,
  getCellsHandler,
  getSingleCellByIdHandler,
  removeMemberFromCellHandler,
} from './index'

const router = express.Router()

router.route('/').get(getCellsHandler).post(addCellHandler)

router
  .route('/:id')
  .get(getSingleCellByIdHandler)
  .patch(editCellHandler)
  .delete(deleteCellHandler)

router.route('/:id/members/add').patch(addMemberToCellHandler)
router.route('/:id/members/remove').patch(removeMemberFromCellHandler)

export default router

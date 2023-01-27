import express from 'express'
import {
  addWelfareHandler,
  deleteWelfareHandler,
  editWelfareHandler,
  getWelfaresHandler,
  getSingleWelfareByIdHandler,
} from './index'

const router = express.Router()

router.route('/').get(getWelfaresHandler).post(addWelfareHandler)
router
  .route('/:id')
  .get(getSingleWelfareByIdHandler)
  .patch(editWelfareHandler)
  .delete(deleteWelfareHandler)

export default router

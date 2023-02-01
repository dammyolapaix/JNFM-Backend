import express from 'express'
import {
  addTitheHandler,
  deleteTitheHandler,
  editTitheHandler,
  getTithesHandler,
  getSingleTitheByIdHandler,
} from './index'

const router = express.Router()

router.route('/').get(getTithesHandler).post(addTitheHandler)
router
  .route('/:id')
  .get(getSingleTitheByIdHandler)
  .patch(editTitheHandler)
  .delete(deleteTitheHandler)

export default router

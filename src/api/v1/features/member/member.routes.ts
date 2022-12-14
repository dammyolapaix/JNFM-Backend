import express from 'express'
import {
  addMemberHandler,
  deleteMemmberHandler,
  editMemberHandler,
  getMembersHandler,
  getSingleMemberByIdHandler,
} from './index'

const router = express.Router()

router.route('/').get(getMembersHandler).post(addMemberHandler)
router
  .route('/:id')
  .get(getSingleMemberByIdHandler)
  .patch(editMemberHandler)
  .delete(deleteMemmberHandler)

export default router

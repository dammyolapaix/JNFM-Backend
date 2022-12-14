import express from 'express'
import {
  addMemberHandler,
  deleteMemberHandler,
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
  .delete(deleteMemberHandler)

export default router

import express from 'express'
import {
  addDepartmentHandler,
  addMemberToDepartmentHandler,
  deleteDepartmentHandler,
  editDepartmentHandler,
  getDepartmentsHandler,
  getSingleDepartmentByIdHandler,
  removeMemberFromDepartmentHandler,
} from './index'

const router = express.Router()

router.route('/').get(getDepartmentsHandler).post(addDepartmentHandler)
router
  .route('/:id')
  .get(getSingleDepartmentByIdHandler)
  .patch(editDepartmentHandler)
  .delete(deleteDepartmentHandler)

router.route('/:id/members/add').patch(addMemberToDepartmentHandler)
router.route('/:id/members/remove').patch(removeMemberFromDepartmentHandler)

export default router

import express from 'express'
import {
  addDepartmentHandler,
  deleteDepartmentHandler,
  editDepartmentHandler,
  getDepartmentsHandler,
  getSingleDepartmentByIdHandler,
} from './index'

const router = express.Router()

router.route('/').get(getDepartmentsHandler).post(addDepartmentHandler)
router
  .route('/:id')
  .get(getSingleDepartmentByIdHandler)
  .patch(editDepartmentHandler)
  .delete(deleteDepartmentHandler)

export default router

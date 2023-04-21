import express from 'express'
import {
  addRoleHandler,
  deleteRoleHandler,
  editRoleHandler,
  getRolesHandler,
  getSingleRoleByIdHandler,
} from './index'

const router = express.Router()

router.route('/').get(getRolesHandler).post(addRoleHandler)
router
  .route('/:id')
  .get(getSingleRoleByIdHandler)
  .patch(editRoleHandler)
  .delete(deleteRoleHandler)

export default router

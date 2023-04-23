import express from 'express'
import {
  addCellHandler,
  addLeaderToCellHandler,
  deleteCellHandler,
  editCellHandler,
  getCellsHandler,
  getSingleCellByIdHandler,
} from './index'
import { UserRole, authorizedRoles } from '../user'

const router = express.Router()

router
  .route('/')
  .get(authorizedRoles(UserRole.Leader), getCellsHandler)
  .post(authorizedRoles(), addCellHandler)

router
  .route('/:id')
  .get(authorizedRoles(UserRole.Leader), getSingleCellByIdHandler)
  .patch(authorizedRoles(), editCellHandler)
  .delete(authorizedRoles(), deleteCellHandler)

router.route('/:id/add-leader').post(authorizedRoles(), addLeaderToCellHandler)

export default router

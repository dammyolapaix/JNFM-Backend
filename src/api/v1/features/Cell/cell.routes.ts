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
  .get(authorizedRoles([UserRole.Admin, UserRole.Leader]), getCellsHandler)
  .post(authorizedRoles([UserRole.Admin]), addCellHandler)

router
  .route('/:id')
  .get(
    authorizedRoles([UserRole.Admin, UserRole.Leader]),
    getSingleCellByIdHandler
  )
  .patch(authorizedRoles([UserRole.Admin]), editCellHandler)
  .delete(authorizedRoles([UserRole.Admin]), deleteCellHandler)

router
  .route('/:id/add-leader')
  .post(authorizedRoles([UserRole.Admin]), addLeaderToCellHandler)

export default router

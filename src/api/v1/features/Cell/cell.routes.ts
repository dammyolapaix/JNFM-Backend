import express from 'express'
import {
  addCellHandler,
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

export default router

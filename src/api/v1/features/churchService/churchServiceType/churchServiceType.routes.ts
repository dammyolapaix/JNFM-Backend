import express from 'express'
import {
  addChurchServiceTypeHandler,
  deleteChurchServiceTypeHandler,
  editChurchServiceTypeHandler,
  getChurchServiceTypesHandler,
  getSingleChurchServiceTypeByIdHandler,
} from './index'

const router = express.Router()

router
  .route('/')
  .get(getChurchServiceTypesHandler)
  .post(addChurchServiceTypeHandler)

router
  .route('/:id')
  .get(getSingleChurchServiceTypeByIdHandler)
  .patch(editChurchServiceTypeHandler)
  .delete(deleteChurchServiceTypeHandler)

export default router

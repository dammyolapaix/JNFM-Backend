import express from 'express'
import {
  addSpecialContributionHandler,
  deleteSpecialContributionHandler,
  editSpecialContributionHandler,
  getSpecialContributionsHandler,
  getSingleSpecialContributionByIdHandler,
} from './index'

const router = express.Router()

router
  .route('/')
  .get(getSpecialContributionsHandler)
  .post(addSpecialContributionHandler)

router
  .route('/:id')
  .get(getSingleSpecialContributionByIdHandler)
  .patch(editSpecialContributionHandler)
  .delete(deleteSpecialContributionHandler)

export default router

import express from 'express'
import {
  addAttendanceHandler,
  deleteAttendanceHandler,
  editAttendanceHandler,
  getAttendancesHandler,
  getSingleAttendanceByIdHandler,
} from './index'

const router = express.Router({ mergeParams: true })

router.route('/').get(getAttendancesHandler).post(addAttendanceHandler)

router
  .route('/:id')
  .get(getSingleAttendanceByIdHandler)
  .patch(editAttendanceHandler)
  .delete(deleteAttendanceHandler)

export default router

import express from 'express'
import { churchServiceRoutes } from '../features/churchService'
import { memberRoutes } from '../features/member'
import { attendanceRoutes } from '../features/attendance'

const router = express.Router()

router.use('/api/v1/attendances', attendanceRoutes)
router.use('/api/v1/churchServices', churchServiceRoutes)
router.use('/api/v1/members', memberRoutes)

export default router

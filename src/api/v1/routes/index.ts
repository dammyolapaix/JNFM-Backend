import express from 'express'
import { churchServiceRoutes } from '../features/churchService'
import { memberRoutes } from '../features/member'
import { attendanceRoutes } from '../features/attendance'
import { departmentRoutes } from '../features/department'
import { cellRoutes } from '../features/cell'

const router = express.Router()

router.use('/api/v1/attendances', attendanceRoutes)
router.use('/api/v1/cells', cellRoutes)
router.use('/api/v1/churchServices', churchServiceRoutes)
router.use('/api/v1/departments', departmentRoutes)
router.use('/api/v1/members', memberRoutes)

export default router

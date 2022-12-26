import express from 'express'
import { churchServiceRoutes } from '../features/churchService'
import { memberRoutes } from '../features/member'
import { attendanceRoutes } from '../features/attendance'
import { departmentRoutes } from '../features/department'
import { cellRoutes } from '../features/cell'
import { WelfareRoutes } from '../features/welfare'

const router = express.Router()

router.use('/api/v1/attendances', attendanceRoutes)
router.use('/api/v1/cells', cellRoutes)
router.use('/api/v1/churchServices', churchServiceRoutes)
router.use('/api/v1/departments', departmentRoutes)
router.use('/api/v1/members', memberRoutes)
router.use('/api/v1/welfares', WelfareRoutes)

export default router

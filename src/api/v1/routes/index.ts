import express from 'express'
import { churchServiceRoutes } from '../features/churchService'
import { memberRoutes } from '../features/member'
import { attendanceRoutes } from '../features/attendance'
import { churchServiceTypeRoutes } from '../features/churchService/churchServiceType'
import { departmentRoutes } from '../features/department'
import { cellRoutes } from '../features/cell'
import { WelfareRoutes } from '../features/welfare'
import { titheRoutes } from '../features/tithe'
import { specialContributionRoutes } from '../features/specialContribution'
import { offeringRoutes } from '../features/offering'
import { offeringTypeRoutes } from '../features/offering/offeringType'
import { expenditureRoutes } from '../features/expenditure'
import { expenditureCategoryRoutes } from '../features/expenditure/expenditureCategory'
import { incomeRoutes } from '../features/income'

const router = express.Router()

router.use('/api/v1/attendances', attendanceRoutes)
router.use('/api/v1/cells', cellRoutes)
router.use('/api/v1/churchServices', churchServiceRoutes)
router.use('/api/v1/churchServiceTypes', churchServiceTypeRoutes)
router.use('/api/v1/expenditures', expenditureRoutes)
router.use('/api/v1/expenditureCategories', expenditureCategoryRoutes)
router.use('/api/v1/departments', departmentRoutes)
router.use('/api/v1/incomes', incomeRoutes)
router.use('/api/v1/members', memberRoutes)
router.use('/api/v1/offerings', offeringRoutes)
router.use('/api/v1/offeringTypes', offeringTypeRoutes)
router.use('/api/v1/specialContributions', specialContributionRoutes)
router.use('/api/v1/tithes', titheRoutes)
router.use('/api/v1/welfares', WelfareRoutes)

export default router

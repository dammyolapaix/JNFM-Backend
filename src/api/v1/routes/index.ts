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
import { cashBookRoutes } from '../features/cashBook'
import { protectRoute, userRoutes } from '../features/user'

const router = express.Router()

router.use('/api/v1/attendances', protectRoute, attendanceRoutes)
router.use('/api/v1/auth', userRoutes)
router.use('/api/v1/cells', protectRoute, cellRoutes)
router.use('/api/v1/cashBooks', protectRoute, cashBookRoutes)
router.use('/api/v1/churchServices', protectRoute, churchServiceRoutes)
router.use('/api/v1/churchServiceTypes', protectRoute, churchServiceTypeRoutes)
router.use('/api/v1/expenditures', protectRoute, expenditureRoutes)
router.use(
  '/api/v1/expenditureCategories',
  protectRoute,
  expenditureCategoryRoutes
)
router.use('/api/v1/departments', protectRoute, departmentRoutes)
router.use('/api/v1/incomes', protectRoute, incomeRoutes)
router.use('/api/v1/members', protectRoute, memberRoutes)
router.use('/api/v1/offerings', protectRoute, offeringRoutes)
router.use('/api/v1/offeringTypes', protectRoute, offeringTypeRoutes)
router.use('/api/v1/specialContributions', specialContributionRoutes)
router.use('/api/v1/tithes', protectRoute, titheRoutes)
router.use('/api/v1/welfares', protectRoute, WelfareRoutes)

export default router

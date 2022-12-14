import express from 'express'
import { memberRoutes } from '../features/member'

const router = express.Router()

router.use('/api/v1/members', memberRoutes)

export default router

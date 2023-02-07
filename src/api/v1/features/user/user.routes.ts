import express from 'express'
import { registerUserHandler } from './index'

const router = express.Router()

router.post('/register', registerUserHandler)

export default router

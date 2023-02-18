import express from 'express'
import { loginUserHandler, registerUserHandler } from './index'

const router = express.Router()

router.post('/register', registerUserHandler)
router.post('/login', loginUserHandler)

export default router

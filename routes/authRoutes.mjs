import express, { Router } from 'express'

import { registerAdmin, loginAdmin } from '../controllers/authController.mjs'

const authRouter = Router()

authRouter.post('/register', registerAdmin)
authRouter.post('/login', loginAdmin)

export default authRouter
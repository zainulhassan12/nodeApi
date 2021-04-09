import express from 'express';
import { getUsers, createAuthUser, authenticateUser } from '../contollers/Auth.js';
import auth from '../contollers/middlewares/auth.js'

const router = express.Router()
router.get('/', auth, getUsers)
router.post('/', createAuthUser)
router.post('/login', authenticateUser)




export default router
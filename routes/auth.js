import express from 'express';
import { getUsers, createAuthUser, authenticateUser } from '../contollers/Auth.js';


const router = express.Router()
router.get('/', getUsers)
router.post('/', createAuthUser)
router.post('/login', authenticateUser)




export default router
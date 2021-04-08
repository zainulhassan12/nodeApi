import express from 'express';
import { getUsers, createAuthUser } from '../contollers/Auth.js';


const router = express.Router()
router.get('/', getUsers)
router.post('/', createAuthUser)



export default router
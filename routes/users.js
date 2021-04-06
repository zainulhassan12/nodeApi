import express from 'express';
import bodyParsers from 'body-parser';
import { v4 as uuidv4 } from 'uuid';
import { getUser, createUser, deleteUser, updateUser, getUsers } from '../contollers/users.js'

const router = express.Router();

router.get('/', getUsers);
router.post('/', createUser);
router.get('/:id', getUser);
router.delete('/:id', deleteUser);
router.patch('/:id', updateUser);
export default router;
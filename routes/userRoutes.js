import { Router } from 'express';
import { UserController } from '../controller/userController.js';

const router = Router();

// Maps internally to /users (and when combined with app.js it becomes /api/practice/users)
router.get('/', UserController.getUsers);

export default router;

import { Router } from 'express';
import * as userController from '../logic/userController.js';

const router = Router();

router.post('/', userController.createUser);

export default router;
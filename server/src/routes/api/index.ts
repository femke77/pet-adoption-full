import { Router } from 'express';
import { apiGuard } from '../../middleware/authGuard.js';
import { userRouter } from './user-routes.js';
import { petRouter } from './pet-routes.js';

const router = Router();

router.use('/users', apiGuard, userRouter);
router.use('/pets', petRouter);


export default router;

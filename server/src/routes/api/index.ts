import { Router } from 'express';
import { apiGuard } from '../../middleware/authGuard.js';
import { userRouter } from './user-routes.js';
import { petRouter } from './pet-routes.js';

const router = Router();

router.use('/users', apiGuard, userRouter);
router.use('/pets', petRouter);

router.use((req, _res, next) => {
  console.log('Incoming request session:', {
    sessionId: req.sessionID,
    isLoggedIn: req.session?.logged_in,
    userId: req.session?.user_id,
  });
  next();
});

export default router;

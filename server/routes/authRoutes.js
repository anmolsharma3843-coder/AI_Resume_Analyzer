import {Router} from 'express'
import { getMe, registerUser, userLogin, userLogout } from '../controllers/authController.js';
import { isAuthenticated } from '../middleware/authMiddleware.js';

const router=Router();

router.post('/register',registerUser)
router.post('/login',userLogin)
router.post('/logout',userLogout)
router.get("/me", isAuthenticated, getMe);

export default router;
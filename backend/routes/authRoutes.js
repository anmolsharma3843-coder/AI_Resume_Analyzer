import {Router} from 'express'
import { registerUser, userLogin } from '../controllers/authcontroller.js';
import { isAuthenticated } from '../middleware/authMiddleware.js';

const router=Router();

router.post('/register',registerUser)
router.post('/login',userLogin)
export default router;
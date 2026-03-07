import { Router } from 'express';
import { celebrate } from 'celebrate';
import { loginUser, registerUser } from '../controllers/authController.js';
import { loginUserSchema, registerUserSchema } from '../validations/authValidation.js';
import { refreshUserSession } from '../controllers/authController.js';
import { logoutUser } from '../controllers/authController.js';

const router = Router();

router.post('/register', celebrate(registerUserSchema), registerUser);
router.post('/login', celebrate(loginUserSchema), loginUser);
router.post('/refresh', refreshUserSession);
router.post('/logout', logoutUser);

export default router;

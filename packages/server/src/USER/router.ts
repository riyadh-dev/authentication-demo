import { Router } from 'express';
import {
	authenticate,
	csrfLogin,
	csrfProtection,
	validateInput,
} from '../common/middlewares';
import { createUser, login, logout, protectedSource } from './controllers';
import { validationSchema } from './validation';

const router = Router();

router.post('/create', validateInput(validationSchema), createUser);
router.post('/login', csrfLogin, validateInput(validationSchema), login);
router.post('/protected', csrfProtection, authenticate, protectedSource);
router.delete('/logout', logout);

export default router;

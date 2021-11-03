import csurf from 'csurf';
import { Router } from 'express';
import { validateInput } from '../common/middlewares';
import { createUser, login } from './controllers';
import { validationSchema } from './validation';

const router = Router();

const LoginCsurf = csurf({
	ignoreMethods: ['POST'],
	cookie: {
		httpOnly: true,
		signed: true,
		secure: true,
	},
});

router.post('/create', validateInput(validationSchema), createUser);
router.post('/login', LoginCsurf, validateInput(validationSchema), login);

export default router;

import { Router } from 'express';
import { validateInput } from '../common/middlewares';
import { createUser } from './controllers';
import { validationSchema } from './validation';

const router = Router();

router.post('/create', validateInput(validationSchema), createUser);

export default router;
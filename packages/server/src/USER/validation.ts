import Joi from 'joi';
import { IUser } from './interfaces';

export const validationSchema = Joi.object<IUser>({
	id: Joi.string().optional(),
	username: Joi.string().required(),
	password: Joi.string().required(),
});

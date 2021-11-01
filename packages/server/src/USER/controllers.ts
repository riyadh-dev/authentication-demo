import { Request, Response } from 'express';
import { IErrorHandler, isErrorWithCode } from '../common/interfaces';
import { catchAsyncMiddlewareError } from '../common/middlewares';
import { userModel } from './model';

const createUserErrorHandler: IErrorHandler = (error, res) => {
	console.log(error.message);
	if (isErrorWithCode(error)) {
		if (error.code === 11000) {
			res.status(500).json({
				error: 'username already used',
			});
			return;
		}
	}

	res.status(500).json({
		error: 'internal server error',
	});
};

const createUserUnsafe = async (req: Request, res: Response) => {
	await userModel.create(res.locals.validatedBody);
	res.status(200).json({
		success: 'user created successfully',
	});
};

export const createUser = catchAsyncMiddlewareError(createUserUnsafe, createUserErrorHandler);
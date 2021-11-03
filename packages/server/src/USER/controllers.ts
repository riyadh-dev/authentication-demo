import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { IErrorHandler, isErrorWithCode } from '../common/interfaces';
import { catchAsyncMiddlewareError } from '../common/middlewares';
import { IUser } from './interfaces';
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

const loginUnsafe = async (req: Request, res: Response) => {
	const bodyUser: IUser = res.locals.validatedBody;
	const userDoc = await userModel.findOne({ username: bodyUser.username });
	if (!userDoc) {
		res.status(400).json({ error: 'wrong password or username' });
		return;
	}

	const { password, ...payload } = userDoc.toObject({ versionKey: false });
	const isPasswordCorrect = bcrypt.compareSync(bodyUser.password, password);
	if (!isPasswordCorrect) {
		res.status(400).json({ error: 'wrong password or username' });
		return;
	}

	const jwtToken = jwt.sign(payload, 'secret');
	res.cookie('token', jwtToken, {
		httpOnly: true,
		signed: true,
		secure: true,
	});

	const csrfToken = req.csrfToken();
	res.status(200).json({
		...payload,
		csrfToken,
	});
};

export const login = catchAsyncMiddlewareError(loginUnsafe);

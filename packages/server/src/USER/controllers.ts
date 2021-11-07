import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { isProd, JWT_SECRET } from '../util/secrets';
import {
	IAsyncMiddleware,
	IErrorHandler,
	IMiddleware,
	isErrorWithCode,
} from '../common/interfaces';
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

const createUserUnsafe: IAsyncMiddleware = async (req, res) => {
	await userModel.create(res.locals.validatedBody);
	res.status(200).json({
		success: 'user created successfully',
	});
};

export const createUser = catchAsyncMiddlewareError(
	createUserUnsafe,
	createUserErrorHandler
);

const loginUnsafe: IAsyncMiddleware = async (req, res) => {
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

	const jwtToken = jwt.sign(payload, JWT_SECRET);
	res.cookie('token', jwtToken, {
		httpOnly: true,
		signed: true,
		secure: isProd,
		sameSite: 'strict',
	});

	const csrfToken = req.csrfToken();
	res.status(200).json({
		...payload,
		csrfToken,
	});
};

export const login = catchAsyncMiddlewareError(loginUnsafe);

export const protectedSource: IMiddleware = (req, res) => {
	res.status(200).json({ success: 'request to protected route succeeded' });
};

export const logout: IMiddleware = (req, res) => {
	res.clearCookie('token');
	res.status(200).json({ success: 'logout successful' });
};

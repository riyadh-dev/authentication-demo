import csurf from 'csurf';
import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import jwt from 'jsonwebtoken';
import {
	IAsyncMiddleware,
	IErrorHandler,
	IMiddleware,
	isErrorWithCode,
} from './interfaces';

export const validateInput =
	(validationSchema: Joi.ObjectSchema): IMiddleware =>
	(req, res, next) => {
		const { error, value } = validationSchema.validate(req.body);
		if (error !== undefined) {
			res.status(400).json({
				error: 'validation error',
			});
			return;
		}

		res.locals.validatedBody = value;
		next();
	};

const genericErrorHandler: IErrorHandler = (error, res) => {
	console.log(error.message);
	res.status(500).json({
		error: 'internal server error',
	});
};

export const catchAsyncMiddlewareError =
	(fn: IAsyncMiddleware, errorHandler?: IErrorHandler): IAsyncMiddleware =>
	(req, res, next) =>
		fn(req, res, next).catch((error) =>
			errorHandler === undefined
				? genericErrorHandler(error, res)
				: errorHandler(error, res)
		);

export const csrfLogin = csurf({
	ignoreMethods: ['POST'],
	cookie: {
		httpOnly: true,
		signed: true,
		//secure: true,
	},
});

export const csrfProtection = csurf({
	cookie: {
		httpOnly: true,
		signed: true,
		//secure: true,
	},
});

export const authenticate: IMiddleware = (req, res, next) => {
	try {
		res.locals.currentUser = jwt.verify(req.signedCookies.token, 'secret');
		res.clearCookie('token');
		next();
	} catch (_error) {
		res.clearCookie('token');
		res.status(403).json({ error: 'invalid token' });
	}
};

export const handlePassedError = (
	error: Error,
	_req: Request,
	res: Response,
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	_next: NextFunction
) => {
	if (isErrorWithCode(error)) {
		if (error.code === 'EBADCSRFTOKEN') {
			res.clearCookie('token');
			res.status(403).json({ error: 'form tampered with' });
			return;
		}
	}
	if (error instanceof Error) {
		console.log(error.message);
		res.status(500).json({
			error: 'internal server error',
		});
		return;
	}
};

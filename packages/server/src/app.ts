import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import { isErrorWithCode } from './common/interfaces';
import userRouter from './USER/router';

const app = express();

app.use(express.json());
app.use(cookieParser('cookie secret'));
app.use(helmet());
app.use(cors({
	origin: 'http://localhost:5000',
	credentials: true
}));

app.use('/user', userRouter);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: Error, _req: Request, res: Response, next: NextFunction) => {
	if (isErrorWithCode(error)) {
		if (error.code === 'EBADCSRFTOKEN') 
			res.status(403).send('form tampered with');
		return;
	}
	if (error instanceof Error) {
		console.log('type', typeof error);	
		console.log(error.message);
		res.status(500).json({
			error: 'internal server error'
		});
		return;
	}
});

export default app;

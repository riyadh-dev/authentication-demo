import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { handlePassedError } from './common/middlewares';
import userRouter from './USER/router';

const app = express();

app.use(express.json());
app.use(cookieParser('cookie secret'));
app.use(helmet());
app.use(
	cors({
		origin: 'http://localhost:5000',
		credentials: true,
	})
);

app.use('/user', userRouter);

app.use(handlePassedError);

export default app;

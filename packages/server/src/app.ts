import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { handlePassedError } from './common/middlewares';
import userRouter from './USER/router';
import { CLIENT_ORIGIN, COOKIE_SECRET } from './util/secrets';

const app = express();

app.use(express.json());
app.use(cookieParser(COOKIE_SECRET));
app.use(helmet());
app.use(
	cors({
		origin: CLIENT_ORIGIN,
		credentials: true,
	})
);

app.use('/user', userRouter);

app.use(handlePassedError);

export default app;

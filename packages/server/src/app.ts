import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import path from 'path';
import { handlePassedError } from './common/middlewares';
import userRouter from './USER/router';
import { CLIENT_ORIGIN, COOKIE_SECRET } from './util/secrets';

const app = express();

app.use(express.json());
app.use(cookieParser(COOKIE_SECRET));
app.use(helmet({ contentSecurityPolicy: false }));
app.use(
	cors({
		origin: CLIENT_ORIGIN,
		credentials: true,
	})
);

app.use('/api/user', userRouter);

app.use(express.static(path.join(__dirname, '../../client/build')));
app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname, '../../client/build', 'index.html'));
});

app.use(handlePassedError);

export default app;

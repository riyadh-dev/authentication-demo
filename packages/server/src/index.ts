import app from './app';
import { dbBootstrap } from './db';
import { catchAsyncErrors } from './util/helpers';
import { SERVER_PORT } from './util/secrets';

const mainUnsafe = async () => {
	await dbBootstrap();

	app.listen(SERVER_PORT, () => {
		console.log(`Example app listening at http://localhost:${SERVER_PORT}`);
	});
};

const main = catchAsyncErrors(mainUnsafe);

main();

import app from './app';
import { catchAsyncErrors } from './common/helpers';
import { dbBootstrap } from './db';
const port = 4000;

const mainUnsafe = async () => {
	await dbBootstrap();
	
	app.listen(port, () => {
		console.log(`Example app listening at http://localhost:${port}`);
	});	
};

const main = catchAsyncErrors(mainUnsafe);

main();
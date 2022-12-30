import app from './app';
import { dbBootstrap } from './db';
import { catchAsyncErrors } from './util/helpers';
import { PORT } from './util/secrets';

const mainUnsafe = async () => {
	await dbBootstrap();

	app.listen(PORT, () => {
		console.log(`Server 🚀 At PORT: ${PORT}`);
	});
};

const main = catchAsyncErrors(mainUnsafe);

main();

export const catchAsyncErrors =
	<TArgs extends unknown[], TReturn>(
		fn: (...args: TArgs) => Promise<TReturn>
	) =>
	(...args: TArgs) => {
		fn(...args).catch((error) => console.log(error.message));
	};

import { connect } from 'mongoose';
import { MONGODB_URI } from './util/secrets';

export const dbBootstrap = async () => {
	await connect(MONGODB_URI);
	console.log('Connected to DB');
};

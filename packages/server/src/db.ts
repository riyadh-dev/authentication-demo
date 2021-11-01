import { connect } from 'mongoose';

export const dbBootstrap = async () => {
	await connect('mongodb://localhost:27017/auth-demo');
	console.log('Connected to DB');
};
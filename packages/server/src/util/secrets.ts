import dotenv from 'dotenv';
import fs from 'fs';

export const ENVIRONMENT = process.env.NODE_ENV ?? '';
export const isProd = ENVIRONMENT === 'production';

if (fs.existsSync('.env')) {
	console.log('Using .env file to supply config environment variables');
	dotenv.config({ path: '.env' });
} else if (isProd) {
	console.log('Using process.env to supply config environment variables');
} else {
	console.log('Using .env.example file to supply config environment variables');
	dotenv.config({ path: '.env.example' });
}

export const JWT_SECRET = process.env['JWT_SECRET'] ?? '';
export const MONGODB_URI = process.env['MONGODB_URI'] ?? '';
export const SERVER_PORT = process.env['PORT'] ?? '';
export const COOKIE_SECRET = process.env['COOKIE_SECRET'] ?? '';
export const CLIENT_ORIGIN = process.env['CLIENT_ORIGIN'] ?? '';

if (!JWT_SECRET) {
	console.error('No jwt secret. Set JWT_SECRET environment variable.');
	process.exit(1);
}
if (!MONGODB_URI) {
	console.error(
		'No mongo connection string. Set MONGODB_URI environment variable.'
	);
	process.exit(1);
}
if (!SERVER_PORT) {
	console.error('No server port. Set SERVER_PORT environment variable.');
	process.exit(1);
}
if (!COOKIE_SECRET) {
	console.error(
		'No cookie secret string. Set COOKIE_SECRET environment variable.'
	);
	process.exit(1);
}
if (!CLIENT_ORIGIN) {
	console.error(
		'No client origin string. Set CLIENT_ORIGIN environment variable.'
	);
	process.exit(1);
}

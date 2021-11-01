import bcrypt from 'bcryptjs';
import { Document, model, Schema } from 'mongoose';
import { IUser } from './interfaces';

const userSchema = new Schema<IUser>({
	username: { type: String, unique: true },
	password: String,
});

userSchema.virtual('id').get(function (this: Document) {
	return this._id.toString();
});

userSchema.pre<IUser>('save', function (next) {
	const salt = bcrypt.genSaltSync(10);
	this.password = bcrypt.hashSync(this.password, salt);
	next();
});

export const userModel = model('User', userSchema);

import { ICurrentUser } from './interfaces';

export const getCurrentUser = (): ICurrentUser | null => {
	const currentUserStr = localStorage.getItem('currentUser');
	return currentUserStr ? JSON.parse(currentUserStr) : null;
};

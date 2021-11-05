export interface IFormValues {
	username: string;
	password: string;
}

export interface ICurrentUser {
	_id: string;
	username: string;
	csrfToken: string;
}

export interface ICurrentUserContext {
	currentUser: ICurrentUser | null;
	setCurrentUser: React.Dispatch<React.SetStateAction<ICurrentUser | null>>;
	logout: () => void;
}

export interface IProtectedRes {
	error?: string;
	success?: string;
}

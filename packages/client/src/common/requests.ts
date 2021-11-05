import axios from 'axios';
import { ICurrentUser, IFormValues } from './interfaces';

const server_domain = 'http://localhost:4000';

export const loginReq = async (user: IFormValues) => {
	const { data } = await axios.post(`${server_domain}/user/login`, user, {
		withCredentials: true,
	});
	return data;
};

export const logoutReq = async () => {
	const { data } = await axios.delete(`${server_domain}/user/logout`, {
		withCredentials: true,
	});
	return data;
};

export const protectedReq = (currentUser: ICurrentUser | null) => async () => {
	if (!currentUser) {
		throw new Error('not logged in');
	}
	const { data } = await axios.post(
		`${server_domain}/user/protected`,
		{},
		{ withCredentials: true, headers: { 'CSRF-TOKEN': currentUser.csrfToken } }
	);
	return data;
};

export const signUpReq = async (user: IFormValues) => {
	const { data } = await axios.post(`${server_domain}/user/create`, user);
	return data;
};

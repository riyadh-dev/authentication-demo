import axios from 'axios';
import { API_ORIGIN } from '../constants/envVars';
import { ICurrentUser, IFormValues } from './interfaces';

export const axiosInstance = axios.create({
	baseURL: API_ORIGIN,
});

export const loginReq = async (user: IFormValues) => {
	const { data } = await axiosInstance.post('/user/login', user, {
		withCredentials: true,
	});
	return data;
};

export const logoutReq = async () => {
	const { data } = await axiosInstance.delete('/user/logout', {
		withCredentials: true,
	});
	return data;
};

export const protectedReq = (currentUser: ICurrentUser | null) => async () => {
	if (!currentUser) {
		throw new Error('not logged in');
	}
	const { data } = await axiosInstance.post('/user/protected', null, {
		withCredentials: true,
		headers: { 'CSRF-TOKEN': currentUser.csrfToken },
	});
	return data;
};

export const signUpReq = async (user: IFormValues) => {
	const { data } = await axiosInstance.post('/user/create', user);
	return data;
};

import { Flex, useColorModeValue, Wrap, WrapItem } from '@chakra-ui/react';
import axios from 'axios';
import React, { createContext, useState } from 'react';
import { useMutation } from 'react-query';
import Footer from './Footer';
import Login from './Login';
import Navbar from './Navbar';
import Protected from './Protected';
import SignUp from './SignUp';

export interface ICurrentUser {
	_id: string;
	username: string;
	csrfToken: string;
}

const getCurrentUser = (): ICurrentUser | null => {
	const currentUserStr = localStorage.getItem('currentUser');
	return currentUserStr ? JSON.parse(currentUserStr) : null;
};

interface ICurrentUserContext {
	currentUser: ICurrentUser | null;
	setCurrentUser: React.Dispatch<React.SetStateAction<ICurrentUser | null>>;
	logout: () => void;
}
export const CurrentUserContext = createContext<ICurrentUserContext>(
	{} as ICurrentUserContext
);

const logoutReq = async () => {
	const { data } = await axios.delete('http://localhost:4000/user/logout', {
		withCredentials: true,
	});
	return data;
};

const Main = () => {
	const mainBg = useColorModeValue('gray.100', 'gray.800');

	const [currentUser, setCurrentUser] = useState(getCurrentUser);
	const { mutate } = useMutation(logoutReq);
	const logout = () => {
		localStorage.removeItem('currentUser');
		setCurrentUser(null);
		mutate();
	};
	return (
		<CurrentUserContext.Provider
			value={{ currentUser, setCurrentUser, logout }}
		>
			<Flex
				w='full'
				minH='100vh'
				align='center'
				justify='space-between'
				alignItems='stretch'
				bg={mainBg}
				direction='column'
			>
				<Navbar />
				<Wrap spacing={6} justify='center'>
					<WrapItem minW={['22em', 'md']}>
						<SignUp />
					</WrapItem>
					<WrapItem minW={['22em', 'md']}>
						<Login />
					</WrapItem>
					<WrapItem minW={['22em', 'md']}>
						<Protected />
					</WrapItem>
				</Wrap>
				<Footer />
			</Flex>
		</CurrentUserContext.Provider>
	);
};

export default Main;

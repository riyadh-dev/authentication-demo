import { Flex, useColorModeValue, Wrap, WrapItem } from '@chakra-ui/react';
import React, { useState } from 'react';
import { CurrentUserContext } from '../common/contexts';
import { getCurrentUser } from '../common/helpers';
import { logoutReq } from '../common/requests';
import Footer from './Footer';
import Login from './Login';
import Navbar from './Navbar';
import Protected from './Protected';
import SignUp from './SignUp';

const Main = () => {
	const mainBg = useColorModeValue('gray.100', 'gray.800');

	const [currentUser, setCurrentUser] = useState(getCurrentUser);
	const logout = () => {
		localStorage.removeItem('currentUser');
		setCurrentUser(null);
		logoutReq();
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

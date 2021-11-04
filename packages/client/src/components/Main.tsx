import { Flex, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import Login from './Login';
import Protected from './Protected';
import SignUp from './SignUp';

const Main = () => {
	const mainBg = useColorModeValue('gray.100', 'gray.800');

	return (
		<Flex minH='100vh' align='center' justify='center' bg={mainBg}>
			<SignUp />
			<Login />
			<Protected />
		</Flex>
	);
};

export default Main;

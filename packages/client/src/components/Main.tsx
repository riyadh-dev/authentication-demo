import { Flex, Heading, useColorModeValue, Wrap, WrapItem } from '@chakra-ui/react';
import React from 'react';
import Footer from './Footer';
import Login from './Login';
import Protected from './Protected';
import SignUp from './SignUp';

const Main = () => {
	const mainBg = useColorModeValue('gray.100', 'gray.800');

	return (
		<Flex
			w='full'
			minH='100vh'
			align='center'
			alignItems='stretch'
			justify='space-between'
			bg={mainBg}
			direction='column'
		>
			<Heading
				pt={10}
				color='green.400'
				textAlign='center'
				lineHeight={1.1}
				fontSize={{ base: '3xl', md: '3xl' }}
			>
				Authentication Demo
			</Heading>
			<Wrap w='full' spacing={5} align='center' justify='center' alignItems='stretch'>
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
	);
};

export default Main;

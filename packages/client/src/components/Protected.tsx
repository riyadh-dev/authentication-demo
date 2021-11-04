import { CheckCircleIcon, WarningIcon } from '@chakra-ui/icons';
import { Button, Heading, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import axios, { AxiosError, AxiosResponse } from 'axios';
import React from 'react';
import { useQuery } from 'react-query';

interface IProtectedRes {
	error?: string;
	success?: string;
}

const protectedReq = async () => {
	const csrfToken = localStorage.getItem('csrfToken');
	if (!csrfToken) {
		throw new Error('not logged in');
	}
	const { data } = await axios.post(
		'http://localhost:4000/user/protected',
		{},
		{ withCredentials: true, headers: { 'CSRF-TOKEN': csrfToken } }
	);
	return data;
};

const Login = () => {
	const { data, isLoading, isSuccess, isError, refetch, error, remove } = useQuery<
		AxiosResponse,
		AxiosError,
		IProtectedRes
	>('protected', protectedReq, { enabled: false });

	const onClick: React.MouseEventHandler<HTMLButtonElement> = () => {
		remove();
		refetch();
	};

	const formBg = useColorModeValue('white', 'gray.700');

	const errMsg = error?.response ? error?.response?.data.error : error?.message;
	return (
		<Stack spacing={6} w='full' maxW='md' bg={formBg} rounded='xl' boxShadow='lg' p={6} my={12}>
			<Heading textAlign='center' lineHeight={1.1} fontSize={{ base: 'xl', md: '2xl' }}>
				Protected
			</Heading>
			{isError && <WarningIcon color='red.400' alignSelf='center' boxSize={20} />}
			{isSuccess && <CheckCircleIcon color='green.400' alignSelf='center' boxSize={20} />}
			<Text textAlign='center' lineHeight={1.1} fontSize={{ base: 'xl', md: '2xl' }}>
				{errMsg}
				{data?.success}
			</Text>
			<Button isLoading={isLoading} colorScheme='green' onClick={onClick}>
				Request
			</Button>
		</Stack>
	);
};

export default Login;

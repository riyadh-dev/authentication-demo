import { CheckCircleIcon, WarningIcon, WarningTwoIcon } from '@chakra-ui/icons';
import {
	Button,
	Flex,
	Heading,
	Text,
	useColorModeValue,
} from '@chakra-ui/react';
import { AxiosError, AxiosResponse } from 'axios';
import React, { useContext } from 'react';
import { useQuery } from 'react-query';
import { CurrentUserContext } from '../common/contexts';
import { IProtectedRes } from '../common/interfaces';
import { protectedReq } from '../common/requests';
import {} from './Main';

const Login = () => {
	const { currentUser } = useContext(CurrentUserContext);

	const { data, isLoading, isSuccess, isError, refetch, error, remove } =
		useQuery<AxiosResponse, AxiosError, IProtectedRes>(
			'protected',
			protectedReq(currentUser),
			{ enabled: false }
		);

	const onClick: React.MouseEventHandler<HTMLButtonElement> = () => {
		remove();
		refetch();
	};

	const formBg = useColorModeValue('white', 'gray.700');

	const errMsg = error?.response ? error?.response?.data.error : error?.message;
	return (
		<Flex
			align='center'
			justify='space-between'
			alignItems='stretch'
			direction='column'
			w='full'
			h='19.57em'
			bg={formBg}
			rounded='xl'
			boxShadow='lg'
			p={6}
		>
			<Heading
				textAlign='center'
				lineHeight={1.1}
				fontSize={{ base: 'xl', md: '2xl' }}
			>
				Protected
			</Heading>
			{isError && (
				<WarningIcon color='red.400' alignSelf='center' boxSize={20} />
			)}
			{isSuccess && (
				<CheckCircleIcon color='green.400' alignSelf='center' boxSize={20} />
			)}
			{!isError && !isSuccess && (
				<WarningTwoIcon color='yellow.400' alignSelf='center' boxSize={20} />
			)}
			{(isError || isSuccess) && (
				<Text
					textAlign='center'
					lineHeight={1.1}
					fontSize={{ base: 'xl', md: '2xl' }}
				>
					{errMsg}
					{data?.success}
				</Text>
			)}
			<Button isLoading={isLoading} colorScheme='green' onClick={onClick}>
				Request
			</Button>
		</Flex>
	);
};

export default Login;

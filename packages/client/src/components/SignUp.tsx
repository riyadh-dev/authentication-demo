import { CheckCircleIcon } from '@chakra-ui/icons';
import {
	Button,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Heading,
	Input,
	Stack,
	useColorModeValue,
} from '@chakra-ui/react';
import axios, { AxiosError, AxiosResponse } from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';

interface IFormValues {
	username: string;
	password: string;
}

const addUserReq = async (user: IFormValues) => {
	const { data } = await axios.post('http://localhost:4000/user/create', user);
	return data;
};

const SignUp = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		setError,
	} = useForm<IFormValues>();

	const onError = (err: AxiosError) => {
		const errMsg = err?.response?.data.error;
		if (errMsg === 'username already used') setError('username', { message: errMsg });
	};

	const { mutate, isLoading, isSuccess, reset } = useMutation<
		AxiosResponse,
		AxiosError,
		IFormValues
	>(addUserReq, {
		onError,
	});

	const onSubmit = (user: IFormValues) => {
		mutate(user);
	};

	const formBg = useColorModeValue('white', 'gray.700');

	if (isSuccess)
		return (
			<Stack spacing={10} maxW='md' bg={formBg} rounded='xl' boxShadow='lg' p={6} my={12}>
				<Heading textAlign='center' lineHeight={1.1} fontSize={{ base: 'xl', md: '2xl' }}>
					Sign Up Successful
				</Heading>
				<CheckCircleIcon color='green.400' alignSelf='center' boxSize={20} />
				<Button colorScheme='green' onClick={() => reset()}>
					Create Another User
				</Button>
			</Stack>
		);

	const usernameValidationRules = {
		minLength: { value: 4, message: 'username too short' },
		required: { value: true, message: 'this field is required' },
	};

	const passwordValidationRules = {
		minLength: { value: 8, message: 'password too short' },
		required: { value: true, message: 'this field is required' },
	};

	return (
		<Stack spacing={4} w='full' maxW='md' bg={formBg} rounded='xl' boxShadow='lg' p={6} my={12}>
			<Heading textAlign='center' lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
				Sign Up
			</Heading>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Stack spacing={4}>
					<FormControl id='username' isInvalid={Boolean(errors.username)} isDisabled={isLoading}>
						<FormLabel>Username</FormLabel>
						<Input
							{...register('username', usernameValidationRules)}
							focusBorderColor='teal.300'
							type='text'
						/>
						<FormErrorMessage>{errors.username?.message}</FormErrorMessage>
					</FormControl>
					<FormControl id='password' isInvalid={Boolean(errors.password)} isDisabled={isLoading}>
						<FormLabel>Password</FormLabel>
						<Input
							{...register('password', passwordValidationRules)}
							focusBorderColor='teal.300'
							type='password'
						/>
						<FormErrorMessage>{errors.password?.message}</FormErrorMessage>
					</FormControl>
					<Stack spacing={6}>
						<Button isLoading={isLoading} type='submit' colorScheme='green'>
							Submit
						</Button>
					</Stack>
				</Stack>
			</form>
		</Stack>
	);
};

export default SignUp;

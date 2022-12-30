import { CheckCircleIcon } from '@chakra-ui/icons';
import {
	Button,
	Flex,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Heading,
	Input,
	Stack,
	useColorModeValue,
} from '@chakra-ui/react';
import { AxiosError } from 'axios';
import { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { CurrentUserContext } from '../common/contexts';
import { ICurrentUser, IFormValues } from '../common/interfaces';
import { loginReq } from '../common/requests';

const Login = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		setError,
	} = useForm<IFormValues>();

	const onError = (err: AxiosError<{ error: string }>) => {
		const errMsg = err?.response?.data.error;
		if (errMsg === 'wrong password or username') {
			setError('username', { message: errMsg });
			setError('password', { message: errMsg });
		} else {
			setError('username', { message: err.message });
			setError('password', { message: err.message });
		}
	};

	const { data, mutate, isLoading, isSuccess, reset } = useMutation<
		ICurrentUser,
		AxiosError<{ error: string }>,
		IFormValues
	>(loginReq, {
		onError,
	});

	const onSubmit = (user: IFormValues) => {
		mutate(user);
	};

	const { currentUser, setCurrentUser, logout } =
		useContext(CurrentUserContext);

	useEffect(() => {
		if (isSuccess && data) {
			setCurrentUser(data);
			localStorage.setItem('currentUser', JSON.stringify(data));
		}
	}, [data, isSuccess, setCurrentUser]);

	const formBg = useColorModeValue('white', 'gray.700');

	if (currentUser) {
		return (
			<Flex
				align='center'
				justify='space-between'
				direction='column'
				alignItems='stretch'
				w='full'
				h='19.5em'
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
					Login Successful
				</Heading>
				<CheckCircleIcon color='green.400' alignSelf='center' boxSize={20} />
				<Button
					colorScheme='green'
					onClick={() => {
						reset();
						logout();
					}}
				>
					Logout
				</Button>
			</Flex>
		);
	}

	const usernameValidationRules = {
		minLength: { value: 4, message: 'username too short' },
		required: { value: true, message: 'this field is required' },
	};

	const passwordValidationRules = {
		minLength: { value: 8, message: 'password too short' },
		required: { value: true, message: 'this field is required' },
	};

	return (
		<Stack spacing={4} w='full' bg={formBg} rounded='xl' boxShadow='lg' p={6}>
			<Heading
				textAlign='center'
				lineHeight={1.1}
				fontSize={{ base: '2xl', md: '3xl' }}
			>
				Login
			</Heading>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Stack spacing={4}>
					<FormControl
						id='username'
						isInvalid={Boolean(errors.username)}
						isDisabled={isLoading}
					>
						<FormLabel>Username</FormLabel>
						<Input
							{...register('username', usernameValidationRules)}
							focusBorderColor='teal.300'
							type='text'
						/>
						<FormErrorMessage>{errors.username?.message}</FormErrorMessage>
					</FormControl>
					<FormControl
						id='password'
						isInvalid={Boolean(errors.password)}
						isDisabled={isLoading}
					>
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

export default Login;

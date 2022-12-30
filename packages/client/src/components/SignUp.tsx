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
import { AxiosError, AxiosResponse } from 'axios';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { IFormValues } from '../common/interfaces';
import { signUpReq } from '../common/requests';

const SignUp = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		setError,
	} = useForm<IFormValues>();

	const onError = (err: AxiosError<{ error: string }>) => {
		const errMsg = err?.response?.data.error;
		if (errMsg === 'username already used')
			setError('username', { message: errMsg });
		else {
			setError('username', { message: err.message });
			setError('password', { message: err.message });
		}
	};

	const { mutate, isLoading, isSuccess, reset } = useMutation<
		AxiosResponse,
		AxiosError<{ error: string }>,
		IFormValues
	>(signUpReq, {
		onError,
	});

	const onSubmit = (user: IFormValues) => {
		mutate(user);
	};

	const formBg = useColorModeValue('white', 'gray.700');

	if (isSuccess)
		return (
			<Flex
				align='center'
				justify='space-between'
				alignItems='stretch'
				direction='column'
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
					Sign Up Successful
				</Heading>
				<CheckCircleIcon color='green.400' alignSelf='center' boxSize={20} />
				<Button colorScheme='green' onClick={() => reset()}>
					Create Another User
				</Button>
			</Flex>
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
		<Stack w='full' spacing={4} bg={formBg} rounded='xl' boxShadow='lg' p={6}>
			<Heading
				textAlign='center'
				lineHeight={1.1}
				fontSize={{ base: '2xl', md: '3xl' }}
			>
				Sign Up
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

export default SignUp;

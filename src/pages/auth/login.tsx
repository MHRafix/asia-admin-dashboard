import { IAuthPayload } from '@/app/api/models/auth.model';
import {
	Box,
	Button,
	Input,
	PasswordInput,
	TextInput,
	Title,
} from '@mantine/core';
import { yupResolver } from '@hookform/resolvers/yup';
// import { useForm, yupResolver } from '@mantine/form';
import { NextPage } from 'next';
import { useForm } from 'react-hook-form';
import { FiAtSign, FiLock } from 'react-icons/fi';
import { ErrorMessage } from '@hookform/error-message';
import Cookies from 'js-cookie';
import Router from 'next/router';
import { useMutation } from '@apollo/client';
import { Notify } from '@/app/config/alertNotification/Notification';
import { LOGIN_QUERY } from '@/app/config/queries/auth.query';
import protectWithoutSession from '@/app/config/authProtection/potectWithoutSession';
import { loginSchema } from '@/app/config/form.validation/serviceForm/service.form.validation';

export interface IAuthResponse {
	_id: string;
	accessToken: string;
}

const LoginPage: NextPage = () => {
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
		},

		resolver: yupResolver(loginSchema),
	});

	const callAfterSuccess = (response: { adminSignIn: IAuthResponse }) => {
		Cookies.set('user', JSON.stringify(response?.adminSignIn), {
			expires: 5,
			sameSite: 'strict',
		});
		Router?.push('/');
	};

	// login or signup mutation
	const [login, { data: user, loading: authenticating }] = useMutation(
		LOGIN_QUERY,
		Notify({
			sucTitle: 'You are logged in successfully',
			sucMessage: '',
			errMessage: 'Failed to authenticate',
			action: callAfterSuccess,
		})
	);

	const handleSubmitForm = (payload: IAuthPayload) => {
		login({ variables: payload });
	};

	return (
		<Box className='flex items-center justify-center w-full h-screen bg-[#1c1d29]'>
			<form
				onSubmit={handleSubmit(handleSubmitForm)}
				className='lg:w-4/12 p-3 rounded-md bg-[#212231] drop-shadow-2xl lg:mx-2'
			>
				<Title order={3} my={10}>
					Login Now
				</Title>
				<Input.Wrapper
					size='md'
					label='Email'
					error={<ErrorMessage errors={errors} name='email' />}
				>
					<TextInput
						size='md'
						icon={<FiAtSign />}
						variant='filled'
						my={5}
						withAsterisk
						placeholder='your@email.com'
						{...register('email')}
					/>
				</Input.Wrapper>

				<Input.Wrapper
					size='md'
					label='Password'
					error={<ErrorMessage errors={errors} name='password' />}
				>
					<PasswordInput
						icon={<FiLock />}
						size='md'
						variant='filled'
						mt={5}
						my={10}
						placeholder='Password'
						withAsterisk
						{...register('password')}
					/>
				</Input.Wrapper>

				<Button
					size='md'
					type='submit'
					color='violet'
					fullWidth
					my={15}
					loading={authenticating}
				>
					Login
				</Button>
			</form>
		</Box>
	);
};

export default protectWithoutSession(LoginPage);

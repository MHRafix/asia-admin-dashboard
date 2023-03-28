import { IAuthPayload } from '@/app/api/models/auth.model';
import { loginSchema } from '@/app/config/validationSchema/Schema';
import { Box, Button, PasswordInput, TextInput, Title } from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import { NextPage } from 'next';
import { FiAtSign, FiLock } from 'react-icons/fi';

const LoginPage: NextPage = () => {
	const form = useForm({
		initialValues: {
			email: '',
			password: '',
		},

		validate: yupResolver(loginSchema),
	});

	const handleSubmitForm = (payload: IAuthPayload) => {
		//
	};

	return (
		<Box className='flex items-center justify-center w-full h-screen bg-[#1c1d29]'>
			<form
				onSubmit={form.onSubmit(handleSubmitForm)}
				className='w-4/12 p-3 rounded-md bg-[#212231] drop-shadow-2xl mx-2'
			>
				<Title order={3} my={10}>
					Login Now
				</Title>
				<TextInput
					size='md'
					icon={<FiAtSign />}
					variant='filled'
					my={5}
					withAsterisk
					label='Email'
					placeholder='your@email.com'
					{...form.getInputProps('email')}
				/>

				<PasswordInput
					icon={<FiLock />}
					size='md'
					variant='filled'
					mt={5}
					my={10}
					placeholder='Password'
					label='Password'
					withAsterisk
					{...form.getInputProps('password')}
				/>

				<Button size='md' type='submit' color='violet' fullWidth my={10}>
					Login
				</Button>
			</form>
		</Box>
	);
};

export default LoginPage;

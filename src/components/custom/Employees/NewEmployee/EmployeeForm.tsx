import { Notify } from '@/app/config/alertNotification/Notification';
import { CREATE_EMPLOYEE } from '@/app/config/queries/employees.query';
import { useMutation } from '@apollo/client';
import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Input, Space } from '@mantine/core';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

const EmployeeForm: React.FC<{
	onSuccess: () => void;
}> = ({ onSuccess }) => {
	const {
		register,
		handleSubmit,
		setValue,
		watch,
		formState: { errors },
	} = useForm<Employee_Form_Type>({
		resolver: yupResolver(EmployeeFormValidator),
	});

	// create a new employee
	const [createEmployee, { loading: creating__employee }] = useMutation(
		CREATE_EMPLOYEE,
		Notify({
			sucTitle: 'Employee created successfully',
			action: () => {
				onSuccess();
			},
		})
	);

	const onSubmit = (input: Employee_Form_Type) => {
		console.log(input);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Input.Wrapper
				size='md'
				label='Name'
				error={<ErrorMessage name='name' errors={errors} />}
			>
				<Input placeholder='Enter name' {...register('name')} />
			</Input.Wrapper>

			<Space h={5} />
			<Input.Wrapper
				size='md'
				label='Post'
				error={<ErrorMessage name='post' errors={errors} />}
			>
				<Input placeholder='Enter post' {...register('post')} />
			</Input.Wrapper>

			<Space h={5} />
			<Input.Wrapper
				size='md'
				label='Avatar'
				error={<ErrorMessage name='avatar' errors={errors} />}
			>
				<Input placeholder='Enter avatar' {...register('avatar')} />
			</Input.Wrapper>

			<Space h={5} />

			<Input.Wrapper
				size='md'
				label='Email'
				error={<ErrorMessage name='email' errors={errors} />}
			>
				<Input placeholder='Enter email' {...register('email')} />
			</Input.Wrapper>

			<Space h={5} />

			<Input.Wrapper
				size='md'
				label='Phone'
				error={<ErrorMessage name='phone' errors={errors} />}
			>
				<Input placeholder='Enter phone' {...register('phone')} />
			</Input.Wrapper>

			<Space h={5} />

			<Input.Wrapper
				size='md'
				label='Facebook'
				error={<ErrorMessage name='facebook' errors={errors} />}
			>
				<Input placeholder='Enter facebook' {...register('facebook')} />
			</Input.Wrapper>

			<Space h={5} />

			<Input.Wrapper
				size='md'
				label='Linkedin'
				error={<ErrorMessage name='linkedin' errors={errors} />}
			>
				<Input placeholder='Enter linkedin' {...register('linkedin')} />
			</Input.Wrapper>

			<Space h={10} />

			<Button color='teal' type='submit' fullWidth>
				Save
			</Button>
		</form>
	);
};

export default EmployeeForm;

const EmployeeFormValidator = Yup.object().shape({
	name: Yup.string().required().label('Name'),
	post: Yup.string().required().label('Post'),
	avatar: Yup.string().required().label('Avatar'),
	email: Yup.string().required().label('Email'),
	phone: Yup.string().required().label('Phone'),
	facebook: Yup.string().required().label('Facebook'),
	linkedin: Yup.string().required().label('Linkedin'),
});

export type Employee_Form_Type = Yup.InferType<typeof EmployeeFormValidator>;

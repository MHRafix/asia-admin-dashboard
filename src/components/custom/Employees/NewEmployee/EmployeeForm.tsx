import { IEmployees } from '@/app/api/models/employees.model';
import { Notify } from '@/app/config/alertNotification/Notification';
import { fileUploader } from '@/app/config/logic/fileUploader';
import {
	CREATE_EMPLOYEE,
	UPDATE_EMPLOYEE,
} from '@/app/config/queries/employees.query';
import { useMutation } from '@apollo/client';
import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Group, Input, Space, Text } from '@mantine/core';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiUpload } from 'react-icons/fi';
import { HiOutlinePhotograph } from 'react-icons/hi';
import { ImCross } from 'react-icons/im';
import * as Yup from 'yup';

const EmployeeForm: React.FC<{
	onSuccess: () => void;
	employee?: IEmployees;
}> = ({ onSuccess, employee }) => {
	const [url, setUrl] = useState<string>('');
	const [uploading, setUploading] = useState<boolean>(false);

	// upload avatar
	const uploadAvatar = async (file: File) => {
		setUploading(true);
		const { file_upload_cloudinary } = fileUploader(file, 'ASIA_LOGO');
		const url = await file_upload_cloudinary();
		if (url) {
			Notify({
				sucTitle: 'Avatar uploaded successfully!',
				sucMessage: 'Update team details now.',
			});
		}
		setUrl(url);
		setUploading(false);
		setValue('avatar', url);
	};

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
	const [createEmployee, { loading: __creatingEmployee }] = useMutation(
		CREATE_EMPLOYEE,
		Notify({
			sucTitle: 'Employee created successfully',
			action: () => {
				onSuccess();
			},
		})
	);

	// update a employee
	const [updateEmployee, { loading: __updatingEmployee }] = useMutation(
		UPDATE_EMPLOYEE,
		Notify({
			sucTitle: 'Employee updated successfully',
			action: () => {
				onSuccess();
			},
		})
	);

	useEffect(() => {
		setUrl(employee?.avatar!);
		setValue('avatar', employee?.avatar!);
		setValue('name', employee?.name!);
		setValue('email', employee?.email!);
		setValue('post', employee?.post!);
		setValue('phone', employee?.phone!);
		setValue('facebook', employee?.facebook!);
	}, [employee]);

	const onSubmit = (input: Employee_Form_Type) => {
		if (employee) {
			updateEmployee({
				variables: {
					input: { ...input, _id: employee?._id },
				},
			});
		} else {
			createEmployee({
				variables: {
					input,
				},
			});
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			{url && (
				<div className='text-center'>
					<Image
						src={url}
						alt='Pic'
						width={150}
						height={150}
						className='!w-[150px] object-cover !h-[150px] mx-auto p-1 !rounded-lg shadow-md'
					/>
				</div>
			)}

			<Space h={'md'} />

			<Input.Wrapper
				size='md'
				error={<ErrorMessage name='avatar' errors={errors} />}
			>
				<Dropzone
					onDrop={(files) => uploadAvatar(files[0])}
					onReject={(files) => {}}
					loading={uploading}
					w={150}
					mx='auto'
					h={150}
					bg={'transparent'}
					maxSize={3 * 1024 ** 2}
					accept={IMAGE_MIME_TYPE}
					sx={{
						border: '1px dotted #5F3DC4',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<Group
						position='center'
						spacing='xl'
						style={{
							minHeight: 80,
							pointerEvents: 'none',
						}}
					>
						<Dropzone.Accept>
							<FiUpload size={50} color={'dark'} />
						</Dropzone.Accept>
						<Dropzone.Reject>
							<ImCross size={50} color={'dark'} />
						</Dropzone.Reject>
						<Dropzone.Idle>
							<HiOutlinePhotograph color='#5F3DC4' size={50} />
						</Dropzone.Idle>

						<div>
							<Text size='md' inline>
								Avatar
							</Text>
						</div>
					</Group>
				</Dropzone>
			</Input.Wrapper>

			<Space h={5} />
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

			<Space h={10} />

			<Button
				color='teal'
				loading={__creatingEmployee || __updatingEmployee}
				type='submit'
				fullWidth
			>
				Save
			</Button>
		</form>
	);
};

export default EmployeeForm;

const EmployeeFormValidator = Yup.object().shape({
	name: Yup.string().required().label('Name'),
	avatar: Yup.string().required().label('Avatar'),
	post: Yup.string().required().label('Post'),
	email: Yup.string().required().label('Email'),
	phone: Yup.string().required().label('Phone'),
	facebook: Yup.string().required().label('Facebook'),
});

export type Employee_Form_Type = Yup.InferType<typeof EmployeeFormValidator>;

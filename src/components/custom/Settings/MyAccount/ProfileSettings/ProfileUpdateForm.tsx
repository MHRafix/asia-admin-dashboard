import { Notify } from '@/app/config/alertNotification/Notification';
import fileUploader from '@/app/config/fileUpload/uplaod';
import {
	PROFILE_DETAILS_FORM_DEFAULT_VALUE,
	UPDATE_PROFILE_DETAILS_SCHEMA,
} from '@/app/config/form.validation/userForm.config';
// import { mutationQueryVariable } from '@/app/config/forms/auth/auth.config';
// import {
// 	PROFILE_DETAILS_FORM_DEFAULT_VALUE,
// 	UPDATE_PROFILE_DETAILS_SCHEMA,
// } from '@/app/config/forms/auth/userForm.config';

import { useGetSession } from '@/app/config/logic/getSession';
import { UPDATE_USER_DETAILS } from '@/app/config/queries/user.query';
// import { UPDATE_USER_DETAILS } from '@/app/config/query/user.query';
import { useMutation } from '@apollo/client';
import {
	Button,
	Flex,
	Group,
	Input,
	Space,
	Text,
	TextInput,
	Tooltip,
} from '@mantine/core';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { useForm, yupResolver } from '@mantine/form';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { FiUpload } from 'react-icons/fi';
import { HiOutlinePhotograph } from 'react-icons/hi';
import { ImCross } from 'react-icons/im';
import { RxReset } from 'react-icons/rx';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

const ProfileUpdateForm: React.FC<{}> = () => {
	const { user, refetchDetails } = useGetSession();
	const [url, setUrl] = useState<string>('');
	const [uploading, setUploading] = useState<boolean>(false);

	const updateProfileForm = useForm({
		initialValues: PROFILE_DETAILS_FORM_DEFAULT_VALUE,
		validate: yupResolver(UPDATE_PROFILE_DETAILS_SCHEMA),
	});

	useEffect(() => {
		updateProfileForm.setValues({
			name: user?.name,
			phone: user?.phone,
		});
	}, [user]);

	// upload avatar
	const uploadAvatar = async (file: File) => {
		setUploading(true);
		const { file_upload_cloudinary } = fileUploader(file);
		const url = await file_upload_cloudinary();
		if (url) {
			Notify({
				sucTitle: 'Avatar uploaded successfully!',
				sucMessage: 'Update your profile details now.',
			});
		}
		setUrl(url);
		setUploading(false);
	};

	// call after success
	const onSuccess = () => {
		refetchDetails();
	};

	// update mutation
	const [updateUser, { loading: updating }] = useMutation(
		UPDATE_USER_DETAILS,
		Notify({
			sucTitle: 'Your profile details updated successfully!',
			sucMessage: 'Refetch profile details.',
			errMessage: 'Failed to update details!',
			action: onSuccess,
		})
	);

	// handle submit form
	const handleUpdate = (values: IFormState) => {
		updateUser({
			variables: {
				...values,
				avatar: url ? url : user?.avatar,
				userId: user?._id,
			},
		});
	};

	return (
		<div className='shadow-2xl border-[1px] border-solid border-slate-700 p-5 rounded-md'>
			{url ? (
				<div className='text-center'>
					<Image
						src={url}
						alt='Pic'
						width={120}
						height={120}
						className='!w-[120px] !h-[120px] mx-auto p-1 rounded-full shadow-md'
					/>
				</div>
			) : (
				<Dropzone
					onDrop={(files) => uploadAvatar(files[0])}
					onReject={(files) => {}}
					loading={uploading}
					w={250}
					mx='auto'
					h={130}
					bg={'transparent'}
					maxSize={3 * 1024 ** 2}
					accept={IMAGE_MIME_TYPE}
					sx={{
						border: '1px dotted #5F3DC4',
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
								Drag or select profile pic
							</Text>
						</div>
					</Group>
				</Dropzone>
			)}

			{url && (
				<Flex justify='center' gap={10} mt={10}>
					<Button
						color='red'
						leftIcon={<RxReset size={18} />}
						onClick={() => setUrl(() => '')}
					>
						Reset
					</Button>
				</Flex>
			)}
			<form onSubmit={updateProfileForm.onSubmit(handleUpdate)}>
				<Input.Wrapper
					label='Name'
					size='sm'
					my={10}
					error={updateProfileForm?.errors?.name}
				>
					<Input
						disabled={uploading || updating}
						// variant='filled'
						{...updateProfileForm.getInputProps('name')}
						variant='unstyled'
						size={'md'}
						className='!border-[1px] !border-[#32344b] border-solid px-2 rounded-md'
					/>
				</Input.Wrapper>

				<Tooltip
					label="Email isn't editble"
					position='right-end'
					color='red'
					withArrow
				>
					<Input.Wrapper label='Email' size='sm' my={10}>
						<TextInput
							disabled={true}
							defaultValue={user?.email}
							variant='filled'
							size={'md'}
							// className='!border-[1px] !border-[#32344b] border-solid px-2 rounded-md'
						/>
					</Input.Wrapper>
				</Tooltip>
				<Input.Wrapper
					label='Phone'
					size='sm'
					my={10}
					error={updateProfileForm?.errors?.phone}
				>
					<PhoneInput
						disabled={uploading || updating}
						international
						defaultCountry='BD'
						{...updateProfileForm.getInputProps('phone')}
					/>
				</Input.Wrapper>
				<Space h={8} />
				<Button
					type='submit'
					color='violet'
					size='md'
					fullWidth
					loading={updating}
				>
					Save
				</Button>
			</form>
		</div>
	);
};

export default ProfileUpdateForm;

interface IFormState {
	name: string;
	phone: string;
}

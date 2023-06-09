import { Notify } from '@/app/config/alertNotification/Notification';
import { fileUploader } from '@/app/config/logic/fileUploader';
import { Group, Input, Space, Text } from '@mantine/core';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import Image from 'next/image';
import React, { useState } from 'react';
import { FiUpload } from 'react-icons/fi';
import { HiOutlinePhotograph } from 'react-icons/hi';
import { ImCross } from 'react-icons/im';

const AppSettingsForm: React.FC = () => {
	const [url, setUrl] = useState<string>('');
	const [uploading, setUploading] = useState<boolean>(false);

	// upload avatar
	const uploadAvatar = async (file: File) => {
		setUploading(true);
		const { file_upload_cloudinary } = fileUploader(file, 'APP_LOGO');
		const url = await file_upload_cloudinary();
		if (url) {
			Notify({
				sucTitle: 'Logo uploaded successfully!',
				sucMessage: 'Update app details now.',
			});
		}
		setUrl(url);
		setUploading(false);
	};

	return (
		<div>
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
				<Input.Wrapper
					label='Upload logo'
					size='md'
					className='mx-auto w-[350px]'
				>
					<Space h={8} />
					<Dropzone
						onDrop={(files) => uploadAvatar(files[0])}
						onReject={(files) => {}}
						loading={uploading}
						w={350}
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
									Drag or select app logo
								</Text>
							</div>
						</Group>
					</Dropzone>
				</Input.Wrapper>
			)}
		</div>
	);
};

export default AppSettingsForm;

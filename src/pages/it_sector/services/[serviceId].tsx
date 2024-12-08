import {
	useGetService,
	useUpdateService,
} from '@/app/api/gql-api-hooks/service.api';
import protectWithSession from '@/app/config/authProtection/protectWithSession';
import {
	UPDATE_SERVICE_DEFAULT_VALUES,
	updateServiceSchema,
} from '@/app/config/form.validation/service-form/service.form.validation';
import { fileUploader } from '@/app/config/logic/fileUploader';
import CircularLoader from '@/components/common/Loader';
import NotepadEditor from '@/components/common/NotepadEditor';
import PageTitleArea from '@/components/common/PageTitleArea';
import AdminLayout from '@/components/layouts/AdminLayout';
import {
	Button,
	FileButton,
	Input,
	Space,
	Text,
	Textarea,
	ThemeIcon,
} from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import Image from 'next/image';
import Router from 'next/router';
import React, { useEffect, useState } from 'react';
import { FiUpload } from 'react-icons/fi';
import { HiOutlinePhotograph } from 'react-icons/hi';

const SingleService: React.FC<{ serviceId: string }> = ({ serviceId }) => {
	const [uploading, setUploading] = useState('');
	const [thumbnail, setThumbnail] = useState('');
	const [banner, setBanner] = useState('');

	const { getingService, service, refetchService } = useGetService(serviceId);

	const [description, setDescription] = useState(service?.desc);

	const form = useForm({
		initialValues: UPDATE_SERVICE_DEFAULT_VALUES,
		validate: yupResolver(updateServiceSchema),
	});

	// update initial info with service data
	useEffect(() => {
		setDescription(service?.desc);
		form.setValues({
			title: service?.title,
			shortDesc: service?.shortDesc,
		});
		setBanner(service?.banner!);
		setThumbnail(service?.thumbnail!);
	}, [service]);

	const { updateService, updatingService } = useUpdateService(() => {
		refetchService();
		Router?.push('/it_sector/services');
	});

	const handleUploadPackageThumbnail = async (
		file: File,
		actionName: string,
		onChangeThumbnail: any
	) => {
		try {
			setUploading(actionName);
			const { file_upload_cloudinary } = fileUploader(
				file,
				'SERVICE_THUMBNAILS_AND_BANNER'
			);

			const uploaded = await file_upload_cloudinary();
			if (uploaded) {
				showNotification({
					title: 'File uploaded successfully!',
					message: 'Save file to database.',
					color: 'teal',
				});
				onChangeThumbnail(uploaded);
				setUploading('');
			}
		} catch (err: any) {
			setUploading('');
			showNotification({
				title: 'Failed to upload file!',
				message: err.message,
				color: 'red',
			});
		}
	};

	const handleUpdateForm = (values: any) => {
		// if (form.isDirty()) return;
		updateService({
			variables: {
				...values,
				desc: description,
				id: serviceId,
				thumbnail: thumbnail ? thumbnail : service?.thumbnail,
				banner: banner ? banner : service?.banner,
			},
		});
	};

	return (
		<AdminLayout title='Single service'>
			{getingService && (
				<div className='flex items-center h-[80vh]'>
					<CircularLoader isShow={getingService} />
				</div>
			)}
			{!getingService && (
				<form onSubmit={form.onSubmit(handleUpdateForm)}>
					<PageTitleArea
						title='Edit service details'
						tagline='Update service details'
						currentPathName='Create services'
						othersPath={[
							{
								pathName: 'Home',
								href: '/',
							},
							{
								pathName: 'Services',
								href: '/it_sector/services',
							},
						]}
						actionComponent={
							<Button
								color='teal'
								type='submit'
								loading={updatingService}
								mb={20}
							>
								Save
							</Button>
						}
					/>

					<Input.Wrapper
						label={
							<Text fz={18} my={5}>
								Title
							</Text>
						}
						my={10}
						error={form.errors.title}
					>
						<Input
							variant='unstyled'
							size={'md'}
							className='!border-[1px] !border-[#32344b] border-solid px-2'
							{...form.getInputProps('title')}
						/>
					</Input.Wrapper>

					<Input.Wrapper
						label={
							<Text fz={18} my={5}>
								Short descrition
							</Text>
						}
						my={15}
						error={form.errors.shortDesc}
					>
						<Textarea
							variant='unstyled'
							size={'md'}
							className='!border-[1px] !border-[#32344b] border-solid px-2'
							{...form.getInputProps('shortDesc')}
						/>
					</Input.Wrapper>

					<div className='relative'>
						<Input.Wrapper
							label={
								<Text fz={18} my={5}>
									Description
								</Text>
							}
						>
							<NotepadEditor value={description!} setValue={setDescription} />
						</Input.Wrapper>
					</div>

					<Space h={80} />

					<div className='relative flex gap-5'>
						<Input.Wrapper
							label={`Upload service icon (size 40/40 px)`}
							size='md'
							className='relative'
						>
							{thumbnail ? (
								<div className='h-[250px]  bg-[#212231] flex items-center justify-center'>
									{' '}
									<ThemeIcon variant='light' radius={200} size={120}>
										<Image
											src={thumbnail}
											alt='servie icon'
											width={80}
											height={80}
										/>
									</ThemeIcon>
								</div>
							) : (
								<div className='h-[250px] bg-[#212231] flex items-center '>
									<HiOutlinePhotograph color='#5F3DC4' size={50} />
								</div>
							)}
							<div className='absolute bottom-3 right-3 gap-1 flex items-center'>
								<div>
									<FileButton
										onChange={(file: File) =>
											handleUploadPackageThumbnail(
												file,
												`SERVICE_THUMBNAIL`,
												setThumbnail
											)
										}
										accept='image/png,image/jpeg'
									>
										{(props) => (
											<Button
												loading={uploading === `SERVICE_THUMBNAIL`}
												color='violet'
												{...props}
											>
												<FiUpload size={16} />
											</Button>
										)}
									</FileButton>
								</div>
							</div>
						</Input.Wrapper>
						<Input.Wrapper
							label={`Upload service banner (size 750/300 px)`}
							size='md'
							className='relative'
						>
							<div className='h-[250px] w-[750px] bg-[#212231] flex items-center justify-center'>
								{banner ? (
									<Image
										src={banner}
										alt='Thumbnail'
										width={200}
										className='!w-full'
										height={250}
									/>
								) : (
									<HiOutlinePhotograph color='#5F3DC4' size={50} />
								)}
							</div>
							<div className='absolute bottom-3 right-3 gap-1 flex items-center'>
								<div>
									<FileButton
										onChange={(file: File) =>
											handleUploadPackageThumbnail(
												file,
												`SERVICE_BANNER`,
												setBanner
											)
										}
										accept='image/png,image/jpeg'
									>
										{(props) => (
											<Button
												loading={uploading === `SERVICE_BANNER`}
												color='violet'
												{...props}
											>
												<FiUpload size={16} />
											</Button>
										)}
									</FileButton>
								</div>
							</div>
						</Input.Wrapper>
					</div>
				</form>
			)}
		</AdminLayout>
	);
};

export default protectWithSession(SingleService);

export async function getServerSideProps({
	params,
}: {
	params: { serviceId: string };
}) {
	return {
		props: { serviceId: params?.serviceId },
	};
}

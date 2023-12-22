import {
	useGetRequirement,
	useUpdateRequirement,
} from '@/app/api/gql-api-hooks/requirements.api';
import protectWithSession from '@/app/config/authProtection/protectWithSession';
import {
	UPDATE_BLOG_DEFAULT_VALUES,
	updateBlogSchema,
} from '@/app/config/form.validation/serviceForm/service.form.validation';
import { fileUploader } from '@/app/config/logic/fileUploader';
import CircularLoader from '@/components/common/Loader';
import NotepadEditor from '@/components/common/NotepadEditor';
import PageTitleArea from '@/components/common/PageTitleArea';
import AdminLayout from '@/components/layouts/AdminLayout';
import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, FileButton, Input, Space } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiUpload } from 'react-icons/fi';
import { HiOutlinePhotograph } from 'react-icons/hi';

const EditVisaReq: React.FC<{ reqId: string }> = ({ reqId }) => {
	const [uploading, setUploading] = useState('');
	const [thumbnail, setThumbnail] = useState('');
	const [banner, setBanner] = useState('');

	// getting visa requirements
	const { gettingRequirement, requirement, refetchRequirement } =
		useGetRequirement(reqId);

	// requirement description
	// const [description, setDescription] = useState(requirement?.description);

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		watch,
	} = useForm({
		defaultValues: UPDATE_BLOG_DEFAULT_VALUES,
		resolver: yupResolver(updateBlogSchema),
	});

	// update initial info with visa requirements data
	useEffect(() => {
		// setDescription(requirement?.description);
		setValue('title', requirement?.title!);
		setValue('description', requirement?.description!);

		setBanner(requirement?.cover!);
		setThumbnail(requirement?.image!);
	}, [requirement]);

	console.log(requirement);

	const { updateRequirement, updatingRequirement } =
		useUpdateRequirement(refetchRequirement);

	const handleUploadPackageThumbnail = async (
		file: File,
		actionName: string,
		onChangeThumbnail: any
	) => {
		try {
			setUploading(actionName);
			const { file_upload_cloudinary } = fileUploader(
				file,
				'BLOG_THUMBNAIL_AND_BANNER'
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
		updateRequirement({
			variables: {
				input: {
					...values,
					_id: reqId,
					image: thumbnail,
					cover: banner,
				},
			},
		});
	};

	return (
		<AdminLayout title='Single service'>
			{gettingRequirement && (
				<div className='flex items-center h-[80vh]'>
					<CircularLoader isShow={gettingRequirement} />
				</div>
			)}

			{!gettingRequirement && (
				<form onSubmit={handleSubmit(handleUpdateForm)}>
					<PageTitleArea
						title='Edit visa requirements'
						tagline='Update visa requirements'
						currentPathName='Update visa requirements'
						othersPath={[
							{
								pathName: 'Home',
								href: '/',
							},
							{
								pathName: 'Visa requirements',
								href: '/it_sector/visa_requirements',
							},
						]}
						actionComponent={
							<Button
								color='teal'
								type='submit'
								loading={updatingRequirement}
								mb={20}
							>
								Save Details
							</Button>
						}
					/>

					<Input.Wrapper
						size='lg'
						label={'Title'}
						my={10}
						error={<ErrorMessage errors={errors} name='title' />}
					>
						<Input
							variant='unstyled'
							size={'md'}
							className='!border-[1px] !border-[#32344b] border-solid px-2'
							{...register('title')}
						/>
					</Input.Wrapper>
					<div className='block h-[200px]'>
						<Input.Wrapper
							size='lg'
							label={'Description'}
							error={<ErrorMessage errors={errors} name='description' />}
						>
							<NotepadEditor
								value={watch('description')!}
								setValue={(e) => setValue('description', e!)}
							/>
						</Input.Wrapper>
					</div>
					<Space h={10} />
					<div className='grid grid-cols-1 gap-5'>
						<Input.Wrapper
							label={`Upload visa requirement banner (size 750/300 px)`}
							size='md'
							className='relative'
						>
							<div className='h-[250px] bg-[#212231] flex items-center justify-center'>
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
												`BLOG_BANNER`,
												setBanner
											)
										}
										accept='image/png,image/jpeg'
									>
										{(props) => (
											<Button
												loading={uploading === `BLOG_BANNER`}
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

export default protectWithSession(EditVisaReq);

export async function getServerSideProps({
	params,
}: {
	params: { reqId: string };
}) {
	return {
		props: { reqId: params?.reqId },
	};
}

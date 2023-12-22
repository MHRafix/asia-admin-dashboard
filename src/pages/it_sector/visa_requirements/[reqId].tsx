import {
	countriesSelectInputData,
	visa_categories,
} from '@/app/api/fakeData/data';
import {
	useGetRequirement,
	useUpdateRequirement,
} from '@/app/api/gql-api-hooks/requirements.api';
import protectWithSession from '@/app/config/authProtection/protectWithSession';
import {
	UPDATE_REQ_DEFAULT_VALUES,
	updateReqSchema,
} from '@/app/config/form.validation/serviceForm/service.form.validation';
import { fileUploader } from '@/app/config/logic/fileUploader';
import CircularLoader from '@/components/common/Loader';
import NotepadEditor from '@/components/common/NotepadEditor';
import PageTitleArea from '@/components/common/PageTitleArea';
import AdminLayout from '@/components/layouts/AdminLayout';
import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, FileButton, Input, Select, Space } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiUpload } from 'react-icons/fi';
import { HiOutlinePhotograph } from 'react-icons/hi';

const EditVisaReq: React.FC<{ reqId: string }> = ({ reqId }) => {
	const [uploading, setUploading] = useState('');
	const [thumbnail, setThumbnail] = useState('');
	const [banner, setBanner] = useState('');
	const router = useRouter();

	// getting visa requirements
	const { gettingRequirement, requirement, refetchRequirement } =
		useGetRequirement(reqId);

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		watch,
	} = useForm({
		defaultValues: UPDATE_REQ_DEFAULT_VALUES,
		resolver: yupResolver(updateReqSchema),
	});

	// update initial info with visa requirements data
	useEffect(() => {
		// setDescription(requirement?.description);
		setValue('title', requirement?.title!);
		setValue('description', requirement?.description!);
		setValue('visaType', requirement?.visaType!);
		setValue('destinationCountry', requirement?.destinationCountry!);

		setBanner(requirement?.cover!);
		setThumbnail(requirement?.image!);
	}, [requirement]);

	// console.log(requirement);

	const { updateRequirement, updatingRequirement } = useUpdateRequirement(
		() => {
			refetchRequirement();
			router?.push('/it_sector/visa_requirements');
		}
	);

	const handleUploadRequirementThumbnailAndBanner = async (
		file: File,
		actionName: string,
		onChangeThumbnail: any
	) => {
		try {
			setUploading(actionName);
			const { file_upload_cloudinary } = fileUploader(
				file,
				'REQUIREMENTS_THUMBNAIL_AND_BANNER'
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
								Save
							</Button>
						}
					/>

					<Input.Wrapper
						size='md'
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

					<Input.Wrapper
						size='md'
						label={'Country'}
						my={10}
						error={<ErrorMessage errors={errors} name='destinationCountry' />}
					>
						<Select
							variant='unstyled'
							size={'md'}
							data={countriesSelectInputData}
							value={watch('destinationCountry')}
							onChange={(e) => setValue('destinationCountry', e!)}
							className='!border-[1px] !border-[#32344b] border-solid px-2'
						/>
					</Input.Wrapper>

					<Input.Wrapper
						size='md'
						label={'Visa type'}
						my={10}
						error={<ErrorMessage errors={errors} name='visaType' />}
					>
						<Select
							variant='unstyled'
							size={'md'}
							data={visa_categories}
							value={watch('visaType')}
							onChange={(e) => setValue('visaType', e!)}
							className='!border-[1px] !border-[#32344b] border-solid px-2'
						/>
					</Input.Wrapper>
					<div className='block h-[200px]'>
						<Input.Wrapper
							size='md'
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

					<div className='flex justify-between items-center gap-4'>
						<div className='lg:w-4/12'>
							<Input.Wrapper
								label={`Upload visa requirement thumbnail`}
								size='md'
								className='relative'
							>
								<div className='h-[250px] bg-[#212231] flex items-center justify-center'>
									{thumbnail ? (
										<Image
											src={thumbnail}
											alt='Thumbnail'
											width={200}
											className='!w-full rounded-md'
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
												handleUploadRequirementThumbnailAndBanner(
													file,
													`BLOG_BANNER`,
													setThumbnail
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

						<div className='lg:w-8/12'>
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
											className='!w-full rounded-md'
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
												handleUploadRequirementThumbnailAndBanner(
													file,
													`REQUIREMENT_BANNER`,
													setBanner
												)
											}
											accept='image/png,image/jpeg'
										>
											{(props) => (
												<Button
													loading={uploading === `REQUIREMENT_BANNER`}
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

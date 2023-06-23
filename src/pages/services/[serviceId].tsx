import {
	countriesSelectInputData,
	visa_categories,
} from '@/app/api/fakeData/data';
import {
	useGetService,
	useUpdateService,
} from '@/app/api/gql-api-hooks/service.api';
import {
	UPDATE_SERVICE_DEFAULT_VALUES,
	updateServiceSchema,
} from '@/app/config/form.validation/serviceForm/service.form.validation';
import CircularLoader from '@/components/common/Loader';
import NotepadEditor from '@/components/common/NotepadEditor';
import PageTitleArea from '@/components/common/PageTitleArea';
import AdminLayout from '@/components/layouts/AdminLayout';
import {
	Button,
	FileButton,
	Input,
	NumberInput,
	Select,
	Space,
	Text,
	Textarea,
} from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { FiUpload } from 'react-icons/fi';
import { HiOutlinePhotograph } from 'react-icons/hi';

const SingleService: React.FC<{ serviceId: string }> = ({ serviceId }) => {
	const { getingService, service, refetchService } = useGetService(serviceId);
	const [preRequirements, setPreRequirements] = useState(
		service?.preRequirements
	);
	const [description, setDescription] = useState(service?.desc);
	const [thumbnail, setThumbnail] = useState('');

	const form = useForm({
		initialValues: UPDATE_SERVICE_DEFAULT_VALUES,
		validate: yupResolver(updateServiceSchema),
	});

	// update initial info with service data
	useEffect(() => {
		setPreRequirements(service?.preRequirements);
		setDescription(service?.desc);
		form.setValues({
			title: service?.title,
			shortDesc: service?.shortDesc,
			price: service?.price,
			country: service?.country,
			visaCategory: service?.visaCategory,
		});
	}, [service]);

	const { updateService, updatingService } = useUpdateService(refetchService);

	const handleUpdateForm = (values: any) => {
		// if (form.isDirty()) return;
		updateService({
			variables: {
				...values,
				desc: description,
				preRequirements,
				id: serviceId,
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
								href: '/services',
							},
						]}
						actionComponent={
							<Button
								color='teal'
								type='submit'
								loading={updatingService}
								mb={20}
							>
								Save Details
							</Button>
						}
					/>

					<div className='grid lg:grid-cols-2 lg:gap-5'>
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
									Price
								</Text>
							}
							my={10}
							error={form.errors.price}
						>
							<NumberInput
								variant='unstyled'
								size={'md'}
								className='!border-[1px] !border-[#32344b] border-solid px-2'
								{...form.getInputProps('price')}
							/>
						</Input.Wrapper>
					</div>
					<div className='grid lg:grid-cols-2 lg:gap-5'>
						<Input.Wrapper
							label={
								<Text fz={18} my={5}>
									Country
								</Text>
							}
							my={10}
							error={form.errors.country}
						>
							<Select
								data={countriesSelectInputData}
								variant='unstyled'
								size={'md'}
								placeholder='Pick a country'
								className='!border-[1px] !border-[#32344b] border-solid px-2'
								{...form.getInputProps('country')}
							/>
						</Input.Wrapper>

						<Input.Wrapper
							label={
								<Text fz={18} my={5}>
									Visa Category
								</Text>
							}
							my={10}
							error={form.errors.visaCategory}
						>
							<Select
								data={visa_categories}
								variant='unstyled'
								size={'md'}
								placeholder='Pick a category'
								className='!border-[1px] !border-[#32344b] border-solid px-2'
								{...form.getInputProps('visaCategory')}
							/>
						</Input.Wrapper>
					</div>
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
					<div className='block h-[200px] my-2'>
						<Input.Wrapper
							label={
								<Text fz={18} my={5}>
									Pre Requirements
								</Text>
							}
						>
							<NotepadEditor
								value={preRequirements!}
								setValue={setPreRequirements}
							/>
						</Input.Wrapper>
					</div>
					<div className='block h-[200px]'>
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
					<Space h={10} />
					<div className='grid grid-cols-2 gap-5'>
						<Input.Wrapper
							label={`Upload service thumbnail (size 300/250 px)`}
							size='md'
							className='relative'
						>
							<div className='h-[250px] bg-[#212231] flex items-center justify-center'>
								{thumbnail ? (
									<Image
										src={thumbnail}
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
										onChange={() => console.log('first')}
										// onChange={(file: File) =>
										// 	handleUploadPackageThumbnail(
										// 		file,
										// 		`PACKAGE_CAROUSEL_THUMBNAILS_${idx}`,
										// 		setCarouselThumbnails,
										// 		idx
										// 	)
										// }
										accept='image/png,image/jpeg'
									>
										{(props) => (
											<Button
												// loading={uploading === `PACKAGE_CAROUSEL_THUMBNAILS_${idx}`}
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
							<div className='h-[250px] bg-[#212231] flex items-center justify-center'>
								{thumbnail ? (
									<Image
										src={thumbnail}
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
										onChange={() => console.log('first')}
										// onChange={(file: File) =>
										// 	handleUploadPackageThumbnail(
										// 		file,
										// 		`PACKAGE_CAROUSEL_THUMBNAILS_${idx}`,
										// 		setCarouselThumbnails,
										// 		idx
										// 	)
										// }
										accept='image/png,image/jpeg'
									>
										{(props) => (
											<Button
												// loading={uploading === `PACKAGE_CAROUSEL_THUMBNAILS_${idx}`}
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

export default SingleService;

export async function getServerSideProps({
	params,
}: {
	params: { serviceId: string };
}) {
	return {
		props: { serviceId: params?.serviceId },
	};
}

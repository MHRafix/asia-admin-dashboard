import { Notify } from '@/app/config/alertNotification/Notification';
import { fileUploader } from '@/app/config/logic/fileUploader';
import { CREATE_TRAVEL_PACKAGE } from '@/app/config/queries/travelPackage.query';
import {
	PACKAGE_STATUS,
	SALE_STATUS,
	activeStep,
	carouselThumbnailsAtom,
	packageBasicInfoAtom,
} from '@/store/createPackgage.store';
import { useMutation } from '@apollo/client';
import { Button, FileButton, Flex, Group, Input, Title } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { useAtom } from 'jotai';
import Image from 'next/image';
import Router from 'next/router';
import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { FiUpload } from 'react-icons/fi';
import { HiOutlinePhotograph } from 'react-icons/hi';

const UploadThumbnails: React.FC = () => {
	const [uploading, setUploading] = useState<string>('');
	const [step, onChangeStep] = useAtom(activeStep);
	const [packageBasicInfo, onChangePackageBasicInfo] =
		useAtom(packageBasicInfoAtom);
	const [thumbnail, setThumbnail] = useState<string>(
		packageBasicInfo?.thumbnail!
	);
	const [carouselImg, onChangeCarouselThumbnails] = useAtom(
		carouselThumbnailsAtom
	);
	const [carouselThumbnails, setCarouselThumbnails] = useState<any>(
		carouselImg || ['']
	);
	const nextStep = () =>
		onChangeStep((currentStep) =>
			currentStep < 3 ? currentStep + 1 : currentStep
		);

	const handleUploadPackageThumbnail = async (
		file: File,
		actionName: string,
		onChangeThumbnail: any,
		idx?: number
	) => {
		try {
			setUploading(actionName);
			const { file_upload_cloudinary } = fileUploader(
				file,
				'travel_package_thumbnails'
			);

			const uploaded = await file_upload_cloudinary();
			if (uploaded) {
				showNotification({
					title: 'File uploaded successfully!',
					message: 'Save file to database.',
					color: 'teal',
				});
				if (idx === 0 || idx! > 0) {
					if (idx !== 0) {
						onChangeThumbnail((prev: any) => {
							prev.splice(idx, 1);
							return [...prev, uploaded];
						});
					} else {
						onChangeThumbnail((prev: any) => {
							prev[idx] = uploaded;
							return [...prev];
						});
					}
				} else {
					onChangeThumbnail(() => uploaded);
				}
				setUploading('');
			} else {
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

	const [createPackage, { loading: creatingPackage }] = useMutation(
		CREATE_TRAVEL_PACKAGE,
		Notify({
			sucTitle: 'Package created successfully!',
			sucMessage: 'Please refetch package list.',
			errMessage: 'Failed to create package.',
			action: () => Router.push(`/tour_packages`),
		})
	);

	console.log(thumbnail);

	//submit create package function
	const onSubmit = () => {
		onChangePackageBasicInfo({
			...packageBasicInfo,
			thumbnail: thumbnail,
		});
		onChangeCarouselThumbnails(carouselThumbnails);
		// nextStep();
		createPackage({
			variables: {
				...packageBasicInfo,
				thumbnail: thumbnail,
				carouselThumbnails,
				saleStatus:
					packageBasicInfo?.salePrice === 0
						? SALE_STATUS.SALE
						: SALE_STATUS.FIXED,
				packageStatus: PACKAGE_STATUS.UPCOMING,
				isPublished: true,
			},
		});
		console.log({
			...packageBasicInfo,
			thumbnail: thumbnail,
			carouselThumbnails: {
				thumbnail: carouselThumbnails,
			},
			saleStatus:
				packageBasicInfo?.salePrice === 0
					? SALE_STATUS.SALE
					: SALE_STATUS.FIXED,
			packageStatus: PACKAGE_STATUS.UPCOMING,
			isPublished: true,
		});
	};
	return (
		<div>
			<div className='flex justify-center items-center gap-8 mt-5'>
				<Input.Wrapper
					label='Upload thumbnail'
					size='md'
					className='w-4/12 relative'
				>
					<div className='h-[200px] bg-[#212231] flex items-center justify-center'>
						{thumbnail ? (
							<Image
								src={thumbnail}
								alt='Thumbnail'
								width={200}
								className='!w-full'
								height={200}
							/>
						) : (
							<HiOutlinePhotograph size={50} />
						)}
					</div>
					<div className='absolute bottom-3 right-3'>
						<FileButton
							onChange={(file: File) =>
								handleUploadPackageThumbnail(
									file,
									'PACKAGE_THUMBNAIL',
									setThumbnail
								)
							}
							accept='image/png,image/jpeg'
						>
							{(props) => (
								<Button
									loading={uploading === 'PACKAGE_THUMBNAIL'}
									color='violet'
									{...props}
								>
									<FiUpload color='#d0d1db' size={16} />
								</Button>
							)}
						</FileButton>
					</div>
				</Input.Wrapper>
			</div>

			<div className='mt-16'>
				<Flex justify={'space-between'} align={'center'}>
					<Title order={3} ff={'Nunito sans, sans-serif'} mb={0}>
						Package carousel thumbnails
					</Title>
					<Button
						leftIcon={<FaPlus size={16} />}
						color='violet'
						size='md'
						ff={'Nunito sans, sans-serif'}
						variant='light'
						onClick={() =>
							setCarouselThumbnails((thumbnails: string[]) => [
								...thumbnails,
								'',
							])
						}
					>
						Add new file
					</Button>
				</Flex>
				<div className='grid lg:grid-cols-2 gap-5 mt-10'>
					{carouselThumbnails?.map((thumbnail: string, idx: number) => (
						<Input.Wrapper
							key={idx}
							label={`Upload carousel thumbnail ${idx + 1}`}
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
									<HiOutlinePhotograph color='#d0d1db' size={50} />
								)}
							</div>
							<div className='absolute bottom-3 right-3'>
								<FileButton
									onChange={(file: File) =>
										handleUploadPackageThumbnail(
											file,
											`PACKAGE_CAROUSEL_THUMBNAILS_${idx}`,
											setCarouselThumbnails,
											idx
										)
									}
									accept='image/png,image/jpeg'
								>
									{(props) => (
										<Button
											loading={
												uploading === `PACKAGE_CAROUSEL_THUMBNAILS_${idx}`
											}
											color='violet'
											{...props}
										>
											<FiUpload size={16} />
										</Button>
									)}
								</FileButton>
							</div>
						</Input.Wrapper>
					))}
				</div>
			</div>
			{step === 1 && (
				<Group position='right' mt={65}>
					<Button
						color='violet'
						loading={creatingPackage}
						onClick={() => onSubmit()}
					>
						Next step
					</Button>
				</Group>
			)}
		</div>
	);
};

export default UploadThumbnails;

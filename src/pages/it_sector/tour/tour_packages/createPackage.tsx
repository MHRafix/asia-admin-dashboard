import { ITravelPackage } from '@/app/api/models/travelPackage.model';
import { GET_SINGLE_TRAVEL_PACKAGE } from '@/app/config/queries/travelPackage.query';
import PageTitleArea from '@/components/common/PageTitleArea';
import DepartureAndDestinationForm from '@/components/custom/TravelPackage/CreatePackage/DepartureAndDestinationForm';
import PackageBasicInfoForm from '@/components/custom/TravelPackage/CreatePackage/PackageBasicInfoForm';
import TransportationForm from '@/components/custom/TravelPackage/CreatePackage/TransportationForm';
import UploadThumbnails from '@/components/custom/TravelPackage/CreatePackage/UploadThumbnails';
import AdminLayout from '@/components/layouts/AdminLayout';
import {
	activeStep,
	carouselThumbnailsAtom,
	packageBasicInfoAtom,
} from '@/store/createPackgage.store';
import { useLazyQuery } from '@apollo/client';
import { Button, Group, Space, Stepper } from '@mantine/core';
import { useAtom } from 'jotai';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { MdOutlineArrowBackIos } from 'react-icons/md';

const CreatePackage: NextPage = () => {
	const [step, onChangeStep] = useAtom(activeStep);
	const [pk, onChangePackageBasicInfo] = useAtom(packageBasicInfoAtom);
	const [, onChangeCarouselThumbnails] = useAtom(carouselThumbnailsAtom);
	const { query } = useRouter();

	const prevStep = () =>
		onChangeStep((currentStep) =>
			currentStep > 0 ? currentStep - 1 : currentStep
		);

	const [getPackageDetails, { data, loading }] = useLazyQuery<{
		travelPackage: ITravelPackage;
	}>(GET_SINGLE_TRAVEL_PACKAGE, {
		variables: {
			packageId: query?.packageId,
		},
	});

	// call API
	useEffect(() => {
		getPackageDetails();
	}, [query?.packageId]);

	useEffect(() => {
		onChangePackageBasicInfo({
			packageTitle: data?.travelPackage?.packageTitle,
			regularPrice: data?.travelPackage?.regularPrice,
			salePrice: data?.travelPackage?.salePrice,
			countDown: {
				bookingStart: data?.travelPackage?.countDown?.bookingStart!,
				bookingEnd: data?.travelPackage?.countDown?.bookingEnd!,
			},
			shortDescription: data?.travelPackage?.shortDescription,
			thumbnail: data?.travelPackage?.thumbnail,
			departureFrom: data?.travelPackage?.departureFrom,
			description: data?.travelPackage?.description,
			isPublished: data?.travelPackage?.isPublished,
			destination: data?.travelPackage?.destination,
			packageStatus: data?.travelPackage?.packageStatus as any,
			transportation: data?.travelPackage?.transportation,
		});
		onChangeCarouselThumbnails(data?.travelPackage?.carouselThumbnails!);
	}, [data]);

	return (
		<AdminLayout title='Create package'>
			<PageTitleArea
				title='New tour package'
				tagline='Create a package'
				currentPathName='Create package'
				othersPath={[
					{
						pathName: 'Home',
						href: '/',
					},
					{
						pathName: 'Tour packages',
						href: '/tour_packages',
					},
				]}
			/>
			<>
				<Stepper color='violet' active={step} mt={30} breakpoint={'md'}>
					<Stepper.Step label='Basic details'>
						<Space h={20} />
						{/* <pre>{JSON.stringify(pk, null, 2)}</pre> */}
						<PackageBasicInfoForm />
					</Stepper.Step>
					<Stepper.Step label='Thumbnails & photos'>
						<Space h={20} />
						<UploadThumbnails />
					</Stepper.Step>
					<Stepper.Step label='Departure & destination'>
						<Space h={20} />
						<DepartureAndDestinationForm />
					</Stepper.Step>
					<Stepper.Step label='Transportation'>
						<Space h={20} />
						<TransportationForm />
					</Stepper.Step>
				</Stepper>

				{step !== 0 && step !== 4 && (
					<Group position='left' mt='xl'>
						<Button
							variant='light'
							leftIcon={<MdOutlineArrowBackIos size={16} />}
							color='violet'
							onClick={prevStep}
						>
							Back
						</Button>
					</Group>
				)}
			</>
		</AdminLayout>
	);
};

export default CreatePackage;

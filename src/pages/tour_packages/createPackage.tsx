import PageTitleArea from '@/components/common/PageTitleArea';
import DepartureAndDestinationForm from '@/components/custom/TravelPackage/CreatePackage/DepartureAndDestinationForm';
import PackageBasicInfoForm from '@/components/custom/TravelPackage/CreatePackage/PackageBasicInfoForm';
import UploadThumbnails from '@/components/custom/TravelPackage/CreatePackage/UploadThumbnails';
import AdminLayout from '@/components/layouts/AdminLayout';
import { activeStep } from '@/store/createPackgage.store';
import { Button, Group, Space, Stepper } from '@mantine/core';
import { useAtom } from 'jotai';
import { NextPage } from 'next';
import { MdOutlineArrowBackIos } from 'react-icons/md';

const CreatePackage: NextPage = () => {
	const [step, onChangeStep] = useAtom(activeStep);

	const prevStep = () =>
		onChangeStep((currentStep) =>
			currentStep > 0 ? currentStep - 1 : currentStep
		);

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
				<Stepper color='violet' active={step} mt={30}>
					<Stepper.Step label='Basic details'>
						<Space h={20} />
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
						Step 3 content: Get full access
					</Stepper.Step>
					<Stepper.Completed>
						<Space h={20} />
						Completed, click back button to get to previous step
					</Stepper.Completed>
				</Stepper>

				{step !== 0 && step !== 3 && (
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

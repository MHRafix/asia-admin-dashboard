import PageTitleArea from '@/components/common/PageTitleArea';
import PackageBasicInfoForm from '@/components/custom/TravelPackage/CreatePackage/PackageBasicInfoForm';
import UploadThumbnails from '@/components/custom/TravelPackage/CreatePackage/UploadThumbnails';
import AdminLayout from '@/components/layouts/AdminLayout';
import { activeStep } from '@/store/createPackgage.store';
import { Button, Group, Stepper } from '@mantine/core';
import { useAtom } from 'jotai';
import { NextPage } from 'next';

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
				<Stepper color='violet' active={step}>
					<Stepper.Step label='Basic details'>
						<PackageBasicInfoForm />
					</Stepper.Step>
					<Stepper.Step label='Thumbnails & photos'>
						<UploadThumbnails />
					</Stepper.Step>
					<Stepper.Step label='Transportation'>
						Step 3 content: Get full access
					</Stepper.Step>
					<Stepper.Completed>
						Completed, click back button to get to previous step
					</Stepper.Completed>
				</Stepper>

				{step !== 0 && step !== 3 && (
					<Group position='left' mt='xl'>
						<Button variant='default' onClick={prevStep}>
							Back
						</Button>
					</Group>
				)}
			</>
		</AdminLayout>
	);
};

export default CreatePackage;

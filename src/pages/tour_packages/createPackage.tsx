import PageTitleArea from '@/components/common/PageTitleArea';
import PackageBasicInfoForm from '@/components/custom/TravelPackage/CreatePackage/PackageBasicInfoForm';
import AdminLayout from '@/components/layouts/AdminLayout';
import { Button, Group, Stepper } from '@mantine/core';
import { NextPage } from 'next';
import { useState } from 'react';

const CreatePackage: NextPage = () => {
	const [active, setActive] = useState(1);
	const nextStep = () =>
		setActive((current) => (current < 3 ? current + 1 : current));
	const prevStep = () =>
		setActive((current) => (current > 0 ? current - 1 : current));

	return (
		<AdminLayout title='Create package'>
			<PageTitleArea
				title='New tour package'
				tagline='Create a package'
				currentPathName='Create package'
			/>
			<>
				<Stepper color='teal' active={active}>
					<Stepper.Step label='Basic details'>
						<PackageBasicInfoForm />
					</Stepper.Step>
					<Stepper.Step label='Thumbnails & photos'>
						Step 2 content: Verify email
					</Stepper.Step>
					<Stepper.Step label='Transportation'>
						Step 3 content: Get full access
					</Stepper.Step>
					<Stepper.Completed>
						Completed, click back button to get to previous step
					</Stepper.Completed>
				</Stepper>

				<Group position='center' mt='xl'>
					<Button variant='default' onClick={prevStep}>
						Back
					</Button>
					<Button onClick={nextStep}>Next step</Button>
				</Group>
			</>
		</AdminLayout>
	);
};

export default CreatePackage;

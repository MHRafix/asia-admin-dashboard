import PageTitleArea from '@/components/common/PageTitleArea';
import AdminLayout from '@/components/layouts/AdminLayout';
import {
	Button,
	Flex,
	NumberInput,
	Switch,
	Text,
	Textarea,
	TextInput,
} from '@mantine/core';
import React from 'react';

const SingleService: React.FC<{ serviceId: string }> = ({ serviceId }) => {
	return (
		<AdminLayout title='Single service'>
			<form>
				<PageTitleArea
					title='Edit service details'
					tagline='Update service details'
					actionComponent={
						<Flex gap={20} align='center'>
							<Switch
								size='lg'
								labelPosition='left'
								label='Is customizeable ?'
								color='red'
							/>
							<Button color='teal'>Save Details</Button>
						</Flex>
					}
				/>

				<TextInput
					label={
						<Text size='lg' my={5}>
							Service title
						</Text>
					}
					size='md'
					my={10}
					className='!bg-[#1D1E2B]'
				/>
				<Textarea
					label={
						<Text size='lg' my={5}>
							Short descrition
						</Text>
					}
					size='md'
					my={10}
					className='!bg-[#1D1E2B]'
				/>
				<Textarea
					label={
						<Text size='lg' my={5}>
							Descrition
						</Text>
					}
					size='md'
					my={10}
					className='!bg-[#1D1E2B]'
				/>
				<NumberInput
					label={
						<Text size='lg' my={5}>
							Service price
						</Text>
					}
					size='md'
					my={10}
					className='!bg-[#1D1E2B]'
				/>
				<TextInput
					label={
						<Text size='lg' my={5}>
							Meet time
						</Text>
					}
					size='md'
					my={10}
					className='!bg-[#1D1E2B]'
				/>
			</form>
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
		props: { serviceId: params?.serviceId }, // will be passed to the page component as props
	};
}

import NotepadEditor from '@/components/common/NotepadEditor';
import PageTitleArea from '@/components/common/PageTitleArea';
import AdminLayout from '@/components/layouts/AdminLayout';
import {
	Button,
	Flex,
	Input,
	NumberInput,
	Space,
	Switch,
	Text,
} from '@mantine/core';
import React from 'react';
import TimeInput from 'react-advanced-time-input';
import { FaNotesMedical } from 'react-icons/fa';

const SingleService: React.FC<{ serviceId: string }> = ({ serviceId }) => {
	return (
		<AdminLayout title='Single service'>
			<form>
				<PageTitleArea
					title='Edit service details'
					tagline='Update service details'
					actionComponent={<Button color='teal'>Save Details</Button>}
				/>

				<div className='grid lg:grid-cols-2 gap-5'>
					<Input.Wrapper
						label={
							<Text fz={18} my={5}>
								Title
							</Text>
						}
						my={10}
						// error={errors?.name?.message as string}
					>
						<Input
							variant='unstyled'
							size={'md'}
							className='!border-[1px] !border-[#32344b] border-solid px-2'
						/>
					</Input.Wrapper>

					<Input.Wrapper
						label={
							<Text fz={18} my={5}>
								Price
							</Text>
						}
						my={10}
						// error={errors?.name?.message as string}
					>
						<NumberInput
							variant='unstyled'
							size={'md'}
							className='!border-[1px] !border-[#32344b] border-solid px-2'
						/>
					</Input.Wrapper>
				</div>
				<Input.Wrapper
					label={
						<Text fz={18} my={5}>
							Short descrition
						</Text>
					}
					my={10}
					// error={errors?.name?.message as string}
				>
					<NotepadEditor title='Short Desc' icon={<FaNotesMedical />} />
				</Input.Wrapper>
				<Space h={40} />
				<Input.Wrapper
					label={
						<Text fz={18} my={5}>
							Descrition
						</Text>
					}
					my={10}
					// error={errors?.name?.message as string}
				>
					<NotepadEditor title='Short Desc' icon={<FaNotesMedical />} />
				</Input.Wrapper>
				<Space h={40} />

				<Input.Wrapper
					label={
						<Text fz={18} my={5}>
							Meet time
						</Text>
					}
					my={10}
					// error={errors?.name?.message as string}
				>
					<Flex gap={20} align='center'>
						<TimeInput
							style={{
								display: 'block',
								width: '100px',
								height: '50px',
								fontSize: '25px',
								border: '1px solid #414252',
								padding: '10px',
								background: 'transparent',
								outline: 'none',
								borderRadius: '5px',
							}}
							value={'10:20'}
							// onChange={(event, value) => {...}}
							colon=':'
						/>
						<Switch
							size='lg'
							labelPosition='left'
							label='Is customizeable ?'
							color='red'
						/>
					</Flex>
				</Input.Wrapper>
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

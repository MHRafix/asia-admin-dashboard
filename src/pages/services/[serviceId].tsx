import { useGetService } from '@/app/api/api-hooks/service.api';
import { UPDATE_SERVICE_DEFAULT_VALUES } from '@/app/config/formDefaultsValue/formDefaultValues';
import { updateServiceSchema } from '@/app/config/validationSchema/Schema';
import NotepadEditor from '@/components/common/NotepadEditor';
import PageTitleArea from '@/components/common/PageTitleArea';
import AdminLayout from '@/components/layouts/AdminLayout';
import {
	Button,
	Input,
	NumberInput,
	Switch,
	Text,
	Textarea,
} from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import React, { useEffect, useRef } from 'react';
import { FaNotesMedical } from 'react-icons/fa';

const SingleService: React.FC<{ serviceId: string }> = ({ serviceId }) => {
	const { getingService, service, refetchService } = useGetService(serviceId);
	const ref = useRef<HTMLInputElement>();

	const form = useForm({
		initialValues: UPDATE_SERVICE_DEFAULT_VALUES,
		validate: yupResolver(updateServiceSchema),
	});

	// update initial info with service data
	useEffect(() => {
		form.setValues({
			title: service?.title,
			shortDesc: service?.shortDesc,
			desc: service?.desc,
			preRequirements: service?.preRequirements,
			price: service?.price,
			isCustomizeable: service?.isCustomizeable,
		});
	}, [service]);

	const handleUpdateForm = (values: any) => {
		console.log(values);
	};

	return (
		<AdminLayout title='Single service'>
			<form onSubmit={form.onSubmit(handleUpdateForm)}>
				<PageTitleArea
					title='Edit service details'
					tagline='Update service details'
					actionComponent={
						<Button color='teal' type='submit'>
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
						error={form.errors.preRequirements}
					>
						<NotepadEditor
							title='Short Desc'
							{...form.getInputProps('preRequirements')}
							icon={<FaNotesMedical />}
						/>
					</Input.Wrapper>
				</div>
				<div className='block h-[200px]'>
					<Input.Wrapper
						label={
							<Text fz={18} my={5}>
								Descrition
							</Text>
						}
						error={form.errors.desc}
					>
						<NotepadEditor
							{...form.getInputProps('desc')}
							title='Short Desc'
							icon={<FaNotesMedical />}
						/>
					</Input.Wrapper>
				</div>

				<div className='grid lg:flex justify-between items-center gap-5'>
					<Switch
						{...form.getInputProps('isCustomizeable')}
						size='lg'
						labelPosition='left'
						label={
							<Text fz={18} fw={500}>
								Is customizeable ?
							</Text>
						}
						color='red'
					/>
				</div>
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
		props: { serviceId: params?.serviceId },
	};
}

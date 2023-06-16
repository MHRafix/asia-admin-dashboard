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
	Input,
	NumberInput,
	Switch,
	Text,
	Textarea,
} from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import React, { useEffect, useState } from 'react';

const SingleService: React.FC<{ serviceId: string }> = ({ serviceId }) => {
	const { getingService, service, refetchService } = useGetService(serviceId);
	const [preRequirements, setPreRequirements] = useState(
		service?.preRequirements
	);
	const [description, setDescription] = useState(service?.desc);

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
			isCustomizable: service?.isCustomizable,
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
									Descrition
								</Text>
							}
						>
							<NotepadEditor value={description!} setValue={setDescription} />
						</Input.Wrapper>
					</div>

					<div className='grid lg:flex justify-between items-center gap-5 mt-5 lg:mt-0'>
						<Switch
							{...form.getInputProps('isCustomizable')}
							size='lg'
							labelPosition='left'
							label={
								<Text fz={18} fw={500}>
									Is customizable ?
								</Text>
							}
							color='red'
							defaultChecked={service?.isCustomizable}
						/>
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

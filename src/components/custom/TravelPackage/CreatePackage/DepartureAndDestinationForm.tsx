import {
	DEPARTURE_DESTINATION_FORM_DEFAULT_VALUES,
	DEPARTURE_DESTINATION_FORM_SCHEMA,
	IDepartureAndDestinationFormStates,
} from '@/app/config/form.validation/packageForm/package.form.validation';
import { activeStep, packageBasicInfoAtom } from '@/store/createPackgage.store';
import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers/yup';
import { Accordion, Button, Group, Input, Space } from '@mantine/core';
import { useAtom } from 'jotai';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { BiMapPin } from 'react-icons/bi';
import { RiRoadMapLine } from 'react-icons/ri';

const DepartureAndDestinationForm: React.FC = () => {
	const [packageBasicInfo, onChangePackageInfo] = useAtom(packageBasicInfoAtom);
	const [step, onChangeStep] = useAtom(activeStep);
	const nextStep = () =>
		onChangeStep((currentStep) =>
			currentStep < 3 ? currentStep + 1 : currentStep
		);

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm<IDepartureAndDestinationFormStates>({
		defaultValues: DEPARTURE_DESTINATION_FORM_DEFAULT_VALUES,
		resolver: yupResolver(DEPARTURE_DESTINATION_FORM_SCHEMA),
	});

	useEffect(() => {
		if (packageBasicInfo) {
			setValue('departureFrom.name', packageBasicInfo?.departureFrom?.name!);
			setValue('departureFrom.lat', packageBasicInfo?.departureFrom?.lat!);
			setValue('departureFrom.lng', packageBasicInfo?.departureFrom?.lng!);
			setValue('destination.name', packageBasicInfo?.destination?.name!);
			setValue('destination.lat', packageBasicInfo?.destination?.lat!);
			setValue('destination.lng', packageBasicInfo?.destination?.lng!);
		}
	}, [packageBasicInfo]);

	console.log(packageBasicInfo);
	const onSubmit = (value: IDepartureAndDestinationFormStates) => {
		onChangePackageInfo({
			...packageBasicInfo,
			...value,
		});
		nextStep();
	};

	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Accordion variant='separated' multiple>
					<Accordion.Item value='departureFrom'>
						<Accordion.Control
							bg='#1D1E2B'
							className='shadow-xl border-solid border-[1px] border-slate-700 py-1 rounded-t-md'
							ff={'Nunito sans, sans-serif'}
							fw={700}
							fz={20}
							icon={<RiRoadMapLine color='#20C997' size={25} />}
						>
							Departure from
						</Accordion.Control>
						<Accordion.Panel
							bg='#1D1E2B'
							className='shadow-xl border-solid border-[1px] border-slate-700 pt-5 rounded-md border-t-0'
						>
							<Input.Wrapper
								label='Departure from'
								size='md'
								error={
									<ErrorMessage errors={errors} name='departureFrom.name' />
								}
							>
								<Input
									placeholder='Departure place'
									variant='unstyled'
									size={'md'}
									className='!border-[1px] !border-[#32344b] border-solid px-2 rounded-md'
									{...register('departureFrom.name')}
								/>
							</Input.Wrapper>
							<Space h={10} />
							<div className='grid lg:grid-cols-2 gap-5'>
								<Input.Wrapper
									label='Latitude'
									size='md'
									error={
										<ErrorMessage errors={errors} name='departureFrom.lat' />
									}
								>
									<Input
										placeholder='Departure place latitude'
										variant='unstyled'
										size={'md'}
										className='!border-[1px] !border-[#32344b] border-solid px-2 rounded-md'
										{...register('departureFrom.lat')}
									/>
								</Input.Wrapper>
								<Input.Wrapper
									label='Longitude'
									size='md'
									error={
										<ErrorMessage errors={errors} name='departureFrom.lng' />
									}
								>
									<Input
										placeholder='Departure place longitude'
										variant='unstyled'
										size={'md'}
										className='!border-[1px] !border-[#32344b] border-solid px-2 rounded-md'
										{...register('departureFrom.lng')}
									/>
								</Input.Wrapper>
							</div>
						</Accordion.Panel>
					</Accordion.Item>
				</Accordion>
				<Space h={20} />
				<Accordion variant='separated' multiple>
					<Accordion.Item value='destination'>
						<Accordion.Control
							bg='#1D1E2B'
							className='shadow-xl border-solid border-[1px] border-slate-700 py-1 rounded-t-md'
							ff={'Nunito sans, sans-serif'}
							fw={700}
							fz={20}
							icon={<BiMapPin color='#F56868' size={25} />}
						>
							Destination
						</Accordion.Control>
						<Accordion.Panel
							bg='#1D1E2B'
							className='shadow-xl border-solid border-[1px] border-slate-700 pt-5 rounded-md border-t-0'
						>
							<Input.Wrapper
								size='md'
								label='Destination to'
								error={<ErrorMessage errors={errors} name='destination.name' />}
							>
								<Input
									placeholder='Destination place'
									variant='unstyled'
									size={'md'}
									className='!border-[1px] !border-[#32344b] border-solid px-2 rounded-md'
									{...register('destination.name')}
								/>
							</Input.Wrapper>
							<Space h={10} />
							<div className='grid lg:grid-cols-2 gap-5'>
								<Input.Wrapper
									size='md'
									label='Latitude'
									error={
										<ErrorMessage errors={errors} name='destination.lat' />
									}
								>
									<Input
										placeholder='Destination place latitude'
										variant='unstyled'
										size={'md'}
										className='!border-[1px] !border-[#32344b] border-solid px-2 rounded-md'
										{...register('destination.lat')}
									/>
								</Input.Wrapper>
								<Input.Wrapper
									size='md'
									label='Longitude'
									error={
										<ErrorMessage errors={errors} name='destination.lng' />
									}
								>
									<Input
										placeholder='Destination place longitude'
										variant='unstyled'
										size={'md'}
										className='!border-[1px] !border-[#32344b] border-solid px-2 rounded-md'
										{...register('destination.lng')}
									/>
								</Input.Wrapper>
							</div>
						</Accordion.Panel>
					</Accordion.Item>
				</Accordion>
				<Space h={20} />

				<Group position='right'>
					<Button type='submit' color='teal'>
						Save
					</Button>{' '}
					<Button type='submit' color='teal' onClick={nextStep}>
						Next{' '}
					</Button>
				</Group>
			</form>
		</div>
	);
};

export default DepartureAndDestinationForm;

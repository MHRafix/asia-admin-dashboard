import {
	ITransportationFormState,
	TOURBY,
	TRANSPORTATION_FORM_DEFAULT_VALUES,
	TRANSPORTATION_FORM_SCHEMA,
} from '@/app/config/form.validation/packageForm/package.form.validation';
import { activeStep, packageBasicInfoAtom } from '@/store/createPackgage.store';
import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers/yup';
import { Accordion, Button, Group, Input, Select, Space } from '@mantine/core';
import { DateInput, TimeInput } from '@mantine/dates';
import { useAtom } from 'jotai';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { RiRoadMapFill, RiRoadMapLine } from 'react-icons/ri';
import { TbPlaneArrival, TbPlaneDeparture } from 'react-icons/tb';

const TransportationForm: React.FC = () => {
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
		watch,
	} = useForm<ITransportationFormState>({
		defaultValues: TRANSPORTATION_FORM_DEFAULT_VALUES,
		resolver: yupResolver(TRANSPORTATION_FORM_SCHEMA),
	});

	useEffect(() => {
		if (packageBasicInfo) {
			setValue(
				'transportName',
				packageBasicInfo?.transportation?.transportName!
			);
			setValue('arrivalDate', packageBasicInfo?.transportation?.arrivalDate!);
			setValue('arrivalTime', packageBasicInfo?.transportation?.arrivalTime!);
			setValue(
				'departureDate',
				packageBasicInfo?.transportation?.departureDate!
			);
			setValue(
				'departureTime',
				packageBasicInfo?.transportation?.departureTime!
			);
			setValue('journeyBreak', packageBasicInfo?.transportation?.journeyBreak!);
			setValue('stops', packageBasicInfo?.transportation?.stops!);
			setValue(
				'departureStation',
				packageBasicInfo?.transportation?.departureStation!
			);
			setValue(
				'destinationStation',
				packageBasicInfo?.transportation?.destinationStation!
			);
			setValue('tourBy', packageBasicInfo?.transportation?.tourBy!);
		}
	}, [packageBasicInfo]);

	console.log(packageBasicInfo);

	const onSubmit = (value: ITransportationFormState) => {
		// onChangePackageInfo({
		// 	...packageBasicInfo,
		// 	...value,
		// });
		// nextStep();
		console.log(value);
	};
	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Accordion variant='separated' multiple>
					<Accordion.Item value='transportation'>
						<Accordion.Control
							bg='#1D1E2B'
							className='shadow-xl border-solid border-[1px] border-slate-700 py-1 rounded-t-md'
							ff={'Nunito sans, sans-serif'}
							fw={700}
							fz={20}
							icon={<RiRoadMapLine color='#20C997' size={25} />}
						>
							Departure point
						</Accordion.Control>
						<Accordion.Panel
							bg='#1D1E2B'
							className='shadow-xl border-solid border-[1px] border-slate-700 pt-5 rounded-md border-t-0'
						>
							<div className='grid lg:grid-cols-2'>
								{' '}
								<Input.Wrapper
									label='Tour way by'
									size='md'
									error={<ErrorMessage errors={errors} name='tourBy' />}
								>
									<Select
										width={400}
										data={[
											{
												label: TOURBY.BY_AIR,
												value: TOURBY.BY_AIR,
											},
											{
												label: TOURBY.BY_ROAD,
												value: TOURBY.BY_ROAD,
											},
											{
												label: TOURBY.BY_RAIL,
												value: TOURBY.BY_RAIL,
											},
										]}
										// defaultValue={watch('tourby')}
										onChange={(v) => setValue('tourBy', v!)}
										placeholder='Tour way by'
										variant='unstyled'
										size={'md'}
										className='!border-[1px] !border-[#32344b] border-solid px-2 rounded-md w-[90%]'
									/>
								</Input.Wrapper>
								<Input.Wrapper
									label='Transport name'
									size='md'
									error={<ErrorMessage errors={errors} name='transportName' />}
								>
									<Input
										placeholder='Transport name'
										variant='unstyled'
										size={'md'}
										className='!border-[1px] !border-[#32344b] border-solid px-2 rounded-md'
										{...register('transportName')}
									/>
								</Input.Wrapper>
							</div>
							<Space h={15} />
							<div className='grid lg:grid-cols-2 '>
								<Input.Wrapper
									label='Departure date'
									size='md'
									error={<ErrorMessage errors={errors} name='departureDate' />}
								>
									<DateInput
										// value={value}
										onChange={(v) => setValue('departureDate', v!)}
										placeholder='Pick a date'
										maw={400}
										variant='unstyled'
										size={'md'}
										className='!border-[1px] !border-[#32344b] border-solid px-2 rounded-md'
									/>
								</Input.Wrapper>
								<Input.Wrapper
									label='Departure time'
									size='md'
									error={<ErrorMessage errors={errors} name='departureDate' />}
								>
									<TimeInput
										{...register('departureTime')}
										variant='unstyled'
										size={'md'}
										className='!border-[1px] !border-[#32344b] border-solid px-2 rounded-md'
									/>
								</Input.Wrapper>
							</div>{' '}
							<Space h={15} />
							<div className='grid lg:grid-cols-2'>
								<Input.Wrapper
									label='Arrival date'
									size='md'
									error={<ErrorMessage errors={errors} name='arrivalDate' />}
								>
									<DateInput
										// value={value}
										onChange={(v) => setValue('arrivalDate', v!)}
										placeholder='Pick a date '
										maw={400}
										variant='unstyled'
										size={'md'}
										className='!border-[1px] !border-[#32344b] border-solid px-2 rounded-md'
									/>
								</Input.Wrapper>
								<Input.Wrapper
									label='Arrival time'
									size='md'
									error={<ErrorMessage errors={errors} name='departureDate' />}
								>
									<TimeInput
										{...register('arrivalTime')}
										variant='unstyled'
										size={'md'}
										className='!border-[1px] !border-[#32344b] border-solid px-2 rounded-md'
									/>
								</Input.Wrapper>
							</div>{' '}
							<Space h={15} />
							<div className='grid lg:grid-cols-2'>
								<Input.Wrapper
									label='Departure station'
									size='md'
									error={
										<ErrorMessage errors={errors} name='departureStation' />
									}
								>
									<Input
										placeholder='Departure station'
										maw={400}
										variant='unstyled'
										size={'md'}
										className='!border-[1px] !border-[#32344b] border-solid px-2 rounded-md'
										{...register('departureStation')}
									/>
								</Input.Wrapper>
								<Input.Wrapper
									label='Destination station'
									size='md'
									error={
										<ErrorMessage errors={errors} name='destinationStation' />
									}
								>
									<Input
										{...register('destinationStation')}
										placeholder='Destination station'
										variant='unstyled'
										size={'md'}
										className='!border-[1px] !border-[#32344b] border-solid px-2 rounded-md'
									/>
								</Input.Wrapper>
							</div>{' '}
							<Space h={15} />
							<div className='grid lg:grid-cols-2'>
								<Input.Wrapper
									label='Stops'
									size='md'
									error={<ErrorMessage errors={errors} name='stops' />}
								>
									<Input
										placeholder='Stops'
										maw={400}
										variant='unstyled'
										size={'md'}
										className='!border-[1px] !border-[#32344b] border-solid px-2 rounded-md'
										{...register('stops')}
									/>
								</Input.Wrapper>
								<Input.Wrapper
									label='Journey break'
									size='md'
									error={<ErrorMessage errors={errors} name='journeyBreak' />}
								>
									<Input
										{...register('journeyBreak')}
										placeholder='Journey break'
										variant='unstyled'
										size={'md'}
										className='!border-[1px] !border-[#32344b] border-solid px-2 rounded-md'
									/>
								</Input.Wrapper>
							</div>
						</Accordion.Panel>
					</Accordion.Item>
				</Accordion>
				<Space h={20} />
				<Accordion variant='separated' multiple>
					<Accordion.Item value='transportation'>
						<Accordion.Control
							bg='#1D1E2B'
							className='shadow-xl border-solid border-[1px] border-slate-700 py-1 rounded-t-md'
							ff={'Nunito sans, sans-serif'}
							fw={700}
							fz={20}
							icon={<RiRoadMapFill color='#20C997' size={25} />}
						>
							Arrival point
						</Accordion.Control>
						<Accordion.Panel
							bg='#1D1E2B'
							className='shadow-xl border-solid border-[1px] border-slate-700 pt-5 rounded-md border-t-0'
						>
							<div className='grid lg:grid-cols-2'>
								{' '}
								<Input.Wrapper
									label='Tour way by'
									size='md'
									error={<ErrorMessage errors={errors} name='tourBy' />}
								>
									<Select
										width={400}
										data={[
											{
												label: TOURBY.BY_AIR,
												value: TOURBY.BY_AIR,
											},
											{
												label: TOURBY.BY_ROAD,
												value: TOURBY.BY_ROAD,
											},
											{
												label: TOURBY.BY_RAIL,
												value: TOURBY.BY_RAIL,
											},
										]}
										// defaultValue={watch('tourby')}
										onChange={(v) => setValue('tourBy', v!)}
										placeholder='Tour way by'
										variant='unstyled'
										size={'md'}
										className='!border-[1px] !border-[#32344b] border-solid px-2 rounded-md w-[90%]'
									/>
								</Input.Wrapper>
								<Input.Wrapper
									label='Transport name'
									size='md'
									error={<ErrorMessage errors={errors} name='transportName' />}
								>
									<Input
										placeholder='Transport name'
										variant='unstyled'
										size={'md'}
										className='!border-[1px] !border-[#32344b] border-solid px-2 rounded-md'
										{...register('transportName')}
									/>
								</Input.Wrapper>
							</div>
							<Space h={15} />
							<div className='grid lg:grid-cols-2 '>
								<Input.Wrapper
									label='Departure date'
									size='md'
									error={<ErrorMessage errors={errors} name='departureDate' />}
								>
									<DateInput
										// value={value}
										onChange={(v) => setValue('departureDate', v!)}
										placeholder='Pick a date'
										maw={400}
										variant='unstyled'
										size={'md'}
										className='!border-[1px] !border-[#32344b] border-solid px-2 rounded-md'
									/>
								</Input.Wrapper>
								<Input.Wrapper
									label='Departure time'
									size='md'
									error={<ErrorMessage errors={errors} name='departureDate' />}
								>
									<TimeInput
										{...register('departureTime')}
										variant='unstyled'
										size={'md'}
										className='!border-[1px] !border-[#32344b] border-solid px-2 rounded-md'
									/>
								</Input.Wrapper>
							</div>{' '}
							<Space h={15} />
							<div className='grid lg:grid-cols-2'>
								<Input.Wrapper
									label='Arrival date'
									size='md'
									error={<ErrorMessage errors={errors} name='arrivalDate' />}
								>
									<DateInput
										// value={value}
										onChange={(v) => setValue('arrivalDate', v!)}
										placeholder='Pick a date '
										maw={400}
										variant='unstyled'
										size={'md'}
										className='!border-[1px] !border-[#32344b] border-solid px-2 rounded-md'
									/>
								</Input.Wrapper>
								<Input.Wrapper
									label='Arrival time'
									size='md'
									error={<ErrorMessage errors={errors} name='departureDate' />}
								>
									<TimeInput
										{...register('arrivalTime')}
										variant='unstyled'
										size={'md'}
										className='!border-[1px] !border-[#32344b] border-solid px-2 rounded-md'
									/>
								</Input.Wrapper>
							</div>{' '}
							<Space h={15} />
							<div className='grid lg:grid-cols-2'>
								<Input.Wrapper
									label='Departure station'
									size='md'
									error={
										<ErrorMessage errors={errors} name='departureStation' />
									}
								>
									<Input
										placeholder='Departure station'
										maw={400}
										variant='unstyled'
										size={'md'}
										className='!border-[1px] !border-[#32344b] border-solid px-2 rounded-md'
										{...register('departureStation')}
									/>
								</Input.Wrapper>
								<Input.Wrapper
									label='Destination station'
									size='md'
									error={
										<ErrorMessage errors={errors} name='destinationStation' />
									}
								>
									<Input
										{...register('destinationStation')}
										placeholder='Destination station'
										variant='unstyled'
										size={'md'}
										className='!border-[1px] !border-[#32344b] border-solid px-2 rounded-md'
									/>
								</Input.Wrapper>
							</div>{' '}
							<Space h={15} />
							<div className='grid lg:grid-cols-2'>
								<Input.Wrapper
									label='Stops'
									size='md'
									error={<ErrorMessage errors={errors} name='stops' />}
								>
									<Input
										placeholder='Stops'
										maw={400}
										variant='unstyled'
										size={'md'}
										className='!border-[1px] !border-[#32344b] border-solid px-2 rounded-md'
										{...register('stops')}
									/>
								</Input.Wrapper>
								<Input.Wrapper
									label='Journey break'
									size='md'
									error={<ErrorMessage errors={errors} name='journeyBreak' />}
								>
									<Input
										{...register('journeyBreak')}
										placeholder='Journey break'
										variant='unstyled'
										size={'md'}
										className='!border-[1px] !border-[#32344b] border-solid px-2 rounded-md'
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

export default TransportationForm;

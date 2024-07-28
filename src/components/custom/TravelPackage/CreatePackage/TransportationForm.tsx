import { Notify } from '@/app/config/alertNotification/Notification';
import {
	TOURBY,
	TRANSPORTATION_FORM_DEFAULT_VALUES,
	TRANSPORTATION_FORM_SCHEMA,
} from '@/app/config/form.validation/package-form/package.form.validation';
import {
	CREATE_TRAVEL_PACKAGE,
	Update_Tour_Package,
} from '@/app/config/gql-queries/travelPackage.query';
import { useGetSession } from '@/app/config/logic/getSession';
import {
	ITransportation,
	activeStep,
	carouselThumbnailsAtom,
	packageBasicInfoAtom,
} from '@/store/createPackgage.store';
import { useMutation } from '@apollo/client';
import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers/yup';
import { Accordion, Button, Group, Input, Select, Space } from '@mantine/core';
import { DatePickerInput, TimeInput } from '@mantine/dates';
import { useAtom } from 'jotai';
import Router, { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { FiCalendar } from 'react-icons/fi';
import { RiRoadMapLine } from 'react-icons/ri';
import { TbMap2 } from 'react-icons/tb';

const TransportationForm: React.FC = () => {
	const { user } = useGetSession();
	const { query } = useRouter();
	const [, onChangeStep] = useAtom(activeStep);

	const [packageBasicInfo, onChangePackageInfo] = useAtom(packageBasicInfoAtom);

	const [carouselImg] = useAtom(carouselThumbnailsAtom);
	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		watch,
		control,
	} = useForm<{ transportation: ITransportation[] }>({
		defaultValues: TRANSPORTATION_FORM_DEFAULT_VALUES,
		resolver: yupResolver(TRANSPORTATION_FORM_SCHEMA),
	});

	const { fields } = useFieldArray({
		control,
		name: 'transportation',
	});

	useEffect(() => {
		fields?.filter((field, idx: number) => {
			if (packageBasicInfo?.transportation) {
				setValue(
					`transportation.${idx}.transportName`,
					packageBasicInfo?.transportation[idx]?.transportName!
				);
				setValue(
					`transportation.${idx}.arrivalDate`,
					packageBasicInfo?.transportation[idx]?.arrivalDate!
				);
				setValue(
					`transportation.${idx}.arrivalTime`,
					packageBasicInfo?.transportation[idx]?.arrivalTime!
				);
				setValue(
					`transportation.${idx}.departureDate`,
					packageBasicInfo?.transportation[idx]?.departureDate!
				);
				setValue(
					`transportation.${idx}.departureTime`,
					packageBasicInfo?.transportation[idx]?.departureTime!
				);
				setValue(
					`transportation.${idx}.journeyBreak`,
					packageBasicInfo?.transportation[idx]?.journeyBreak!
				);
				setValue(
					`transportation.${idx}.stops`,
					packageBasicInfo?.transportation[idx]?.stops!
				);
				setValue(
					`transportation.${idx}.departureStation`,
					packageBasicInfo?.transportation[idx]?.departureStation!
				);
				setValue(
					`transportation.${idx}.destinationStation`,
					packageBasicInfo?.transportation[idx]?.destinationStation!
				);
				setValue(
					`transportation.${idx}.tourBy`,
					packageBasicInfo?.transportation[idx]?.tourBy!
				);
			}
		});
	}, [packageBasicInfo?.transportation]);

	// create package
	const [savePackage, { loading: savingPackage }] = useMutation(
		CREATE_TRAVEL_PACKAGE,
		Notify({
			sucTitle: 'Package saved successfully!',
			errMessage: 'Failed to save package.',
			action: () => {
				Router.push(`/it_sector/tour/tour_packages`);
				onChangeStep(0);
			},
		})
	);

	// update package mutation
	const [updatePackage, { loading: updatingPackage }] = useMutation(
		Update_Tour_Package,
		Notify({
			sucTitle: 'Package saved successfully!',
			errMessage: 'Failed to save package.',
			action: () => {
				Router.push(`/it_sector/tour/tour_packages`);
				onChangeStep(0);
			},
		})
	);

	const onSubmit = (value: { transportation: ITransportation[] }) => {
		onChangePackageInfo({
			...packageBasicInfo,
			transportation: value.transportation,
		});

		if (query?.packageId) {
			updatePackage({
				variables: {
					input: {
						_id: query?.packageId,
						...packageBasicInfo,
						carouselThumbnails: carouselImg,
						...value,
						isPublished: true,
						author: user?._id,
					},
				},
			});
		} else {
			savePackage({
				variables: {
					input: {
						...packageBasicInfo,
						carouselThumbnails: carouselImg,
						...value,
						isPublished: true,
						author: user?._id,
					},
				},
			});
		}
	};
	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)}>
				{fields?.map((field, idx: number) => (
					<div key={idx}>
						<Accordion variant='separated' multiple>
							<Accordion.Item value='transportation'>
								<Accordion.Control
									bg='#1D1E2B'
									className='shadow-xl border-solid border-[1px] border-slate-700 py-1 rounded-t-md'
									ff={'Nunito sans, sans-serif'}
									fw={700}
									fz={20}
									icon={
										idx < 1 ? (
											<TbMap2 color='#20C997' size={25} />
										) : (
											<RiRoadMapLine color='#20C997' size={25} />
										)
									}
								>
									{idx < 1 ? 'Go from' : 'Return from'}
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
											error={
												<ErrorMessage
													errors={errors}
													name={`transportation.${idx}.tourBy`}
												/>
											}
										>
											<Select
												value={watch(`transportation.${idx}.tourBy`)}
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
												onChange={(v: any) =>
													setValue(`transportation.${idx}.tourBy`, v!)
												}
												placeholder='Tour way by'
												variant='unstyled'
												size={'md'}
												className='!border-[1px] !border-[#32344b] border-solid px-2 rounded-md w-[90%]'
											/>
										</Input.Wrapper>
										<Input.Wrapper
											label='Transport name'
											size='md'
											error={
												<ErrorMessage
													errors={errors}
													name={`transportation.${idx}.transportName`}
												/>
											}
										>
											<Input
												placeholder='Transport name'
												variant='unstyled'
												size={'md'}
												className='!border-[1px] !border-[#32344b] border-solid px-2 rounded-md'
												{...register(`transportation.${idx}.transportName`)}
											/>
										</Input.Wrapper>
									</div>
									<Space h={15} />
									<div className='grid lg:grid-cols-2 '>
										<Input.Wrapper
											label='Departure date'
											size='md'
											error={
												<ErrorMessage
													errors={errors}
													name={`transportation.${idx}.departureDate`}
												/>
											}
										>
											<DatePickerInput
												// value={watch(`transportation.${idx}.departureDate`)}
												// onChange={(v) =>
												// 	setValue(`transportation.${idx}.departureDate`, v!)
												// }
												// placeholder='Pick a date'
												// maw={400}
												// variant='unstyled'
												// size={'md'}
												// className='!border-[1px] !border-[#32344b] border-solid px-2 rounded-md'

												defaultValue={watch(
													`transportation.${idx}.departureDate`
												)}
												valueFormat='DD MMM YYYY'
												type='default'
												size={'md'}
												icon={<FiCalendar size='1.1rem' />}
												variant='unstyled'
												className='!border-[1px] !border-[#32344b] border-solid px-1 py-[7px] rounded-md'
												onChange={(v) =>
													setValue(`transportation.${idx}.departureDate`, v!)
												}
												placeholder='Pick a date '
												maw={400}
											/>
										</Input.Wrapper>
										<Input.Wrapper
											label='Departure time'
											size='md'
											error={
												<ErrorMessage
													errors={errors}
													name={`transportation.${idx}.departureTime`}
												/>
											}
										>
											<TimeInput
												{...register(`transportation.${idx}.departureTime`)}
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
											error={
												<ErrorMessage
													errors={errors}
													name={`transportation.${idx}.arrivalDate`}
												/>
											}
										>
											<DatePickerInput
												defaultValue={watch(
													`transportation.${idx}.arrivalDate`
												)}
												valueFormat='DD MMM YYYY'
												type='default'
												size={'md'}
												// defaultValue={getValues('bookingStart')}
												icon={<FiCalendar size='1.1rem' />}
												variant='unstyled'
												className='!border-[1px] !border-[#32344b] border-solid px-1 py-[7px] rounded-md'
												onChange={(v) =>
													setValue(`transportation.${idx}.arrivalDate`, v!)
												}
												placeholder='Pick a date '
												maw={400}
											/>
										</Input.Wrapper>
										<Input.Wrapper
											label='Arrival time'
											size='md'
											error={
												<ErrorMessage
													errors={errors}
													name={`transportation.${idx}.arrivalTime`}
												/>
											}
										>
											<TimeInput
												{...register(`transportation.${idx}.arrivalTime`)}
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
												<ErrorMessage
													errors={errors}
													name={`transportation.${idx}.departureStation`}
												/>
											}
										>
											<Input
												placeholder='Departure station'
												maw={400}
												variant='unstyled'
												size={'md'}
												className='!border-[1px] !border-[#32344b] border-solid px-2 rounded-md'
												{...register(`transportation.${idx}.departureStation`)}
											/>
										</Input.Wrapper>
										<Input.Wrapper
											label='Destination station'
											size='md'
											error={
												<ErrorMessage
													errors={errors}
													name={`transportation.${idx}.destinationStation`}
												/>
											}
										>
											<Input
												{...register(
													`transportation.${idx}.destinationStation`
												)}
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
											error={
												<ErrorMessage
													errors={errors}
													name={`transportation.${idx}.stops`}
												/>
											}
										>
											<Input
												placeholder='Stops'
												maw={400}
												variant='unstyled'
												size={'md'}
												className='!border-[1px] !border-[#32344b] border-solid px-2 rounded-md'
												{...register(`transportation.${idx}.stops`)}
											/>
										</Input.Wrapper>
										<Input.Wrapper
											label='Journey break'
											size='md'
											error={
												<ErrorMessage
													errors={errors}
													name={`transportation.${idx}.journeyBreak`}
												/>
											}
										>
											<Input
												{...register(`transportation.${idx}.journeyBreak`)}
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
					</div>
				))}

				<Group position='right'>
					<Button
						type='submit'
						color='teal'
						loading={savingPackage || updatingPackage}
					>
						Save
					</Button>
				</Group>
			</form>
		</div>
	);
};

export default TransportationForm;

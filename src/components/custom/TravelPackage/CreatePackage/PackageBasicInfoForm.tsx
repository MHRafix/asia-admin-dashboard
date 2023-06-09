import { Notify } from '@/app/config/alertNotification/Notification';
import {
	CREATE_PACKAGE_FORM_BASIC_INFO_DEFAULT_VALUE,
	CREATE_PACKAGE_FORM_BASIC_INFO_SCHEMA,
} from '@/app/config/form.validation/packageForm/package.form.validation';
import { CREATE_TRAVEL_PACKAGE } from '@/app/config/queries/travelPackage.query';
import NotepadEditor from '@/components/common/NotepadEditor';
import { activeStep, packageBasicInfoAtom } from '@/store/createPackgage.store';
import { useMutation } from '@apollo/client';
import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Group, Input, Space, Textarea } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useAtom } from 'jotai';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiCalendar } from 'react-icons/fi';

const PackageBasicInfoForm: React.FC = () => {
	const [desc, setDesc] = useState<string>();
	const [packageBasicInfo, onChangePackageInfo] = useAtom(packageBasicInfoAtom);
	const [step, onChangeStep] = useAtom(activeStep);
	const nextStep = () =>
		onChangeStep((currentStep) =>
			currentStep < 3 ? currentStep + 1 : currentStep
		);
	const [submitType, setSubmitType] = useState('');

	const {
		register,
		handleSubmit,
		setValue,
		getValues,
		formState: { errors },
	} = useForm<IPackageBasicInfoFormState>({
		defaultValues: CREATE_PACKAGE_FORM_BASIC_INFO_DEFAULT_VALUE,
		resolver: yupResolver(CREATE_PACKAGE_FORM_BASIC_INFO_SCHEMA),
		mode: 'onChange',
	});

	useEffect(() => {
		if (packageBasicInfo) {
			setValue('packageTitle', packageBasicInfo?.packageTitle!);
			setValue('regularPrice', packageBasicInfo?.regularPrice!);
			setValue('salePrice', packageBasicInfo?.salePrice!);
			setValue('shortDescription', packageBasicInfo?.shortDescription!);
			setValue('bookingStart', packageBasicInfo?.countDown?.bookingStart!);
			setValue('bookingEnd', packageBasicInfo?.countDown?.bookingEnd!);
		}
	}, [packageBasicInfo]);

	const [savePackage, { loading: savingPackage }] = useMutation(
		CREATE_TRAVEL_PACKAGE,
		Notify({
			sucTitle: 'Package saved successfully!',
			sucMessage: 'Please refetch package list.',
			errMessage: 'Failed to save package.',
		})
	);

	const onSubmit = (value: IPackageBasicInfoFormState) => {
		onChangePackageInfo({
			...packageBasicInfo,
			...value,
			countDown: {
				bookingStart: value.bookingStart,
				bookingEnd: value.bookingEnd,
			},
			description: desc,
		});

		if (submitType === 'save') {
			savePackage({
				variables: {
					...packageBasicInfo,
					...value,
					countDown: {
						bookingStart: value.bookingStart,
						bookingEnd: value.bookingEnd,
					},
					description: desc,
					isPublished: false,
				},
			});
		} else {
			nextStep();
		}
	};

	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)}>
				{/* <pre>{JSON?.stringify(errors)}</pre> */}
				<div className='grid lg:grid-cols-2 lg:gap-5 gap-2'>
					<Input.Wrapper
						label='Package Title'
						size='md'
						error={<ErrorMessage errors={errors} name='packageTitle' />}
					>
						<Input
							placeholder='@Kashmir trip'
							variant='unstyled'
							size={'md'}
							className='!border-[1px] !border-[#32344b] border-solid px-2 rounded-md'
							{...register('packageTitle')}
						/>
					</Input.Wrapper>
					<div className='grid lg:grid-cols-2 lg:gap-5 gap-2'>
						<Input.Wrapper
							label='Regular price'
							size='md'
							error={<ErrorMessage errors={errors} name='regularPrice' />}
						>
							<Input
								variant='unstyled'
								placeholder='12000'
								size={'md'}
								className='!border-[1px] !border-[#32344b] border-solid px-2 rounded-md'
								type='number'
								{...register('regularPrice')}
							/>
						</Input.Wrapper>
						<Input.Wrapper
							label='Sale price'
							size='md'
							error={<ErrorMessage errors={errors} name='salePrice' />}
						>
							<Input
								variant='unstyled'
								placeholder='11000'
								size={'md'}
								className='!border-[1px] !border-[#32344b] border-solid px-2 rounded-md'
								type='number'
								{...register('salePrice')}
							/>
						</Input.Wrapper>
					</div>
					<Input.Wrapper
						label='Short description'
						size='md'
						error={<ErrorMessage errors={errors} name='shortDescription' />}
					>
						<Textarea
							variant='unstyled'
							placeholder='Short description'
							size={'md'}
							className='!border-[1px] !border-[#32344b] border-solid px-2 rounded-md'
							{...register('shortDescription')}
						/>
					</Input.Wrapper>

					<div className='grid lg:grid-cols-2 lg:gap-5 gap-2'>
						<Input.Wrapper
							label='Registration start'
							size='md'
							error={<ErrorMessage errors={errors} name='bookingStart' />}
						>
							<DatePickerInput
								valueFormat='DD MMM YYYY'
								type='default'
								// @ts-ignore
								onChange={(d: Date) =>
									setValue('bookingStart', d!, {
										shouldValidate: true,
									})
								}
								size={'md'}
								defaultValue={getValues('bookingStart')}
								icon={<FiCalendar size='1.1rem' />}
								variant='unstyled'
								className='!border-[1px] !border-[#32344b] border-solid px-1 py-[7px] rounded-md'
								// {...register('countDown.bookingStart')}
							/>
						</Input.Wrapper>
						<Input.Wrapper
							label='Registration close'
							size='md'
							error={<ErrorMessage errors={errors} name='bookingEnd' />}
						>
							<DatePickerInput
								valueFormat='DD MMM YYYY'
								type='default'
								defaultValue={getValues('bookingEnd')}
								// @ts-ignore
								onChange={(d: Date) =>
									setValue('bookingEnd', d!, { shouldValidate: true })
								}
								size={'md'}
								icon={<FiCalendar size='1.1rem' />}
								variant='unstyled'
								className='!border-[1px] !border-[#32344b] border-solid px-1 py-[7px] rounded-md'
							/>
						</Input.Wrapper>
					</div>
				</div>
				<Space h={20} />
				<Input.Wrapper label='Description' size='md'>
					<NotepadEditor
						setValue={setDesc}
						value={
							packageBasicInfo?.description
								? packageBasicInfo?.description
								: desc!
						}
					/>
				</Input.Wrapper>
				<Group position='right' mt={65}>
					<Button
						type='submit'
						color='teal'
						loading={savingPackage}
						onClick={() => setSubmitType('save')}
					>
						Save
					</Button>
					<Button
						type='submit'
						color='violet'
						onClick={() => setSubmitType('next')}
					>
						Next step
					</Button>
				</Group>
			</form>
		</div>
	);
};

export default PackageBasicInfoForm;

export interface IPackageBasicInfoFormState {
	packageTitle: string;
	regularPrice: number;
	salePrice: number;
	bookingStart: Date;
	bookingEnd: Date;
	shortDescription: string;
}

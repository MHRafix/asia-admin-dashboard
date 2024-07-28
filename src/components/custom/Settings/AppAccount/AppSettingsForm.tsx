import { IAppSettings } from '@/app/api/models/appSettings.model';
import { Notify } from '@/app/config/alertNotification/Notification';
import {
	APP_SETTINGS_FORM_DEFAULT_VALUES,
	APP_SETTINGS_FORM_SCHEMA,
} from '@/app/config/form.validation/app-setting-form/appSetting.form';
import {
	APP_SETTINGS_QUERY,
	UPDATE_APP_SETTINGS,
} from '@/app/config/gql-queries/appSettings.query';
import { fileUploader } from '@/app/config/logic/fileUploader';
import { useMutation, useQuery } from '@apollo/client';
import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers/yup';
import {
	Accordion,
	ActionIcon,
	Button,
	Flex,
	Group,
	Input,
	Space,
	Text,
	Title,
} from '@mantine/core';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { FaPassport, FaPlus } from 'react-icons/fa';
import { FiUpload } from 'react-icons/fi';
import { GiPassport, GiTreeBranch } from 'react-icons/gi';
import { HiOutlinePhotograph } from 'react-icons/hi';
import { ImCross } from 'react-icons/im';

const AppSettingsForm: React.FC = () => {
	const [url, setUrl] = useState<string>('');
	const [uploading, setUploading] = useState<boolean>(false);

	const {
		data,
		loading: fetchingSettings,
		refetch,
	} = useQuery<{
		appSettings: { nodes: IAppSettings[] };
	}>(APP_SETTINGS_QUERY);

	// upload avatar
	const uploadLogo = async (file: File) => {
		setUploading(true);
		const { file_upload_cloudinary } = fileUploader(file, 'ASIA_LOGO');
		const url = await file_upload_cloudinary();
		if (url) {
			Notify({
				sucTitle: 'Logo uploaded successfully!',
				sucMessage: 'Update app details now.',
			});
		}
		setUrl(url);
		setUploading(false);
	};

	const {
		register,
		formState: { errors },
		setValue,
		getValues,
		handleSubmit,
		control,
		watch,
	} = useForm({
		defaultValues: APP_SETTINGS_FORM_DEFAULT_VALUES,
		resolver: yupResolver(APP_SETTINGS_FORM_SCHEMA),
		mode: 'onChange',
	});

	const {
		fields: branches__fields,
		append: append__branch,
		remove: remove__branch,
	} = useFieldArray({
		control,
		name: 'branches',
	});

	const {
		fields: visaCategories__fields,
		append: append__visaCategory,
		remove: remove__visaCategory,
	} = useFieldArray<any>({
		control,
		name: 'visaCategories',
	});

	const {
		fields: countriesVisa__fields,
		append: append__countriesVisa,
		remove: remove__countriesVisa,
	} = useFieldArray({
		control,
		name: 'countriesVisa',
	});

	useEffect(() => {
		setUrl(data?.appSettings?.nodes[0]?.logo!);
		setValue('visaCategories', data?.appSettings?.nodes[0]?.visaCategories!);
		setValue('countriesVisa', data?.appSettings?.nodes[0]?.countriesVisa!);
		setValue('branches', data?.appSettings?.nodes[0]?.branches!);
	}, [data?.appSettings?.nodes[0]]);

	const [updateAppSettings, { loading: updating }] = useMutation(
		UPDATE_APP_SETTINGS,
		Notify({
			sucTitle: 'App settings updated successfully!',
			errMessage: 'Failed to update app settings!',
			action: refetch,
		})
	);
	const onSubmit = (v: IAppSettings) => {
		// @ts-ignore
		delete v.branches[0]?.__typename;
		// @ts-ignore
		delete v.countriesVisa[0]?.__typename;
		// @ts-ignore
		delete v.visaCategories[0]?.__typename;

		updateAppSettings({
			variables: { ...v, logo: url, id: data?.appSettings?.nodes[0]?._id },
		});
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className='grid lg:grid-cols-2 gap-8'>
				<Accordion
					variant='separated'
					defaultValue={['openPhone', 'openBranches', 'openVisaCategory']}
					multiple
				>
					<Space h={'md'} />
					<Flex justify={'space-between'} align={'center'}>
						<div>
							<Button color='teal' size='md' type='submit' loading={updating}>
								Save
							</Button>
						</div>
						<ActionIcon
							size={'lg'}
							color='violet'
							onClick={() => append__visaCategory('')}
						>
							<FaPlus />
						</ActionIcon>
					</Flex>
					<Space h={'md'} />
					<Accordion.Item value='openVisaCategory'>
						<Accordion.Control
							bg='#1D1E2B'
							className='shadow-xl border-solid border-[1px] border-slate-700 py-1 rounded-t-md'
							ff={'Nunito sans, sans-serif'}
							fw={700}
							fz={20}
							icon={<GiPassport color='#20C997' size={25} />}
						>
							<Flex justify={'space-between'} align={'center'}>
								<div>Visa categories ({visaCategories__fields?.length})</div>
							</Flex>
						</Accordion.Control>
						<Accordion.Panel
							bg='#1D1E2B'
							className='shadow-xl border-solid border-[1px] border-slate-700 pt-5 rounded-md border-t-0'
						>
							{visaCategories__fields?.map((field, idx: number) => (
								<div key={idx}>
									<Input.Wrapper
										label={'Visa category'}
										error={
											<ErrorMessage
												errors={errors}
												name={`visaCategories.${idx}`}
											/>
										}
										size='md'
									>
										<Input
											placeholder='Tourist'
											variant='unstyled'
											size={'md'}
											className='!border-[1px] !border-[#32344b] border-solid px-2 rounded-md'
											value={watch(`visaCategories.${idx}`) as any}
											onChange={(v) =>
												setValue(
													`visaCategories.${idx}`,
													v.target.value! as any
												)
											}
										/>
									</Input.Wrapper>
									<Group position='right' mt={10}>
										<Button
											variant='light'
											size={'sm'}
											compact
											color='red'
											onClick={() => remove__visaCategory(idx)}
										>
											Remove
										</Button>
									</Group>
								</div>
							))}
						</Accordion.Panel>
					</Accordion.Item>
					<Space h={'md'} />
					<Flex justify={'space-between'} align={'center'}>
						<div></div>
						<ActionIcon
							size={'lg'}
							color='violet'
							onClick={() =>
								append__countriesVisa({
									country: '',
									visaCategory: '',
								})
							}
						>
							<FaPlus />
						</ActionIcon>
					</Flex>
					<Space h={'xs'} />
					<Accordion.Item value='openPhone'>
						<Accordion.Control
							bg='#1D1E2B'
							className='shadow-xl border-solid border-[1px] border-slate-700 py-1 rounded-t-md'
							ff={'Nunito sans, sans-serif'}
							fw={700}
							fz={20}
							icon={<FaPassport color='#20C997' size={25} />}
						>
							Visa of country ({countriesVisa__fields?.length})
						</Accordion.Control>
						<Accordion.Panel
							bg='#1D1E2B'
							className='shadow-xl border-solid border-[1px] border-slate-700 pt-5 rounded-md border-t-0'
						>
							{countriesVisa__fields?.map((field, idx: number) => (
								<div key={idx}>
									<Input.Wrapper
										label={'Country name'}
										size='md'
										error={
											<ErrorMessage
												errors={errors}
												name={`countriesVisa.${idx}.country`}
											/>
										}
									>
										<Input
											placeholder='Afghanistan'
											variant='unstyled'
											size={'md'}
											className='!border-[1px] !border-[#32344b] border-solid px-2 rounded-md'
											value={watch(`countriesVisa.${idx}.country`)}
											onChange={(v) =>
												setValue(
													`countriesVisa.${idx}.country`,
													v.target.value!
												)
											}
										/>
									</Input.Wrapper>
									<Space h={'md'} />
									<Input.Wrapper
										label={'Visa category'}
										size='md'
										error={
											<ErrorMessage
												errors={errors}
												name={`countriesVisa.${idx}.visaCategory`}
											/>
										}
									>
										<Input
											placeholder='Tourist'
											variant='unstyled'
											size={'md'}
											className='!border-[1px] !border-[#32344b] border-solid px-2 rounded-md'
											value={watch(`countriesVisa.${idx}.visaCategory`)}
											onChange={(v) =>
												setValue(
													`countriesVisa.${idx}.visaCategory`,
													v.target.value!
												)
											}
										/>
									</Input.Wrapper>
									<Group position='right' mt={10}>
										<Button
											variant='light'
											size={'sm'}
											compact
											color='red'
											onClick={() => remove__countriesVisa(idx)}
										>
											Remove
										</Button>
									</Group>
									<Space h={'md'} />
								</div>
							))}
						</Accordion.Panel>
					</Accordion.Item>
					<Space h={'md'} />
					<Flex justify={'space-between'} align={'center'}>
						<div></div>
						<ActionIcon
							size={'lg'}
							color='violet'
							onClick={() =>
								append__branch({
									branchName: '',
									email: '',
									phone: '',
									address: {
										name: '',
										lat: '',
										lng: '',
									},
								})
							}
						>
							<FaPlus />
						</ActionIcon>
					</Flex>
					<Space h={'xs'} />
					<Accordion.Item value='openBranches'>
						<Accordion.Control
							bg='#1D1E2B'
							className='shadow-xl border-solid border-[1px] border-slate-700 py-1 rounded-t-md'
							ff={'Nunito sans, sans-serif'}
							fw={700}
							fz={20}
							icon={<GiTreeBranch color='#20C997' size={25} />}
						>
							<Flex justify={'space-between'} align={'center'}>
								<div>Our branches ({branches__fields?.length})</div>
							</Flex>
						</Accordion.Control>
						<Accordion.Panel
							bg='#1D1E2B'
							className='shadow-xl border-solid border-[1px] border-slate-700 pt-5 rounded-md border-t-0'
						>
							{branches__fields?.map((field, idx: number) => (
								<div
									key={idx}
									className='shadow-2xl p-3 border border-solid border-slate-700 rounded-md my-5'
								>
									<Title order={3} ff={'Nunito sans, sans-serif'}>
										Branch details {idx + 1}
									</Title>
									<Space h={'xs'} />

									<Input.Wrapper
										label={'Branch name'}
										size='md'
										error={
											<ErrorMessage
												errors={errors}
												name={`branches.${idx}.branchName`}
											/>
										}
									>
										<Input
											placeholder='Dhaka office'
											variant='unstyled'
											size={'md'}
											className='!border-[1px] !border-[#32344b] border-solid px-2 rounded-md'
											value={watch(`branches.${idx}.branchName`)}
											onChange={(v) =>
												setValue(`branches.${idx}.branchName`, v.target.value!)
											}
										/>
									</Input.Wrapper>
									<Space h={'md'} />
									<Input.Wrapper
										label={'Email'}
										size='md'
										error={
											<ErrorMessage
												errors={errors}
												name={`branches.${idx}.email`}
											/>
										}
									>
										<Input
											placeholder='asia.adventures@gmail.com'
											variant='unstyled'
											size={'md'}
											className='!border-[1px] !border-[#32344b] border-solid px-2 rounded-md'
											value={watch(`branches.${idx}.email`)}
											onChange={(v) =>
												setValue(`branches.${idx}.email`, v.target.value!)
											}
										/>
									</Input.Wrapper>
									<Space h={'md'} />
									<Input.Wrapper
										label={'Phone number'}
										size='md'
										error={
											<ErrorMessage
												errors={errors}
												name={`branches.${idx}.phone`}
											/>
										}
									>
										<Input
											placeholder='+880 16118 59722'
											variant='unstyled'
											size={'md'}
											className='!border-[1px] !border-[#32344b] border-solid px-2 rounded-md'
											value={watch(`branches.${idx}.phone`)}
											onChange={(v) =>
												setValue(`branches.${idx}.phone`, v.target.value!)
											}
										/>
									</Input.Wrapper>
									<Space h={'md'} />
									<Input.Wrapper
										label={'Address'}
										size='md'
										error={
											<ErrorMessage
												errors={errors}
												name={`branches.${idx}.address`}
											/>
										}
									>
										<Input
											placeholder='Jamuna future park, Dhaka'
											variant='unstyled'
											size={'md'}
											className='!border-[1px] !border-[#32344b] border-solid px-2 rounded-md'
											value={watch(`branches.${idx}.address`) as any}
											onChange={(v) =>
												setValue(
													`branches.${idx}.address`,
													v.target.value! as any
												)
											}
										/>
									</Input.Wrapper>
									<Space h={'md'} />
									<Group position='right' mt={10}>
										<Button
											variant='light'
											size={'sm'}
											compact
											color='red'
											onClick={() => remove__branch(idx)}
										>
											Remove
										</Button>
									</Group>
								</div>
							))}
						</Accordion.Panel>
					</Accordion.Item>
				</Accordion>
				<div>
					{url && (
						<div className='text-center w-[350px]'>
							<Image
								src={url}
								alt='Pic'
								width={120}
								height={120}
								className='!w-[120px] !h-[120px] mx-auto p-1 rounded-sm shadow-md'
							/>
						</div>
					)}
					<Input.Wrapper label='Upload logo' size='md'>
						<Space h={8} />
						<Dropzone
							onDrop={(files) => uploadLogo(files[0])}
							onReject={(files) => {}}
							loading={uploading}
							w={350}
							// mx='auto'
							h={150}
							bg={'transparent'}
							maxSize={3 * 1024 ** 2}
							accept={IMAGE_MIME_TYPE}
							sx={{
								border: '1px dotted #5F3DC4',
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
							}}
						>
							<Group
								position='center'
								spacing='xl'
								style={{
									minHeight: 80,
									pointerEvents: 'none',
								}}
							>
								<Dropzone.Accept>
									<FiUpload size={50} color={'dark'} />
								</Dropzone.Accept>
								<Dropzone.Reject>
									<ImCross size={50} color={'dark'} />
								</Dropzone.Reject>
								<Dropzone.Idle>
									<HiOutlinePhotograph color='#5F3DC4' size={50} />
								</Dropzone.Idle>

								<div>
									<Text size='md' inline>
										Drag or select app logo
									</Text>
								</div>
							</Group>
						</Dropzone>
					</Input.Wrapper>
				</div>
			</div>
		</form>
	);
};

export default AppSettingsForm;

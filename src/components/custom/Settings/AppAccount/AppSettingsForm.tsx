import { Notify } from '@/app/config/alertNotification/Notification';
import { fileUploader } from '@/app/config/logic/fileUploader';
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
import React, { useState } from 'react';
import { FaPassport, FaPlus } from 'react-icons/fa';
import { FiUpload } from 'react-icons/fi';
import { GiPassport, GiTreeBranch } from 'react-icons/gi';
import { HiOutlinePhotograph } from 'react-icons/hi';
import { ImCross } from 'react-icons/im';

const AppSettingsForm: React.FC = () => {
	const [url, setUrl] = useState<string>('');
	const [uploading, setUploading] = useState<boolean>(false);

	// upload avatar
	const uploadAvatar = async (file: File) => {
		setUploading(true);
		const { file_upload_cloudinary } = fileUploader(file, 'APP_LOGO');
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

	return (
		<form>
			<div className='grid lg:grid-cols-2 gap-8'>
				<Accordion
					variant='separated'
					defaultValue={['openPhone', 'openBranches', 'openVisaCategory']}
					multiple
				>
					<Space h={'md'} />
					<Flex justify={'space-between'} align={'center'}>
						<div>
							<Button color='teal' size='md'>
								Save
							</Button>
						</div>
						<ActionIcon size={'lg'} color='violet'>
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
								<div>Visa categories</div>
							</Flex>
						</Accordion.Control>
						<Accordion.Panel
							bg='#1D1E2B'
							className='shadow-xl border-solid border-[1px] border-slate-700 pt-5 rounded-md border-t-0'
						>
							<div>
								<Input.Wrapper label={'Visa category'} size='md'>
									<Input
										placeholder='Tourist'
										variant='unstyled'
										size={'md'}
										className='!border-[1px] !border-[#32344b] border-solid px-2 rounded-md'
									/>
								</Input.Wrapper>
								<Group position='right' mt={10}>
									<Button variant='light' size={'sm'} compact color='red'>
										Remove
									</Button>
								</Group>
								<Space h={'md'} />
							</div>
						</Accordion.Panel>
					</Accordion.Item>
					<Space h={'md'} />
					<Flex justify={'space-between'} align={'center'}>
						<div></div>
						<ActionIcon size={'lg'} color='violet'>
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
							Visa of country
						</Accordion.Control>
						<Accordion.Panel
							bg='#1D1E2B'
							className='shadow-xl border-solid border-[1px] border-slate-700 pt-5 rounded-md border-t-0'
						>
							<div>
								<Input.Wrapper label={'Country name'} size='md'>
									<Input
										placeholder='Afghanistan'
										variant='unstyled'
										size={'md'}
										className='!border-[1px] !border-[#32344b] border-solid px-2 rounded-md'
									/>
								</Input.Wrapper>
								<Space h={'md'} />
								<Input.Wrapper label={'Visa category'} size='md'>
									<Input
										placeholder='Tourist'
										variant='unstyled'
										size={'md'}
										className='!border-[1px] !border-[#32344b] border-solid px-2 rounded-md'
									/>
								</Input.Wrapper>
								<Group position='right' mt={10}>
									<Button variant='light' size={'sm'} compact color='red'>
										Remove
									</Button>
								</Group>
								<Space h={'md'} />
							</div>
						</Accordion.Panel>
					</Accordion.Item>
					<Space h={'md'} />
					<Flex justify={'space-between'} align={'center'}>
						<div></div>
						<ActionIcon size={'lg'} color='violet'>
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
								<div>Our branches</div>
							</Flex>
						</Accordion.Control>
						<Accordion.Panel
							bg='#1D1E2B'
							className='shadow-xl border-solid border-[1px] border-slate-700 pt-5 rounded-md border-t-0'
						>
							<div className='shadow-2xl p-3 border border-solid border-slate-700 rounded-md'>
								<Title order={3} ff={'Nunito sans, sans-serif'}>
									Branch details 01
								</Title>
								<Space h={'xs'} />

								<Input.Wrapper label={'Branch name'} size='md'>
									<Input
										placeholder='Dhaka office'
										variant='unstyled'
										size={'md'}
										className='!border-[1px] !border-[#32344b] border-solid px-2 rounded-md'
									/>
								</Input.Wrapper>
								<Space h={'md'} />
								<Input.Wrapper label={'Email'} size='md'>
									<Input
										placeholder='asia.adventures@gmail.com'
										variant='unstyled'
										size={'md'}
										className='!border-[1px] !border-[#32344b] border-solid px-2 rounded-md'
									/>
								</Input.Wrapper>
								<Space h={'md'} />
								<Input.Wrapper label={'Phone number'} size='md'>
									<Input
										placeholder='+880 16118 59722'
										variant='unstyled'
										size={'md'}
										className='!border-[1px] !border-[#32344b] border-solid px-2 rounded-md'
									/>
								</Input.Wrapper>
								<Space h={'md'} />
								<Input.Wrapper label={'Address'} size='md'>
									<Input
										placeholder='Jamuna future park, Dhaka'
										variant='unstyled'
										size={'md'}
										className='!border-[1px] !border-[#32344b] border-solid px-2 rounded-md'
									/>
								</Input.Wrapper>
								<Space h={'md'} />
								<Group position='right' mt={10}>
									<Button variant='light' size={'sm'} compact color='red'>
										Remove
									</Button>
								</Group>
							</div>
						</Accordion.Panel>
					</Accordion.Item>
				</Accordion>
				<div>
					{url ? (
						<div className='text-center'>
							<Image
								src={url}
								alt='Pic'
								width={120}
								height={120}
								className='!w-[120px] !h-[120px] mx-auto p-1 rounded-full shadow-md'
							/>
						</div>
					) : (
						<Input.Wrapper label='Upload logo' size='md'>
							<Space h={8} />
							<Dropzone
								onDrop={(files) => uploadAvatar(files[0])}
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
					)}
				</div>
			</div>
		</form>
	);
};

export default AppSettingsForm;

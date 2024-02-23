import { MoneyReceipt } from '@/app/api/models/money-receipt.model';
import {
	Badge,
	Button,
	Checkbox,
	Flex,
	Group,
	Input,
	Paper,
	Space,
	Text,
} from '@mantine/core';
import {
	IconBuildingSkyscraper,
	IconBus,
	IconDeviceLandlinePhone,
	IconDownload,
	IconHeartRateMonitor,
	IconLayoutGrid,
	IconLayoutGridAdd,
	IconMail,
	IconPhone,
	IconPlaneDeparture,
	IconSchool,
	IconTimelineEvent,
} from '@tabler/icons-react';
import { format } from 'date-fns';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import ReactToPrint from 'react-to-print';

const MoneyReceiptDemo: React.FC<{ receipt: MoneyReceipt }> = ({ receipt }) => {
	const [service, setService] = useState(receipt?.service?.title);

	useEffect(() => {
		setService(receipt?.service?.title);
	}, [receipt]);

	const componentRef = useRef(null);

	const reactToPrintContent = React.useCallback(() => {
		return componentRef.current;
	}, [componentRef.current]);

	const reactToPrintTrigger = React.useCallback(() => {
		return (
			<Button color='teal' leftIcon={<IconDownload />}>
				Print or Save PDF
			</Button>
		);
	}, []);

	return (
		<Paper shadow='md' mr={'lg'} p={'lg'} withBorder>
			<Group position='right'>
				<ReactToPrint
					content={reactToPrintContent}
					documentTitle={'Money_Receipt'}
					// onAfterPrint={handleAfterPrint}
					removeAfterPrint
					trigger={reactToPrintTrigger}
				/>
			</Group>

			<Space h={'md'} />

			<div ref={componentRef} className='!p-10'>
				<div className='grid grid-cols-2 gap-3'>
					<div className='text-left'>
						<Image
							src={
								'https://res.cloudinary.com/coderxone/image/upload/v1702964901/BLOG_THUMBNAIL_AND_BANNER/o8rvkakgzplknmxixx5e.jpg'
							}
							alt='logo'
							width={200}
							height={80}
							className='rounded-lg'
						/>
						<Text fz={28} fw={800} mt={5} mb={-5} ff={'Nunito, sans-serif'}>
							Asia Adventure LTD
						</Text>
						<Text fz={15} fw={500} ff={'Nunito, sans-serif'}>
							A concern of Asia Adventure LTD
						</Text>
					</div>
					<div className='grid gap-1 text-right ml-auto'>
						<Flex align={'center'} gap={5}>
							<IconDeviceLandlinePhone />
							<Text ff={'Nunito, sans-serif'}>
								+88 <span className='font-semibold'>01838335522</span>
							</Text>
						</Flex>
						<Flex align={'center'} gap={5}>
							<IconDeviceLandlinePhone />
							<Text ff={'Nunito, sans-serif'}>
								+88 <span className='font-semibold'>01838335522</span>
							</Text>
						</Flex>
						<Flex align={'center'} gap={5}>
							<IconPhone />
							<Text ff={'Nunito, sans-serif'}>
								+88 <span className='font-semibold'>01838335522</span>
							</Text>
						</Flex>
						<Flex align={'center'} gap={5}>
							<IconPhone />
							<Text ff={'Nunito, sans-serif'}>
								+88 <span className='font-semibold'>01838335522</span>
							</Text>
						</Flex>

						<Flex align={'center'} gap={5}>
							<IconMail />
							<Text ff={'Nunito, sans-serif'}>
								<span className='font-semibold'>asiatours2018@gmail.com</span>
							</Text>
						</Flex>
						<Flex align={'center'} gap={5}>
							<IconMail />
							<Text ff={'Nunito, sans-serif'}>
								<span className='font-semibold'>asiatours.ctg@gmail.com</span>
							</Text>
						</Flex>
					</div>
				</div>

				<Space h={20} />

				<div className='grid grid-cols-3 gap-3'>
					<div>
						<Text color='red' ff={'Nunito, sans-serif'}>
							MR NO: #{receipt?.mrNo}
						</Text>
					</div>
					<div className='text-center'>
						<Badge
							radius={3}
							variant='filled'
							size='xl'
							color='red'
							ff={'Nunito, sans-serif'}
						>
							Money Receipt
						</Badge>
					</div>
					<div className='text-right ml-auto -mt-1'>
						<Flex gap={15} mb={5}>
							<Text fw={500} ff={'Nunito, sans-serif'}>
								Issue Date:{' '}
							</Text>
							<Text ff={'Nunito, sans-serif'}>
								{format(
									receipt?.issueDate
										? new Date(receipt?.issueDate)
										: new Date(),
									'yyyy-MM-dd'
								)}
							</Text>
						</Flex>
						<Flex gap={15} mb={5}>
							<Text fw={500} ff={'Nunito, sans-serif'}>
								Delivery Date:{' '}
							</Text>
							<Text ff={'Nunito, sans-serif'}>
								{format(
									receipt?.deliveryDate
										? new Date(receipt?.deliveryDate)
										: new Date(),
									'yyyy-MM-dd'
								)}
							</Text>
						</Flex>
					</div>
				</div>

				<Space h={10} />

				<div className='flex gap-5'>
					<div className='lg:w-4/12 grid gap-1'>
						<Checkbox
							checked={service === 'Air Ticket'}
							color='red'
							value={'Air Ticket'}
							label={
								<Flex gap={8} fw={700} align={'center'} color='red'>
									<IconPlaneDeparture size={25} color='red' />
									<Text ff={'Nunito, sans-serif'} fz={'md'} color={'white'}>
										Air Ticket
									</Text>
								</Flex>
							}
						/>
						<Checkbox
							checked={service === 'Visa Processing'}
							color='red'
							value={'Visa Processing'}
							label={
								<Flex gap={8} fw={700} align={'center'} color='red'>
									<IconTimelineEvent size={25} color='red' />
									<Text ff={'Nunito, sans-serif'} fz={'md'} color={'white'}>
										Visa Processing
									</Text>
								</Flex>
							}
						/>
						<Checkbox
							checked={service === 'Student Consultancy'}
							color='red'
							value={'Student Consultancy'}
							label={
								<Flex gap={8} fw={700} align={'center'} color='red'>
									<IconSchool size={25} color='red' />
									<Text ff={'Nunito, sans-serif'} fz={'md'} color={'white'}>
										Student Consultancy
									</Text>
								</Flex>
							}
						/>
						<Checkbox
							checked={service === 'Medical Tourism'}
							color='red'
							value={'Medical Tourism'}
							label={
								<Flex gap={8} fw={700} align={'center'} color='red'>
									<IconHeartRateMonitor size={25} color='red' />
									<Text ff={'Nunito, sans-serif'} fz={'md'} color={'white'}>
										Medical Tourism
									</Text>
								</Flex>
							}
						/>
						<Checkbox
							checked={service === 'Hotel Booking'}
							color='red'
							value={'Hotel Booking'}
							label={
								<Flex gap={8} fw={700} align={'center'} color='red'>
									<IconBuildingSkyscraper size={25} color='red' />
									<Text ff={'Nunito, sans-serif'} fz={'md'} color={'white'}>
										Hotel Booking
									</Text>
								</Flex>
							}
						/>{' '}
						<Checkbox
							checked={service === 'Transport Service'}
							color='red'
							value={'Transport Service'}
							label={
								<Flex gap={8} fw={700} align={'center'} color='red'>
									<IconBus size={25} color='red' />
									<Text ff={'Nunito, sans-serif'} fz={'md'} color={'white'}>
										Transport Service
									</Text>
								</Flex>
							}
						/>
						<Checkbox
							checked={service === 'Tour Package'}
							color='red'
							value={'Tour Package'}
							label={
								<Flex gap={8} fw={700} align={'center'} color='red'>
									<IconLayoutGrid size={25} color='red' />
									<Text ff={'Nunito, sans-serif'} fz={'md'} color={'white'}>
										Tour Package
									</Text>
								</Flex>
							}
						/>
						<Checkbox
							checked={service === 'Hazz & Omra Package'}
							color='red'
							value={'Hazz & Omra Package'}
							label={
								<Flex gap={8} fw={700} align={'center'} color='red'>
									<IconLayoutGridAdd size={25} color='red' />
									<Text ff={'Nunito, sans-serif'} fz={'md'} color={'white'}>
										Hazz & Omra Package
									</Text>
								</Flex>
							}
						/>
					</div>
					<div className='lg:w-8/12 grid gap-1'>
						<div className='flex gap-3 items-end'>
							<label htmlFor='label' className='w-[115px]'>
								Client name
							</label>
							<Input
								size='sm'
								variant='unstyled'
								className='w-full border-b-[2px] border-0 border-dotted border-b-slate-200'
								value={receipt?.clientName}
								readOnly
							/>
						</div>

						<div className='flex gap-3 items-end'>
							<label htmlFor='label' className='w-[115px]'>
								Address
							</label>
							<Input
								size='sm'
								variant='unstyled'
								className='w-full border-b-[2px] border-0 border-dotted border-b-slate-200'
								value={receipt?.address}
								readOnly
							/>
						</div>

						<div className='flex gap-3 items-end'>
							<label htmlFor='label' className='w-[115px]'>
								Contact No
							</label>
							<Input
								size='sm'
								variant='unstyled'
								className='w-full border-b-[2px] border-0 border-dotted border-b-slate-200'
								value={receipt?.contactNumber}
								readOnly
							/>
						</div>
						<div className='flex gap-3 items-end'>
							<label htmlFor='label' className='w-[150px]'>
								Taka In Number
							</label>
							<Input
								size='sm'
								variant='unstyled'
								className='w-full border-b-[2px] border-0 border-dotted border-b-slate-200'
								value={receipt?.amountInNumber}
								readOnly
							/>
						</div>
						<div className='flex gap-3 items-end'>
							<label htmlFor='label' className='w-[150px]'>
								Taka In Words
							</label>
							<Input
								size='sm'
								variant='unstyled'
								className='w-full border-b-[2px] border-0 border-dotted border-b-slate-200'
								value={receipt?.amountInWords}
								readOnly
							/>
						</div>
					</div>
				</div>
			</div>
		</Paper>
	);
};

export default MoneyReceiptDemo;

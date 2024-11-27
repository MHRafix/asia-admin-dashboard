import { Task } from '@/app/config/gql-types';
import { getTaskBadgeColors } from '@/app/config/logic/getColors';
import { RestTimeCalculator } from '@/utils/dayjsTimer/restTime.calculator';
import {
	ActionIcon,
	Avatar,
	Badge,
	Flex,
	Group,
	Paper,
	Space,
	Text,
	Title,
} from '@mantine/core';
import { IconEdit, IconExternalLink } from '@tabler/icons-react';
import { format } from 'date-fns';
import React from 'react';

interface ITaskDetailsContent {
	__taskDetails: Task;
	onEditTask: () => void;
}

const TaskDetailsContent: React.FC<ITaskDetailsContent> = ({
	__taskDetails,
	onEditTask,
}) => {
	// task remaining time
	const { remainingTime } = RestTimeCalculator(__taskDetails?.deadLine);

	return (
		<div>
			<Group position='apart'>
				<Text ff={'Nunito, sans-serif'} fz={20} fw={500} color='blue'>
					{__taskDetails?.taskId}
				</Text>
				<ActionIcon color='violet' size={'xl'} onClick={() => onEditTask()}>
					<IconEdit size={30} />
				</ActionIcon>
			</Group>
			<Title ff={'Nunito, sans-serif'} order={2} fw={700}>
				{__taskDetails?.taskDetails?.taskName || 'N/A'}
			</Title>
			<Space h={'md'} />
			<Text ff={'Nunito, sans-serif'} fz={18}>
				Net Total: {`${__taskDetails?.totalBillAmount}`} BDT
			</Text>
			<Text ff={'Nunito, sans-serif'} fz={18} color='yellow'>
				Due: {`${__taskDetails?.dueAmount}`} BDT
			</Text>
			<Text ff={'Nunito, sans-serif'} color='red' fz={18}>
				Deadline: {format(new Date(__taskDetails?.deadLine), 'PPPPp')}
			</Text>
			<Space h={'sm'} />
			<Group>
				<Badge
					className='cursor-pointer'
					radius={5}
					size='lg'
					py={18}
					px={20}
					variant='dot'
					color={getTaskBadgeColors(__taskDetails?.progressStatus)}
				>
					{__taskDetails?.progressStatus}
				</Badge>{' '}
				{new Date() < new Date(__taskDetails?.deadLine) ? (
					<div className='rest_time_wrapper'>
						<div className='time_title'>
							<div className='font-semibold text-[18px] text-white'>
								{remainingTime.days}
							</div>
							<div className='font-medium text-[12px] text-white uppercase'>
								dys
							</div>
						</div>
						<div className='timer_devider'>:</div>
						<div className='time_title'>
							<div className='font-semibold text-[18px] text-white'>
								{remainingTime.hours}
							</div>
							<div className='font-medium text-[12px] text-white uppercase'>
								hrs
							</div>
						</div>
						<div className='timer_devider'>:</div>
						<div className='time_title'>
							<div className='font-semibold text-[18px] text-white'>
								{remainingTime.minutes}
							</div>
							<div className='font-medium text-[12px] text-white uppercase'>
								min
							</div>
						</div>
						<div className='timer_devider'>:</div>
						<div className='time_title'>
							<div className='font-semibold text-[18px] text-white'>
								{remainingTime.seconds}
							</div>
							<div className='font-medium text-[12px] text-white uppercase'>
								sec
							</div>
						</div>
					</div>
				) : (
					<Badge
						radius={5}
						size='lg'
						w={200}
						py={18}
						px={20}
						color='red'
						variant='filled'
						className='flex items-center'
					>
						Expired
					</Badge>
				)}
			</Group>
			<Space h={40} />
			<Paper shadow='md' radius={0} withBorder>
				<Title bg={'violet'} p={15} order={4} ff={'Nunito, sans-serif'}>
					Task description
				</Title>

				<div className='p-[15px]'>
					<Text ff={'Nunito, sans-serif'}>
						{__taskDetails?.taskDetails?.taskDescription || 'N/A'}
					</Text>
				</div>
			</Paper>{' '}
			<Space h={40} />
			<Paper shadow='md' radius={0} withBorder>
				<Title bg={'red'} p={15} order={4} ff={'Nunito, sans-serif'}>
					Task issues
				</Title>

				<div className='p-[15px]'>
					<Text ff={'Nunito, sans-serif'}>
						{__taskDetails?.taskDetails?.issuesDescription || 'N/A'}
					</Text>
				</div>
			</Paper>{' '}
			<Space h={40} />
			<Title order={4} ff={'Nunito, sans-serif'}>
				Documents
			</Title>
			{__taskDetails?.files?.[0]?.fileUrl ? (
				<>
					{__taskDetails?.files?.map((file, idx: number) => (
						<div>
							<Space h={'md'} />
							<Paper
								p={10}
								radius={10}
								withBorder
								className='flex justify-between items-center'
							>
								<Text>
									{idx + 1}. {file?.fileUrl.split('upload/')[1].slice(0, 100)}
								</Text>
								<ActionIcon
									onClick={() => window.open(file?.fileUrl)}
									size={'sm'}
									variant='filled'
									color='teal'
								>
									<IconExternalLink size={16} />
								</ActionIcon>
							</Paper>
						</div>
					))}
				</>
			) : null}
			<Space h={40} />
			<Title order={4}>Clients, Employee and Payment</Title>
			<Space h={10} />
			{/* summaries */}
			<div className='grid lg:grid-cols-3 gap-3'>
				{__taskDetails?.client && (
					<Paper p={10} radius={0} className='relative' withBorder>
						<Text fw={700} fz={18}>
							Client
						</Text>
						<Space h={'sm'} />

						<Flex justify={'start'} gap={15} align={'center'}>
							<Avatar color='teal' radius={100} size={'lg'}>
								{__taskDetails?.client?.name?.slice(0, 1) ||
									__taskDetails?.client?.email?.slice(0, 1)}
							</Avatar>

							<div>
								<Text fw={500}>{__taskDetails?.client?.name || 'N/A'}</Text>
								<Text size={'sm'} color='dimmed'>
									{__taskDetails?.client?.phone || 'N/A'}
								</Text>
							</div>
						</Flex>
					</Paper>
				)}
				{__taskDetails?.taskDetails?.taskAssignTo?._id && (
					<Paper p={10} radius={0} className='!relative' withBorder>
						<Text fw={700} fz={18}>
							Assign to
						</Text>

						<Space h={'sm'} />

						<Flex justify={'start'} gap={15} align={'center'}>
							<Avatar
								src={__taskDetails?.taskDetails?.taskAssignTo?.avatar}
								color='teal'
								radius={100}
								size={'lg'}
							>
								{__taskDetails?.taskDetails?.taskAssignTo?.name?.slice(0, 1) ||
									__taskDetails?.taskDetails?.taskAssignTo?.email?.slice(0, 1)}
							</Avatar>
							<div>
								<Text fw={500}>
									{__taskDetails?.taskDetails?.taskAssignTo?.name || 'N/A'}
								</Text>
								<Text size={'sm'} color='dimmed'>
									{__taskDetails?.taskDetails?.taskAssignTo?.phone ||
										__taskDetails?.taskDetails?.taskAssignTo?.email ||
										'N/A'}
								</Text>
							</div>
						</Flex>
					</Paper>
				)}

				{__taskDetails?.totalBillAmount ? (
					<Paper p={10} radius={0} withBorder>
						<Text fw={700} fz={18}>
							Payment
						</Text>
						<Space h={'sm'} />
						<Text color='blue'>
							Payable: {__taskDetails?.totalBillAmount ?? 0} BDT
						</Text>
						<Text color='teal'>
							Paid: {__taskDetails?.paidBillAmount ?? 0} BDT
						</Text>
						<Text color='yellow'>
							Due:{' '}
							{__taskDetails?.totalBillAmount - __taskDetails?.paidBillAmount}{' '}
							BDT
						</Text>
					</Paper>
				) : null}
			</div>
		</div>
	);
};

export default TaskDetailsContent;

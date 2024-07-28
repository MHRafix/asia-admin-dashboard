import { Update_Task_Mutation } from '@/app/config/gql-queries/task-management.query';
import { Task, Task_Progress_Status } from '@/app/config/gql-types';
import { getTaskBadgeColors } from '@/app/config/logic/getColors';
import { RestTimeCalculator } from '@/utils/dayjsTimer/restTime.calculator';
import { useMutation } from '@apollo/client';
import {
	Avatar,
	Badge,
	Button,
	Flex,
	Group,
	LoadingOverlay,
	Menu,
	Paper,
	Space,
	Text,
	Tooltip,
} from '@mantine/core';
import { format } from 'date-fns';
import { useState } from 'react';

interface ITaskCardProps {
	__task: Task;
	color: string;
	onRefetch: () => void;
}
const TaskCard: React.FC<ITaskCardProps> = ({ __task, onRefetch, color }) => {
	// updating and refetching loading state
	const [isRefetching, setRefetching] = useState<boolean>(false);

	// update task mutation
	const [updateTask, { loading: __updatingTask }] = useMutation(
		Update_Task_Mutation,
		{
			onCompleted: async () => {
				setRefetching(true);
				await onRefetch();
				setRefetching(false);
			},
		}
	);

	// task remaining time
	const { remainingTime } = RestTimeCalculator(__task?.deadLine);

	return (
		<Paper
			p={10}
			mb={8}
			withBorder
			className='relative cursor-pointer hover:!bg-[#1D1E2B] hover:!duration-300'
		>
			<LoadingOverlay
				visible={__updatingTask || isRefetching}
				overlayBlur={2}
				opacity={0.8}
				bg={color}
			/>
			<Text fz={18} fw={500} color='blue'>
				#{__task?.taskId}
			</Text>

			<Text fz={18} fw={500}>
				{__task?.taskDetails?.taskName}
			</Text>

			<Space h={'md'} />

			<Text fz={16}>Net Total: {`${__task?.totalBillAmount}`} BDT</Text>
			<Text fz={16} color='yellow'>
				Due: {`${__task?.dueAmount}`} BDT
			</Text>

			<Text color='red' fz={16}>
				Deadline: {format(new Date(__task?.deadLine), 'PPPPp')}
			</Text>
			<Space h={'md'} />
			<Flex justify={'space-between'} align={'center'}>
				<Group>
					<Menu>
						<Menu.Target>
							<Badge
								className='cursor-pointer'
								radius={5}
								size='lg'
								py={18}
								px={20}
								variant='dot'
								color={getTaskBadgeColors(__task?.progressStatus)}
							>
								{__task?.progressStatus}
							</Badge>
						</Menu.Target>

						<Menu.Dropdown>
							<Menu.Item
								color={getTaskBadgeColors(Task_Progress_Status.PENDING)}
								onClick={() =>
									updateTask({
										variables: {
											input: {
												_id: __task?._id,
												progressStatus: Task_Progress_Status.PENDING,
											},
										},
									})
								}
							>
								PENDING
							</Menu.Item>
							<Menu.Item
								color={getTaskBadgeColors(Task_Progress_Status.IN_PROGRESS)}
								onClick={() =>
									updateTask({
										variables: {
											input: {
												_id: __task?._id,
												progressStatus: Task_Progress_Status.IN_PROGRESS,
											},
										},
									})
								}
							>
								IN-PROGRESS
							</Menu.Item>
							<Menu.Item
								color={getTaskBadgeColors(Task_Progress_Status.WORK_DONE)}
								onClick={() =>
									updateTask({
										variables: {
											input: {
												_id: __task?._id,
												progressStatus: Task_Progress_Status.WORK_DONE,
											},
										},
									})
								}
							>
								DONE
							</Menu.Item>
							<Menu.Item
								color={getTaskBadgeColors(Task_Progress_Status.REVISION)}
								onClick={() =>
									updateTask({
										variables: {
											input: {
												_id: __task?._id,
												progressStatus: Task_Progress_Status.REVISION,
											},
										},
									})
								}
							>
								REVISION
							</Menu.Item>
							<Menu.Item
								color={getTaskBadgeColors(Task_Progress_Status.COMPLETED)}
								onClick={() =>
									updateTask({
										variables: {
											input: {
												_id: __task?._id,
												progressStatus: Task_Progress_Status.COMPLETED,
											},
										},
									})
								}
							>
								COMPLETED
							</Menu.Item>
							<Menu.Item
								color={getTaskBadgeColors(Task_Progress_Status.CANCELLED)}
								onClick={() =>
									updateTask({
										variables: {
											input: {
												_id: __task?._id,
												progressStatus: Task_Progress_Status.CANCELLED,
											},
										},
									})
								}
							>
								CANCELLED
							</Menu.Item>
						</Menu.Dropdown>
					</Menu>

					{new Date() < new Date(__task?.deadLine) ? (
						<>
							{__task?.progressStatus !== Task_Progress_Status.COMPLETED &&
							__task?.progressStatus !== Task_Progress_Status.CANCELLED ? (
								<div className='rest_time_wrapper'>
									<div className='time_title'>
										<div className='font-semibold text-md text-white'>
											{remainingTime.days}
										</div>
										<div className='font-medium text-[10px] text-white uppercase'>
											dys
										</div>
									</div>
									<div className='timer_devider'>:</div>
									<div className='time_title'>
										<div className='font-semibold text-md text-white'>
											{remainingTime.hours}
										</div>
										<div className='font-medium text-[10px] text-white uppercase'>
											hrs
										</div>
									</div>
									<div className='timer_devider'>:</div>
									<div className='time_title'>
										<div className='font-semibold text-md text-white'>
											{remainingTime.minutes}
										</div>
										<div className='font-medium text-[10px] text-white uppercase'>
											min
										</div>
									</div>
									<div className='timer_devider'>:</div>
									<div className='time_title'>
										<div className='font-semibold text-md text-white'>
											{remainingTime.seconds}
										</div>
										<div className='font-medium text-[10px] text-white uppercase'>
											sec
										</div>
									</div>
								</div>
							) : (
								<Button
									color={'gray'}
									radius={5}
									variant='outline'
									loading={__updatingTask}
									onClick={() =>
										updateTask({
											variables: {
												input: {
													_id: __task?._id,
													progressStatus: Task_Progress_Status.ARCHIVED,
												},
											},
										})
									}
								>
									Drop to Archived
								</Button>
							)}
						</>
					) : (
						<Badge
							radius={5}
							size='lg'
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

				<Group>
					<Tooltip withArrow label={__task?.taskDetails?.taskAssignTo?.name}>
						<Avatar
							color='blue'
							size={'md'}
							radius={100}
							src={__task?.taskDetails?.taskAssignTo?.avatar}
						>
							{__task?.taskDetails?.taskAssignTo?.name
								?.slice(0, 1)
								.toUpperCase()}
						</Avatar>
					</Tooltip>
				</Group>
			</Flex>
		</Paper>
	);
};

export default TaskCard;

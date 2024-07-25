import { Task, Task_Progress_Status } from '@/app/config/gql';
import { getTaskBadgeColors } from '@/app/config/logic/getColors';
import { Update_Task_Mutation } from '@/app/config/queries/task-management.query';
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
	_task: Task;
	color: string;
	onRefetch: () => void;
}
const TaskCard: React.FC<ITaskCardProps> = ({ _task, onRefetch, color }) => {
	const [isRefetching, setRefetching] = useState<boolean>(false);

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

	return (
		<Paper p={10} mb={8} withBorder className='relative'>
			<LoadingOverlay
				visible={__updatingTask || isRefetching}
				overlayBlur={2}
				opacity={0.8}
				bg={color}
			/>
			<Text fz={18} fw={500} color='blue'>
				#{_task?.taskId}
			</Text>

			<Text fz={18} fw={500}>
				{_task?.taskDetails?.taskName}
			</Text>
			<Text color='red' fz={16}>
				Deadline: {format(new Date(_task?.createdAt), 'PPPPp')}
			</Text>
			<Space h={'md'} />
			<Flex justify={'space-between'} align={'center'}>
				<Tooltip label={_task?.taskDetails?.taskAssignTo?.name}>
					<Avatar
						color='blue'
						size={'md'}
						radius={100}
						src={_task?.taskDetails?.taskAssignTo?.avatar}
					>
						{_task?.taskDetails?.taskAssignTo?.name?.slice(0, 1).toUpperCase()}
					</Avatar>
				</Tooltip>

				<Group>
					<Button color={color} radius={5} variant='outline'>
						View
					</Button>
					<Menu>
						<Menu.Target>
							<Badge
								className='cursor-pointer'
								radius={5}
								size='lg'
								py={18}
								px={20}
								variant='dot'
								color={getTaskBadgeColors(_task?.progressStatus)}
							>
								{_task?.progressStatus}
							</Badge>
						</Menu.Target>

						<Menu.Dropdown>
							<Menu.Item
								color={getTaskBadgeColors(Task_Progress_Status.PENDING)}
								onClick={() =>
									updateTask({
										variables: {
											input: {
												_id: _task?._id,
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
												_id: _task?._id,
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
												_id: _task?._id,
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
												_id: _task?._id,
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
												_id: _task?._id,
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
												_id: _task?._id,
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
				</Group>
			</Flex>
		</Paper>
	);
};

export default TaskCard;

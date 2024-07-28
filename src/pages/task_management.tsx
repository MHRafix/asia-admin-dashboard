import { useGetTasksByStatus } from '@/app/api/gql-api-hooks/task-management.api';
import { IUser } from '@/app/api/models/users.model';
import protectWithSession from '@/app/config/authProtection/protectWithSession';
import { Task } from '@/app/config/gql';
import { useGetSession } from '@/app/config/logic/getSession';
import PageTitleArea from '@/components/common/PageTitleArea';
import TaskCard from '@/components/custom/TaskManagement/TaskCard';
import TaskForm from '@/components/custom/TaskManagement/TaskForm';
import AdminLayout from '@/components/layouts/AdminLayout';
import {
	Box,
	Button,
	Drawer,
	Paper,
	Skeleton,
	Space,
	Title,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus } from '@tabler/icons-react';

const TaskManagement = () => {
	// user session
	const { user } = useGetSession();

	// drawer handler
	const [taskFormOpened, taskCreateDrawerHandler] = useDisclosure();

	// get task query
	const { taskByStatus, __LoadingTask, __refetchTaskList } =
		useGetTasksByStatus(user as IUser);

	return (
		<AdminLayout title='Task Management'>
			<PageTitleArea
				title='Task Management'
				tagline='Track your organization growth'
				currentPathName='Task Management'
				othersPath={[
					{
						pathName: 'Home',
						href: '/',
					},
				]}
				actionComponent={
					<div>
						{user?.role === 'ADMIN' && (
							<Button
								onClick={taskCreateDrawerHandler.toggle}
								leftIcon={<IconPlus />}
								variant='light'
								color='violet'
							>
								Add New
							</Button>
						)}
						<Space h={'sm'} />
					</div>
				}
			/>
			<div className='grid lg:grid-cols-3 gap-x-5 gap-y-10'>
				<Paper withBorder>
					<Title className='rounded-sm' p={15} order={4} fw={500} bg='blue'>
						Pending ({taskByStatus?.pendingTasks?.length ?? 0})
					</Title>

					<Space h={'md'} />

					<Box p={15} className='task_status_area'>
						{taskByStatus?.pendingTasks?.map((__task, idx) => (
							<TaskCard
								key={idx}
								__task={__task}
								onRefetch={__refetchTaskList}
								color='blue'
							/>
						))}
						{__LoadingTask && (
							<>
								{new Array(10).fill(10).map((_, idx) => (
									<Skeleton key={idx} h={110} my={5} radius={5} />
								))}
							</>
						)}
					</Box>
				</Paper>
				<Paper withBorder>
					<Title className='rounded-sm' p={15} order={4} fw={500} bg='violet'>
						In-Progress ({taskByStatus?.inProgressTask?.length ?? 0})
					</Title>
					<Space h={'md'} />

					<Box p={15} className='task_status_area'>
						{taskByStatus?.inProgressTask?.map((__task: Task, idx: number) => (
							<TaskCard
								key={idx}
								__task={__task}
								onRefetch={__refetchTaskList}
								color='violet'
							/>
						))}
						{__LoadingTask && (
							<>
								{new Array(10).fill(10).map((_, idx) => (
									<Skeleton key={idx} h={110} my={5} radius={5} />
								))}
							</>
						)}
					</Box>
				</Paper>
				<Paper withBorder>
					<Title className='rounded-sm' p={15} order={4} fw={500} bg='yellow'>
						Done ({taskByStatus?.doneTask?.length ?? 0})
					</Title>
					<Space h={'md'} />

					<Box p={15} className='task_status_area'>
						{taskByStatus?.doneTask?.map((__task, idx) => (
							<TaskCard
								key={idx}
								__task={__task}
								onRefetch={__refetchTaskList}
								color='yellow'
							/>
						))}
						{__LoadingTask && (
							<>
								{new Array(10).fill(10).map((_, idx) => (
									<Skeleton key={idx} h={110} my={5} radius={5} />
								))}
							</>
						)}
					</Box>
				</Paper>
				<Paper withBorder>
					<Title className='rounded-sm' p={15} order={4} fw={500} bg='orange'>
						Revision ({taskByStatus?.revisionTask?.length ?? 0})
					</Title>
					<Space h={'md'} />

					<Box p={15} className='task_status_area'>
						{taskByStatus?.revisionTask?.map((__task, idx) => (
							<TaskCard
								key={idx}
								__task={__task}
								onRefetch={__refetchTaskList}
								color='orange'
							/>
						))}
						{__LoadingTask && (
							<>
								{new Array(10).fill(10).map((_, idx) => (
									<Skeleton key={idx} h={110} my={5} radius={5} />
								))}
							</>
						)}
					</Box>
				</Paper>
				<Paper withBorder>
					<Title className='rounded-sm' p={15} order={4} fw={500} bg='teal'>
						Completed ({taskByStatus?.completedTask?.length ?? 0})
					</Title>
					<Space h={'md'} />

					<Box p={15} className='task_status_area'>
						{taskByStatus?.completedTask?.map((__task, idx) => (
							<TaskCard
								key={idx}
								__task={__task}
								onRefetch={__refetchTaskList}
								color='teal'
							/>
						))}
						{__LoadingTask && (
							<>
								{new Array(10).fill(10).map((_, idx) => (
									<Skeleton key={idx} h={110} my={5} radius={5} />
								))}
							</>
						)}
					</Box>
				</Paper>
				<Paper withBorder>
					<Title className='rounded-sm' p={15} order={4} fw={500} bg='red'>
						Cancelled ({taskByStatus?.cancelledTask?.length ?? 0})
					</Title>
					<Space h={'md'} />

					<Box p={15} className='task_status_area'>
						{taskByStatus?.cancelledTask?.map((__task, idx) => (
							<TaskCard
								key={idx}
								__task={__task}
								onRefetch={__refetchTaskList}
								color='red'
							/>
						))}
						{__LoadingTask && (
							<>
								{new Array(10).fill(10).map((_, idx) => (
									<Skeleton key={idx} h={110} my={5} radius={5} />
								))}
							</>
						)}
					</Box>
				</Paper>
			</div>

			<Drawer
				opened={taskFormOpened}
				onClose={taskCreateDrawerHandler.close}
				position='right'
				size='xl'
				title='Task Form'
			>
				<TaskForm
					onRefetch={__refetchTaskList}
					onCloseDrawer={taskCreateDrawerHandler.close}
				/>
			</Drawer>
		</AdminLayout>
	);
};

export default protectWithSession(TaskManagement);

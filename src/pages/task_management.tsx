import { Get_Task_List_Query } from '@/app/config/queries/task-management.query';
import PageTitleArea from '@/components/common/PageTitleArea';
import TaskCard from '@/components/custom/TaskManagement/TaskCard';
import AdminLayout from '@/components/layouts/AdminLayout';
import { useQuery } from '@apollo/client';
import {
	Box,
	Button,
	LoadingOverlay,
	Paper,
	Space,
	Title,
} from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';

const TaskManagement = () => {
	const {
		data: taskList,
		loading: __LoadingTask,
		refetch: __refetchTaskList,
	} = useQuery<{
		taskList: any;
	}>(Get_Task_List_Query);

	console.log({ taskList });

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
						<Button leftIcon={<IconPlus />} variant='light' color='violet'>
							Add New
						</Button>
						<Space h={'sm'} />
					</div>
				}
			/>

			<div className='grid grid-cols-3 gap-x-5 gap-y-10'>
				<LoadingOverlay overlayBlur={2} opacity={0.5} visible={__LoadingTask} />

				<Paper withBorder>
					<Title className='rounded-sm' p={15} order={4} fw={500} bg='blue'>
						Pending (12)
					</Title>

					<Space h={'md'} />

					<Box p={15} className='task_status_area'>
						{new Array(10).fill(10).map((_, idx) => (
							<TaskCard key={idx} />
						))}
					</Box>
				</Paper>
				<Paper withBorder>
					<Title className='rounded-sm' p={15} order={4} fw={500} bg='violet'>
						In-Progress (09)
					</Title>
					<Space h={'md'} />

					<Box p={15} className='task_status_area'>
						{new Array(10).fill(10).map((_, idx) => (
							<TaskCard key={idx} />
						))}
					</Box>
				</Paper>
				<Paper withBorder>
					<Title className='rounded-sm' p={15} order={4} fw={500} bg='yellow'>
						Done (05)
					</Title>
					<Space h={'md'} />

					<Box p={15} className='task_status_area'>
						{new Array(10).fill(10).map((_, idx) => (
							<TaskCard key={idx} />
						))}
					</Box>
				</Paper>
				<Paper withBorder>
					<Title className='rounded-sm' p={15} order={4} fw={500} bg='orange'>
						Revision (03)
					</Title>
					<Space h={'md'} />

					<Box p={15} className='task_status_area'>
						{new Array(10).fill(10).map((_, idx) => (
							<TaskCard key={idx} />
						))}
					</Box>
				</Paper>
				<Paper withBorder>
					<Title className='rounded-sm' p={15} order={4} fw={500} bg='teal'>
						Completed (02)
					</Title>
					<Space h={'md'} />

					<Box p={15} className='task_status_area'>
						{new Array(10).fill(10).map((_, idx) => (
							<TaskCard key={idx} />
						))}
					</Box>
				</Paper>
				<Paper withBorder>
					<Title className='rounded-sm' p={15} order={4} fw={500} bg='red'>
						Cancelled (01)
					</Title>
					<Space h={'md'} />

					<Box p={15} className='task_status_area'>
						{new Array(10).fill(10).map((_, idx) => (
							<TaskCard key={idx} />
						))}
					</Box>
				</Paper>
			</div>
		</AdminLayout>
	);
};

export default TaskManagement;

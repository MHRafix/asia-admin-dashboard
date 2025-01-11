import { useGetTasksByStatus } from '@/app/api/gql-api-hooks/task-management.api';
import { IEmployees } from '@/app/api/models/employees.model';
import protectWithSession from '@/app/config/authProtection/protectWithSession';
import { EMPLOYEES_DROPDOWN_QUERY } from '@/app/config/gql-queries/employees.query';
import { MatchOperator, Task, USER_ROLE } from '@/app/config/gql-types';
import { useGetSession } from '@/app/config/logic/getSession';
import EmptyPanel from '@/components/common/EmptyPanels/EmptyPanel';
import PageTitleArea from '@/components/common/PageTitleArea';
import TaskCard from '@/components/custom/TaskManagement/TaskCard';
import TaskDetailsContent from '@/components/custom/TaskManagement/TaskDetailsContent';
import TaskForm, {
	getEmployeeSelectInputData,
	SelectItemEmployee,
} from '@/components/custom/TaskManagement/TaskForm';
import AdminLayout from '@/components/layouts/AdminLayout';
import { useQuery } from '@apollo/client';
import {
	ActionIcon,
	Box,
	Button,
	Drawer,
	Group,
	Loader,
	Select,
	Skeleton,
	Space,
	Tabs,
	Text,
	Title,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus, IconRefresh } from '@tabler/icons-react';
import cls from 'classnames';
import { useState } from 'react';

const TaskManagement = () => {
	// user session
	const { user } = useGetSession();
	const [taskDetails, setTaskDetails] = useState<Task | null>(null);

	// assign employee state
	const [filterQuery, setFilterQuery] = useState<any>();

	// refetch state
	const [isRefetching, setIsRefetching] = useState<boolean>(false);

	// get employees
	const { data: employeesData, loading: __employeeLoading } = useQuery<{
		teams: { nodes: IEmployees[] };
	}>(EMPLOYEES_DROPDOWN_QUERY, {
		variables: {
			input: {
				page: 1,
			},
		},
	});

	// drawer handler
	const [taskFormOpened, taskCreateDrawerHandler] = useDisclosure();
	const [taskDetailsOpened, taskDetailsDrawerHandler] = useDisclosure();
	const [operationType, setOperationType] = useState<'CREATE' | 'EDIT'>(
		'CREATE'
	);

	// get task query
	const { taskByStatus, __LoadingTask, __refetchTaskList } =
		useGetTasksByStatus(
			employeesData?.teams?.nodes?.find(
				(member: IEmployees) => member?.email === user?.email
			) as IEmployees,
			filterQuery?.value ? filterQuery : null
		);

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
								onClick={() => {
									setTaskDetails(null);
									setOperationType('CREATE');
									taskCreateDrawerHandler.toggle();
								}}
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
			<div>
				<Group position='right'>
					{isFilterShown(user?.role as USER_ROLE) && (
						<Select
							size='lg'
							w={400}
							data={getEmployeeSelectInputData(employeesData?.teams?.nodes)}
							itemComponent={SelectItemEmployee}
							searchable
							disabled={__employeeLoading}
							onChange={(e) =>
								setFilterQuery({
									key: 'taskDetails.taskAssignTo',
									operator: MatchOperator?.Eq,
									value: e,
								})
							}
							placeholder='Filter by user'
						/>
					)}
					{__LoadingTask || isRefetching ? (
						<Loader size={'lg'} color='violet' />
					) : (
						<ActionIcon
							onClick={() => {
								setIsRefetching(true);
								__refetchTaskList().finally(() => setIsRefetching(false));
							}}
							variant='outline'
							radius={100}
							size={'xl'}
						>
							<IconRefresh
								className={cls({ 'animate-reverse-spin': __LoadingTask })}
								size={30}
							/>
						</ActionIcon>
					)}
				</Group>

				<Space h={'md'} />

				<Tabs
					color='violet'
					orientation='horizontal'
					defaultValue='pending_task'
				>
					<Tabs.List>
						<Tabs.Tab value='pending_task' color='blue'>
							<Text color='blue'>
								Pending Task ({taskByStatus?.pendingTasks?.length ?? 0})
							</Text>
						</Tabs.Tab>
						<Tabs.Tab value='in_progress_task' color='violet'>
							<Text color='violet'>
								In-progress Task ({taskByStatus?.inProgressTask?.length ?? 0})
							</Text>
						</Tabs.Tab>
						<Tabs.Tab value='done_task' color='yellow'>
							<Text color='yellow'>
								Done Task ({taskByStatus?.doneTask?.length ?? 0})
							</Text>
						</Tabs.Tab>
						<Tabs.Tab value='revision_task' color='orange'>
							<Text color='orange'>
								Revision Task ({taskByStatus?.revisionTask?.length ?? 0})
							</Text>
						</Tabs.Tab>
					</Tabs.List>

					<Space h={'md'} />

					<Tabs.Panel value='pending_task'>
						{' '}
						<div>
							<Title p={15} order={4} fw={500} bg='blue'>
								Pending ({taskByStatus?.pendingTasks?.length ?? 0})
							</Title>{' '}
							<Box
								p={15}
								className='grid lg:grid-cols-3 gap-5 task_status_area'
							>
								{taskByStatus?.pendingTasks?.map((__task, idx) => (
									<TaskCard
										onTaskDetailsOpen={taskDetailsDrawerHandler.open}
										onSetTaskDetails={() => setTaskDetails(__task)}
										key={idx}
										__task={__task}
										onRefetch={__refetchTaskList}
										color='blue'
									/>
								))}
								{__LoadingTask && (
									<>
										{new Array(10).fill(10).map((_, idx) => (
											<Skeleton key={idx} h={220} my={5} radius={5} />
										))}
									</>
								)}
							</Box>
							<EmptyPanel
								isShow={
									Boolean(!taskByStatus?.pendingTasks?.length) && !__LoadingTask
								}
								title='No pending task'
								imgPath='https://icons.veryicon.com/png/o/education-technology/education-industry-linear-icon/task-7.png'
							/>
						</div>
					</Tabs.Panel>

					<Tabs.Panel value='in_progress_task'>
						<div>
							<Title p={15} order={4} fw={500} bg='violet'>
								In-Progress ({taskByStatus?.inProgressTask?.length ?? 0})
							</Title>{' '}
							<Box
								p={15}
								className='grid lg:grid-cols-3 gap-5 task_status_area'
							>
								{taskByStatus?.inProgressTask?.map((__task, idx) => (
									<TaskCard
										onTaskDetailsOpen={taskDetailsDrawerHandler.open}
										onSetTaskDetails={() => setTaskDetails(__task)}
										key={idx}
										__task={__task}
										onRefetch={__refetchTaskList}
										color='blue'
									/>
								))}
								{__LoadingTask && (
									<>
										{new Array(10).fill(10).map((_, idx) => (
											<Skeleton key={idx} h={220} my={5} radius={5} />
										))}
									</>
								)}
							</Box>
							<EmptyPanel
								isShow={
									Boolean(!taskByStatus?.inProgressTask?.length) &&
									!__LoadingTask
								}
								title='No in-progress task'
								imgPath='https://icons.veryicon.com/png/o/education-technology/education-industry-linear-icon/task-7.png'
							/>
						</div>
					</Tabs.Panel>

					<Tabs.Panel value='done_task'>
						{' '}
						<div>
							<Title p={15} order={4} fw={500} bg='yellow'>
								Done ({taskByStatus?.doneTask?.length ?? 0})
							</Title>{' '}
							<Box
								p={15}
								className='grid lg:grid-cols-3 gap-5 task_status_area'
							>
								{taskByStatus?.doneTask?.map((__task, idx) => (
									<TaskCard
										onTaskDetailsOpen={taskDetailsDrawerHandler.open}
										onSetTaskDetails={() => setTaskDetails(__task)}
										key={idx}
										__task={__task}
										onRefetch={__refetchTaskList}
										color='blue'
									/>
								))}
								{__LoadingTask && (
									<>
										{new Array(10).fill(10).map((_, idx) => (
											<Skeleton key={idx} h={220} my={5} radius={5} />
										))}
									</>
								)}
							</Box>
							<EmptyPanel
								isShow={
									Boolean(!taskByStatus?.doneTask?.length) && !__LoadingTask
								}
								title='No done task'
								imgPath='https://icons.veryicon.com/png/o/education-technology/education-industry-linear-icon/task-7.png'
							/>
						</div>
					</Tabs.Panel>
					<Tabs.Panel value='revision_task'>
						{' '}
						<div>
							<Title p={15} order={4} fw={500} bg='orange'>
								Revision ({taskByStatus?.revisionTask?.length ?? 0})
							</Title>{' '}
							<Box
								p={15}
								className='grid lg:grid-cols-3 gap-5 task_status_area'
							>
								{taskByStatus?.revisionTask?.map((__task, idx) => (
									<TaskCard
										onTaskDetailsOpen={taskDetailsDrawerHandler.open}
										onSetTaskDetails={() => setTaskDetails(__task)}
										key={idx}
										__task={__task}
										onRefetch={__refetchTaskList}
										color='blue'
									/>
								))}
								{__LoadingTask && (
									<>
										{new Array(10).fill(10).map((_, idx) => (
											<Skeleton key={idx} h={220} my={5} radius={5} />
										))}
									</>
								)}
							</Box>
							<EmptyPanel
								isShow={
									Boolean(!taskByStatus?.revisionTask?.length) && !__LoadingTask
								}
								title='No revision task'
								imgPath='https://icons.veryicon.com/png/o/education-technology/education-industry-linear-icon/task-7.png'
							/>
						</div>
					</Tabs.Panel>
				</Tabs>
			</div>

			{/* Task details drawer */}
			<Drawer
				opened={taskDetailsOpened}
				onClose={taskDetailsDrawerHandler.close}
				position='right'
				size='xl'
				title='Task Details'
			>
				<TaskDetailsContent
					__taskDetails={taskDetails!}
					onEditTask={() => {
						setOperationType('EDIT');
						taskDetailsDrawerHandler.close();
						taskCreateDrawerHandler.open();
					}}
				/>
			</Drawer>

			{/* Task form drawer */}
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
					taskPayload={taskDetails!}
					operationType={operationType}
				/>
			</Drawer>
		</AdminLayout>
	);
};

export default protectWithSession(TaskManagement);

const isFilterShown = (role: USER_ROLE) => {
	switch (role) {
		case USER_ROLE.ADMIN:
			return true;

		case USER_ROLE.MODERATOR:
			return true;

		default:
			return false;
	}
};

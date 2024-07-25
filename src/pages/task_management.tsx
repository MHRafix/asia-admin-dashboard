import { useGetTasksByStatus } from '@/app/api/gql-api-hooks/task-management.api';
import { PAYMENT_STATUS } from '@/app/api/models/bookings.model';
import { IUser } from '@/app/api/models/users.model';
import { useGetSession } from '@/app/config/logic/getSession';
import PageTitleArea from '@/components/common/PageTitleArea';
import TaskCard from '@/components/custom/TaskManagement/TaskCard';
import AdminLayout from '@/components/layouts/AdminLayout';
import {
	Avatar,
	Badge,
	Box,
	Button,
	Drawer,
	Flex,
	Group,
	Input,
	NumberInput,
	Paper,
	Select,
	Skeleton,
	Space,
	Text,
	Textarea,
	Title,
} from '@mantine/core';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus, IconX } from '@tabler/icons-react';
import { FiUpload } from 'react-icons/fi';
import { HiOutlinePhotograph } from 'react-icons/hi';

const TaskManagement = () => {
	// user session
	const { loading, user } = useGetSession();

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
			{user?.role}
			<div className='grid grid-cols-3 gap-x-5 gap-y-10'>
				<Paper withBorder>
					<Title className='rounded-sm' p={15} order={4} fw={500} bg='blue'>
						Pending ({taskByStatus?.pendingTasks?.length ?? 0})
					</Title>

					<Space h={'md'} />

					<Box p={15} className='task_status_area'>
						{taskByStatus?.pendingTasks?.map((_task, idx) => (
							<TaskCard
								key={idx}
								_task={_task}
								onRefetch={__refetchTaskList}
								color='blue'
							/>
						))}
						{__LoadingTask && (
							<>
								{new Array(10).fill(10).map((_, idx) => (
									<Skeleton h={110} my={5} radius={5} />
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
						{taskByStatus?.inProgressTask?.map((_task, idx) => (
							<TaskCard
								key={idx}
								_task={_task}
								onRefetch={__refetchTaskList}
								color='violet'
							/>
						))}
						{__LoadingTask && (
							<>
								{new Array(10).fill(10).map((_, idx) => (
									<Skeleton h={110} my={5} radius={5} />
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
						{taskByStatus?.doneTask?.map((_task, idx) => (
							<TaskCard
								key={idx}
								_task={_task}
								onRefetch={__refetchTaskList}
								color='yellow'
							/>
						))}
						{__LoadingTask && (
							<>
								{new Array(10).fill(10).map((_, idx) => (
									<Skeleton h={110} my={5} radius={5} />
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
						{taskByStatus?.revisionTask?.map((_task, idx) => (
							<TaskCard
								key={idx}
								_task={_task}
								onRefetch={__refetchTaskList}
								color='orange'
							/>
						))}
						{__LoadingTask && (
							<>
								{new Array(10).fill(10).map((_, idx) => (
									<Skeleton h={110} my={5} radius={5} />
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
						{taskByStatus?.completedTask?.map((_task, idx) => (
							<TaskCard
								key={idx}
								_task={_task}
								onRefetch={__refetchTaskList}
								color='teal'
							/>
						))}
						{__LoadingTask && (
							<>
								{new Array(10).fill(10).map((_, idx) => (
									<Skeleton h={110} my={5} radius={5} />
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
						{taskByStatus?.cancelledTask?.map((_task, idx) => (
							<TaskCard
								key={idx}
								_task={_task}
								onRefetch={__refetchTaskList}
								color='red'
							/>
						))}
						{__LoadingTask && (
							<>
								{new Array(10).fill(10).map((_, idx) => (
									<Skeleton h={110} my={5} radius={5} />
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
				title='Task Details'
			>
				<div>
					<form className='grid gap-y-3'>
						<Input.Wrapper size='lg' label='Task Title'>
							<Input size='lg' placeholder='Task title' />
						</Input.Wrapper>

						<Input.Wrapper size='lg' label='Client'>
							<Select
								size='lg'
								data={['2327sdhgdhgshdgshdg', '2563sghdgshdgh']}
								placeholder='Pick a client'
							/>
						</Input.Wrapper>

						<Input.Wrapper size='lg' label='Assign to'>
							<Select
								size='lg'
								data={['2327sdhgdhgshdgshdg', '2563sghdgshdgh']}
								placeholder='Pick a  employee to assign'
							/>
						</Input.Wrapper>
						{/* totalBillAmount
						paidBillAmount */}

						<Input.Wrapper size='lg' label='Total Amount'>
							<NumberInput size='lg' placeholder='Total amount' />
						</Input.Wrapper>

						<Input.Wrapper size='lg' label='Paid Amount'>
							<NumberInput size='lg' placeholder='Paid amount' />
						</Input.Wrapper>

						<Input.Wrapper size='lg' label='Task Description'>
							<Textarea size='lg' cols={5} placeholder='Task description' />
						</Input.Wrapper>

						<Input.Wrapper size='lg' label='Task Issues'>
							<Textarea
								size='lg'
								cols={7}
								placeholder='Task issues description'
							/>
						</Input.Wrapper>

						<Input.Wrapper size='lg' label='Documents'>
							<Dropzone
								onDrop={(files) => {}}
								onReject={(files) => {}}
								// loading={uploading}
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
										<IconX size={50} color={'dark'} />
									</Dropzone.Reject>
									<Dropzone.Idle>
										<HiOutlinePhotograph color='#5F3DC4' size={50} />
									</Dropzone.Idle>

									<div>
										<Text size='md' inline>
											Drag or select file
										</Text>
									</div>
								</Group>
							</Dropzone>
						</Input.Wrapper>
					</form>

					<Space h={'md'} />

					{/* summaries */}
					<div className='grid grid-cols-3 gap-3'>
						<Paper p={10} withBorder>
							<Text fw={700} fz={18}>
								Client
							</Text>
							<Space h={'sm'} />

							<Flex justify={'start'} gap={5} align={'center'}>
								<Avatar color='teal' radius={100} size={'md'}>
									MH
								</Avatar>
								<Text>Mehedi H. Rafiz</Text>
							</Flex>
						</Paper>
						<Paper p={10} withBorder>
							<Text fw={700} fz={18}>
								Assign to
							</Text>

							<Space h={'sm'} />

							<Flex justify={'start'} gap={5} align={'center'}>
								<Avatar color='teal' radius={100} size={'md'}>
									MH
								</Avatar>
								<Text>Mehedi H. Rafiz</Text>
							</Flex>
						</Paper>
						<Paper p={10} withBorder>
							<Text fw={700} fz={18}>
								Payment
							</Text>
							<Space h={'sm'} />
							<Text>Due: {1233 - 234} BDT</Text>
							<Space h={4} />
							<Text>
								Payment Status: &nbsp;{' '}
								<Badge size='md' radius={3}>
									{PAYMENT_STATUS[0]}
								</Badge>
							</Text>
						</Paper>
					</div>
				</div>
			</Drawer>
		</AdminLayout>
	);
};

export default TaskManagement;

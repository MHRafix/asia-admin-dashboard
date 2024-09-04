import { ClientWithPagination } from '@/app/api/models/client.model';
import { IPaginationMeta } from '@/app/api/models/CommonPagination.model';
import { IEmployees } from '@/app/api/models/employees.model';
import { Notify } from '@/app/config/alertNotification/Notification';
import { GET_CLIENTS_QUERY } from '@/app/config/gql-queries/clientsData.query';
import { EMPLOYEES_DROPDOWN_QUERY } from '@/app/config/gql-queries/employees.query';
import {
	Create_Task_Mutation,
	Update_Task_Mutation,
} from '@/app/config/gql-queries/task-management.query';
import { Task } from '@/app/config/gql-types';
import { useGetSession } from '@/app/config/logic/getSession';
import { useMutation, useQuery } from '@apollo/client';
import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers/yup';
import {
	Avatar,
	Button,
	Flex,
	Group,
	Input,
	NumberInput,
	Paper,
	Select,
	Space,
	Text,
	Textarea,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { IconX } from '@tabler/icons-react';
import React, { forwardRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FiUpload } from 'react-icons/fi';
import { HiOutlinePhotograph } from 'react-icons/hi';
import * as Yup from 'yup';

const TaskForm: React.FC<{
	onRefetch: () => void;
	onCloseDrawer: () => void;
	operationType: 'EDIT' | 'CREATE';
	taskPayload?: Task;
}> = ({ onRefetch, onCloseDrawer, operationType, taskPayload }) => {
	// alert(operationType);

	// user session
	const { user } = useGetSession();

	// get clients
	const { data: clients, loading: __clientsLoading } = useQuery<{
		Clients: ClientWithPagination;
	}>(GET_CLIENTS_QUERY);

	// get employees
	const { data: employeesData, loading: __employeeLoading } = useQuery<{
		teams: { nodes: IEmployees[]; meta: IPaginationMeta };
	}>(EMPLOYEES_DROPDOWN_QUERY, {
		variables: {
			input: {
				page: 1,
			},
		},
	});

	// task form
	const {
		register,
		setValue,
		handleSubmit,
		reset,
		formState: { errors },
		watch,
	} = useForm<ITaskFormType>({
		resolver: yupResolver(Task_Form_Validation_Schema),
	});

	// prefill the form with existing task
	useEffect(() => {
		if (operationType === 'EDIT') {
			setValue('client', taskPayload?.client?._id as string);
			setValue('deadLine', taskPayload?.deadLine as Date);
			setValue('paidBillAmount', taskPayload?.paidBillAmount as number);
			setValue('totalBillAmount', taskPayload?.totalBillAmount as number);
			setValue(
				'taskDetails.taskName',
				taskPayload?.taskDetails?.taskName as string
			);
			setValue(
				'taskDetails.taskDescription',
				taskPayload?.taskDetails?.taskDescription as string
			);
			setValue(
				'taskDetails.taskAssignTo',
				taskPayload?.taskDetails?.taskAssignTo?._id as string
			);
			setValue(
				'taskDetails.issuesDescription',
				taskPayload?.taskDetails?.issuesDescription as string
			);
		}
	}, [taskPayload]);

	// create task mutation
	const [createTask, { loading: __creatingTask }] = useMutation(
		Create_Task_Mutation,
		Notify({
			sucTitle: 'Task created successfully!',
			action: () => {
				onRefetch();
				reset({});
				onCloseDrawer();
			},
		})
	);

	// update task mutation
	const [updateTask, { loading: __updatingTask }] = useMutation(
		Update_Task_Mutation,
		Notify({
			sucTitle: 'Task updated successfully!',
			action: () => {
				onRefetch();
				reset({});
				onCloseDrawer();
			},
		})
	);

	// submit task form
	const onSubmit = (payload: ITaskFormType) => {
		if (operationType === 'CREATE') {
			createTask({
				variables: {
					input: {
						...payload,
						taskCreatedBy: user?._id,
						taskId: `#TK${Date.now().toString().slice(0, 4)}`,
						dueAmount: payload?.totalBillAmount - payload?.paidBillAmount,
					},
				},
			});
		} else {
			updateTask({
				variables: {
					input: {
						...payload,
						_id: taskPayload?._id,
					},
				},
			});
		}
	};

	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)} className='grid gap-y-3'>
				<Input.Wrapper
					size='md'
					label='Task Title'
					error={<ErrorMessage name='taskDetails.taskName' errors={errors} />}
				>
					<Input
						{...register('taskDetails.taskName')}
						size='lg'
						placeholder='Task title'
					/>
				</Input.Wrapper>

				<Input.Wrapper
					size='md'
					label='Client'
					error={<ErrorMessage name='client' errors={errors} />}
				>
					<Select
						size='lg'
						data={getEmployeeSelectInputData(clients?.Clients?.nodes)}
						itemComponent={SelectItemEmployee}
						value={watch('client')}
						searchable
						onChange={(e) => setValue('client', e as string)}
						placeholder='Pick a client'
					/>
				</Input.Wrapper>

				<Input.Wrapper
					size='md'
					label='Assign to'
					error={
						<ErrorMessage name='taskDetails.taskAssignTo' errors={errors} />
					}
				>
					<Select
						size='lg'
						data={getEmployeeSelectInputData(employeesData?.teams?.nodes)}
						itemComponent={SelectItemEmployee}
						value={watch('taskDetails.taskAssignTo')}
						searchable
						onChange={(e) => setValue('taskDetails.taskAssignTo', e as string)}
						placeholder='Pick a  employee to assign'
					/>
				</Input.Wrapper>

				<Input.Wrapper
					size='md'
					label='Total Amount'
					error={<ErrorMessage name='totalBillAmount' errors={errors} />}
				>
					<NumberInput
						onChange={(e) => setValue('totalBillAmount', parseInt(e as string))}
						value={watch('totalBillAmount')}
						size='lg'
						placeholder='Total amount'
						min={1}
					/>
				</Input.Wrapper>

				<Input.Wrapper
					size='md'
					label='Paid Amount'
					error={<ErrorMessage name='paidBillAmount' errors={errors} />}
				>
					<NumberInput
						size='lg'
						onChange={(e) => setValue('paidBillAmount', parseInt(e as string))}
						value={watch('paidBillAmount')}
						placeholder='Paid amount'
						min={0}
					/>
				</Input.Wrapper>

				<Input.Wrapper
					size='md'
					label='Task Description'
					error={
						<ErrorMessage name='taskDetails.taskDescription' errors={errors} />
					}
				>
					<Textarea
						size='lg'
						cols={5}
						placeholder='Task description'
						{...register('taskDetails.taskDescription')}
					/>
				</Input.Wrapper>

				<Input.Wrapper
					size='md'
					label='Task Issues'
					error={
						<ErrorMessage
							name='taskDetails.issuesDescription'
							errors={errors}
						/>
					}
				>
					<Textarea
						size='lg'
						cols={7}
						placeholder='Task issues description'
						{...register('taskDetails.issuesDescription')}
					/>
				</Input.Wrapper>

				<Input.Wrapper
					size='md'
					label='Deadline'
					error={<ErrorMessage name='deadline' errors={errors} />}
				>
					<DateInput
						size='lg'
						placeholder='Task deadline'
						onChange={(e) => setValue('deadLine', e!)}
						value={new Date(watch('deadLine') || taskPayload?.deadLine)}
					/>
				</Input.Wrapper>

				<Input.Wrapper size='md' label='Documents'>
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

				<Space h={'md'} />

				{/* summaries */}
				<div className='grid lg:grid-cols-3 gap-3'>
					{watch('client') && (
						<Paper p={10} radius={0} withBorder>
							<Text fw={700} fz={18}>
								Client
							</Text>
							<Space h={'sm'} />

							<Flex justify={'start'} gap={15} align={'center'}>
								<Avatar color='teal' radius={100} size={'lg'}>
									{findUserById(
										watch('client'),
										clients?.Clients?.nodes!
									)?.name?.slice(0, 1)}
								</Avatar>

								<div>
									<Text fw={500}>
										{
											findUserById(watch('client'), clients?.Clients?.nodes!)
												?.name
										}
									</Text>
									<Text size={'sm'} color='dimmed'>
										{
											findUserById(watch('client'), clients?.Clients?.nodes!)
												?.phone
										}
									</Text>
								</div>
							</Flex>
						</Paper>
					)}
					{watch('taskDetails.taskAssignTo') && (
						<Paper p={10} radius={0} withBorder>
							<Text fw={700} fz={18}>
								Assign to
							</Text>

							<Space h={'sm'} />

							<Flex justify={'start'} gap={15} align={'center'}>
								<Avatar
									src={
										findUserById(
											watch('taskDetails.taskAssignTo'),
											employeesData?.teams?.nodes!
										)?.avatar
									}
									color='teal'
									radius={100}
									size={'lg'}
								>
									{findUserById(
										watch('taskDetails.taskAssignTo'),
										employeesData?.teams?.nodes!
									)?.name?.slice(0, 1)}
								</Avatar>
								<div>
									<Text fw={500}>
										{
											findUserById(
												watch('taskDetails.taskAssignTo'),
												employeesData?.teams?.nodes!
											)?.name
										}
									</Text>
									<Text size={'sm'} color='dimmed'>
										{findUserById(
											watch('taskDetails.taskAssignTo'),
											employeesData?.teams?.nodes!
										)?.phone ||
											findUserById(
												watch('taskDetails.taskAssignTo'),
												employeesData?.teams?.nodes!
											)?.email}
									</Text>
								</div>
							</Flex>
						</Paper>
					)}
					{watch('totalBillAmount') ? (
						<Paper p={10} radius={0} withBorder>
							<Text fw={700} fz={18}>
								Payment
							</Text>
							<Space h={'sm'} />
							<Text color='blue'>
								Payable: {watch('totalBillAmount') ?? 0} BDT
							</Text>
							<Text color='teal'>Paid: {watch('paidBillAmount') ?? 0} BDT</Text>
							<Text color='yellow'>
								Due: {watch('totalBillAmount') - watch('paidBillAmount')} BDT
							</Text>
						</Paper>
					) : null}
				</div>
				<Space h={'xs'} />

				<Button
					loading={__creatingTask || __updatingTask}
					color='teal'
					size='lg'
					type='submit'
					fullWidth
				>
					Save
				</Button>
			</form>
		</div>
	);
};

export default TaskForm;

export const Task_Form_Validation_Schema = Yup.object().shape({
	taskDetails: Yup.object()
		.shape({
			taskName: Yup.string().required().label('Task name'),
			taskAssignTo: Yup.string().required().label('Task assign to'),
			taskDescription: Yup.string()
				.optional()
				.nullable()
				.label('Task description'),
			issuesDescription: Yup.string()
				.optional()
				.nullable()
				.label('Task issues'),
		})
		.required(),
	client: Yup.string().required().label('Client'),
	totalBillAmount: Yup.number().required().label('Total amount'),
	paidBillAmount: Yup.number().required().label('Paid amount'),
	deadLine: Yup.date().required().label('Deadline'),
});

export type ITaskFormType = Yup.InferType<typeof Task_Form_Validation_Schema>;

// make select input data from api response
export const getEmployeeSelectInputData = (data: any) => {
	let result: any = [];
	data?.map((d: any) =>
		result.push({
			label: d.name,
			value: d._id,
			email: d.email ?? 'N/A',
			avatar: d?.avatar ?? 'N/A',
		})
	);

	return result;
};

// find client and employee
export const findUserById = (id: string, dataArray: any) => {
	const user: any = dataArray?.find((data: any) => data?._id === id);
	return user;
};

// input item type
interface ItemProps extends React.ComponentPropsWithoutRef<'div'> {
	label: string;
	value: string;
	avatar: string;
	email: string;
}

// custom select input style
export const SelectItemEmployee = forwardRef<HTMLDivElement, ItemProps>(
	({ avatar, label, value, email, ...others }: ItemProps, ref) => (
		<div ref={ref} {...others}>
			<Group noWrap>
				<Avatar color='teal' radius={100} src={avatar}>
					{label?.slice(0, 1).toUpperCase()}
				</Avatar>
				<div>
					<Text size='sm'>{label}</Text>
					<Text size='xs' opacity={0.65}>
						{email}
					</Text>
				</div>
			</Group>
		</div>
	)
);

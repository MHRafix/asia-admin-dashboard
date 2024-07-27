import { ClientWithPagination, IClient } from '@/app/api/models/client.model';
import { IPaginationMeta } from '@/app/api/models/CommonPagination.model';
import { IEmployees } from '@/app/api/models/employees.model';
import { Notify } from '@/app/config/alertNotification/Notification';
import { useGetSession } from '@/app/config/logic/getSession';
import { GET_CLIENTS_QUERY } from '@/app/config/queries/clientsData.query';
import { EMPLOYEES_QUERY } from '@/app/config/queries/employees.query';
import { Create_Task_Mutation } from '@/app/config/queries/task-management.query';
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
import React, { forwardRef } from 'react';
import { useForm } from 'react-hook-form';
import { FiUpload } from 'react-icons/fi';
import { HiOutlinePhotograph } from 'react-icons/hi';
import * as Yup from 'yup';

const TaskForm: React.FC<{
	onRefetch: () => void;
	onCloseDrawer: () => void;
}> = ({ onRefetch, onCloseDrawer }) => {
	// user session
	const { user } = useGetSession();

	// get clients
	const { data: clients, loading: __clientsLoading } = useQuery<{
		Clients: ClientWithPagination;
	}>(GET_CLIENTS_QUERY);

	// get employees
	const { data: employeesData, loading: __employeeLoading } = useQuery<{
		teams: { nodes: IEmployees[]; meta: IPaginationMeta };
	}>(EMPLOYEES_QUERY, {
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
		mode: 'onChange',
	});

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

	// submit task form
	const onSubmit = (payload: ITaskFormType) => {
		createTask({
			variables: {
				input: {
					...payload,
					taskCreatedBy: user?._id,
				},
			},
		});
	};
	// 🚀Task management role permissions check and complete the task ✅

	// client data
	// const clientData = ?.map(
	// 	(client: any) => `<div>
	// 			<Avatar>${client?.label}</Avatar>
	// 		</div>`
	// );

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
						data={getSelectInputData(clients?.Clients?.nodes)}
						itemComponent={SelectItem}
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
						data={getSelectInputData(employeesData?.teams?.nodes)}
						itemComponent={SelectItem}
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
				<div className='grid grid-cols-3 gap-3'>
					{watch('client') && (
						<Paper p={10} withBorder>
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
						<Paper p={10} withBorder>
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
										{
											findUserById(
												watch('taskDetails.taskAssignTo'),
												employeesData?.teams?.nodes!
											)?.phone
										}
									</Text>
								</div>
							</Flex>
						</Paper>
					)}
					{watch('totalBillAmount') && watch('paidBillAmount') ? (
						<Paper p={10} withBorder>
							<Text fw={700} fz={18}>
								Payment
							</Text>
							<Space h={'sm'} />
							<Text>
								Due:{' '}
								{watch('totalBillAmount') ?? 0 - watch('paidBillAmount') ?? 0}{' '}
								BDT
							</Text>
							{/* <Space h={4} />
							<Text>
								Payment Status: &nbsp;{' '}
								<Badge size='md' radius={3}>
									{PAYMENT_STATUS[0]}
								</Badge>
							</Text> */}
						</Paper>
					) : null}
				</div>
				<Space h={'xs'} />

				<Button
					loading={__creatingTask}
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
const getSelectInputData = (data: any) => {
	let result: any = [];
	data?.map((d: any) =>
		result.push({
			label: d.name,
			value: d._id,
			phone: d.phone ?? 'N/A',
			avatar: d?.avatar ?? 'N/A',
		})
	);

	return result;
};

// find client and employee
const findUserById = (id: string, dataArray: IClient[] | IEmployees[]) => {
	const user: any = dataArray?.find((data: any) => data?._id === id);
	return user;
};

// input item type
interface ItemProps extends React.ComponentPropsWithoutRef<'div'> {
	label: string;
	value: string;
	avatar: string;
	phone: string;
}

// custom select input style
export const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
	({ avatar, label, value, phone, ...others }: ItemProps, ref) => (
		<div ref={ref} {...others}>
			<Group noWrap>
				<Avatar color='teal' radius={100} src={avatar}>
					{label?.slice(0, 1).toUpperCase()}
				</Avatar>
				<div>
					<Text size='sm'>{label}</Text>
					<Text size='xs' opacity={0.65}>
						{phone}
					</Text>
				</div>
			</Group>
		</div>
	)
);

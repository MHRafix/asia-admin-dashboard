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
import { MatchOperator, Task, USER_ROLE } from '@/app/config/gql-types';
import { fileUploader } from '@/app/config/logic/fileUploader';
import { useGetSession } from '@/app/config/logic/getSession';
import { useMutation, useQuery } from '@apollo/client';
import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers/yup';
import {
	ActionIcon,
	Avatar,
	Button,
	Flex,
	Group,
	Input,
	Loader,
	LoadingOverlay,
	NumberInput,
	Paper,
	Select,
	Space,
	Text,
	Textarea,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { Dropzone } from '@mantine/dropzone';
import { IconX } from '@tabler/icons-react';
import React, { forwardRef, useEffect, useMemo, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { FiUpload } from 'react-icons/fi';
import { HiOutlinePhotograph } from 'react-icons/hi';
import * as Yup from 'yup';

const TaskForm: React.FC<{
	onRefetch: () => void;
	onCloseDrawer: () => void;
	operationType: 'EDIT' | 'CREATE';
	taskPayload?: Task;
}> = ({ onRefetch, onCloseDrawer, operationType, taskPayload }) => {
	// uploading state
	const [uploading, setUploading] = useState<boolean>(false);

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
				where: {
					key: 'role',
					operator: MatchOperator.Eq,
					value: USER_ROLE.EMPLOYEE,
				},
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
		control,
		watch,
	} = useForm<ITaskFormType>({
		resolver: yupResolver(Task_Form_Validation_Schema),
		defaultValues: {
			deadLine: new Date(),
			files: [],
		},
		mode: 'onChange',
	});

	// files array fileds
	const { append: addFile, remove: removeFile } = useFieldArray({
		control,
		name: 'files',
	});

	// upload file hook
	const uploadFiles = async (file: File) => {
		setUploading(true);
		const { file_upload_cloudinary } = fileUploader(file, 'ASIA_LOGO');
		const url = await file_upload_cloudinary();
		if (url) {
			Notify({
				sucTitle: 'File uploaded successfully!',
			});
		}

		addFile({
			fileUrl: url,
		});

		setUploading(false);
	};

	// prefill the form with existing task
	useEffect(() => {
		if (operationType === 'EDIT') {
			setValue('client', taskPayload?.client?._id as string);
			setValue('files', taskPayload?.files);
			setValue(
				'deadLine',
				taskPayload?.deadLine ? taskPayload?.deadLine : (new Date() as Date)
			);
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
						taskId: `#TK${Date.now().toString().slice(9, 13)}`,
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

	// employee id
	const taskAssignToId = watch('taskDetails.taskAssignTo');
	// employees
	const employees = employeesData?.teams?.nodes || [];

	// find employee
	const assignedEmployee = useMemo(() => {
		return employees.find((employee) => employee._id === taskAssignToId);
	}, [taskAssignToId, employees]);

	// employee name, email and phone
	const employeeName = assignedEmployee?.name;
	const employeePhone = assignedEmployee?.phone;
	const employeeEmail = assignedEmployee?.email;

	// client id
	const selectedClientId = watch('client');
	// clients
	const clientsData = clients?.Clients?.nodes || [];

	// find client
	const selectedClient = useMemo(() => {
		return clientsData?.find((client) => client?._id === selectedClientId);
	}, [selectedClientId, clients]);

	// employee name, email and phone
	const clientName = selectedClient?.name;
	const clientPhone = selectedClient?.phone;
	const clientEmail = selectedClient?.email;

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
						data={useMemo(() => {
							return getEmployeeSelectInputData(clients?.Clients?.nodes);
						}, [clients])}
						itemComponent={SelectItemEmployee}
						value={watch('client')}
						searchable
						onChange={(e) => setValue('client', e as string)}
						placeholder='Pick a client'
						rightSection={
							__clientsLoading ? <Loader size={'sm'} color='violet' /> : null
						}
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
						data={useMemo(() => {
							return getEmployeeSelectInputData(employeesData?.teams?.nodes);
						}, [employeesData])}
						itemComponent={SelectItemEmployee}
						value={watch('taskDetails.taskAssignTo')}
						searchable
						onChange={(e) => setValue('taskDetails.taskAssignTo', e as string)}
						placeholder='Pick a  employee to assign'
						rightSection={
							__employeeLoading ? <Loader size={'sm'} color='violet' /> : null
						}
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
						value={watch('deadLine') ? new Date(watch('deadLine')) : new Date()}
					/>
				</Input.Wrapper>

				<Input.Wrapper size='md' label='Upload documents'>
					<Dropzone
						onDrop={(files) => uploadFiles(files[0])}
						onReject={(files) => {}}
						loading={uploading}
						multiple={false}
						// w={350}
						// mx='auto'
						h={150}
						bg={'transparent'}
						maxSize={3 * 1024 ** 2}
						draggable={true}
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

					<Space h={'md'} />

					{watch('files')?.[0]?.fileUrl ? (
						<>
							{watch('files')?.map((file, idx: number) => (
								<div>
									<Space h={'md'} />
									<Paper
										p={10}
										radius={10}
										withBorder
										className='hover:bg-slate-900 flex justify-between items-center'
									>
										<Text
											className='cursor-pointer'
											onClick={() => window.open(file?.fileUrl)}
										>
											{idx + 1}.{' '}
											{file?.fileUrl.split('upload/')[1].slice(0, 100)}
										</Text>
										<ActionIcon
											onClick={() => removeFile(idx)}
											size={'sm'}
											variant='filled'
											color='red'
										>
											<IconX size={16} />
										</ActionIcon>
									</Paper>
								</div>
							))}
						</>
					) : null}
				</Input.Wrapper>

				<Space h={'md'} />

				{/* summaries */}
				<div className='grid lg:grid-cols-3 gap-3'>
					{watch('client') && (
						<Paper p={10} radius={0} withBorder pos={'relative'}>
							<LoadingOverlay visible={__clientsLoading} color='violet' />
							<Text fw={700} fz={18}>
								Client
							</Text>
							<Space h={'sm'} />

							<Flex justify={'start'} gap={15} align={'center'}>
								<Avatar color='teal' radius={100} size={'lg'}>
									{clientName?.slice(0, 1) || clientEmail?.slice(0, 1)}
								</Avatar>

								<div>
									<Text fw={500}>{clientName || 'N/A'}</Text>
									<Text size={'sm'} color='dimmed'>
										{clientPhone || 'N/A'}
									</Text>
								</div>
							</Flex>
						</Paper>
					)}
					{watch('taskDetails.taskAssignTo') && (
						<Paper p={10} radius={0} withBorder pos={'relative'}>
							<LoadingOverlay visible={__employeeLoading} color='violet' />
							<Text fw={700} fz={18}>
								Assign to
							</Text>

							<Space h={'sm'} />

							<Flex justify={'start'} gap={15} align={'center'}>
								<Avatar
									src={assignedEmployee?.avatar}
									color='teal'
									radius={100}
									size={'lg'}
								>
									{employeeName?.slice(0, 1)}
								</Avatar>
								<div>
									<Text fw={500}>{employeeName || 'N/A'}</Text>
									<Text size={'sm'} color='dimmed'>
										{employeePhone || employeeEmail || 'N/A'}
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
	files: Yup.array().of(
		Yup.object().shape({
			fileUrl: Yup.string().required().label('File url'),
		})
	),
	client: Yup.string().required().label('Client'),
	totalBillAmount: Yup.number().required().label('Total amount'),
	paidBillAmount: Yup.number()
		.required()
		.max(
			Yup.ref('totalBillAmount'),
			'Paid amount must be less than or equal to the total amount'
		)
		.label('Paid amount'),
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

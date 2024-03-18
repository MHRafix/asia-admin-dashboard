import { IPaginationMeta } from '@/app/api/models/CommonPagination.model';
import { IUser } from '@/app/api/models/users.model';
import { Notify } from '@/app/config/alertNotification/Notification';
import {
	CREATE_USER_MUTATION,
	MANAGE_USER_ACCESS_MUTATION,
} from '@/app/config/queries/user.query';
import {
	BULK_REMOVE_USER,
	USERS_QUERY,
} from '@/app/config/queries/users.query';
import EmptyPannel from '@/components/common/EmptyPannel';
import PageTitleArea from '@/components/common/PageTitleArea';
import DataTable from '@/components/common/Table/DataTable';
import { IState } from '@/pages/reception_management/attendance_activities';
import { useMutation, useQuery } from '@apollo/client';
import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers/yup';
import {
	Avatar,
	Badge,
	Button,
	Drawer,
	Flex,
	Group,
	Input,
	Menu,
	Modal,
	PasswordInput,
	Radio,
	Select,
	Space,
	Stack,
	Text,
} from '@mantine/core';
import { useDisclosure, useSetState } from '@mantine/hooks';
import { showNotification } from '@mantine/notifications';
import { IconAccessible, IconPlus } from '@tabler/icons-react';
import { MRT_ColumnDef } from 'mantine-react-table';
import React, { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiTrash } from 'react-icons/fi';
import { TbUsers } from 'react-icons/tb';
import * as Yup from 'yup';

const UsersTable: React.FC<{}> = () => {
	const [state, setState] = useSetState<IState>({
		modalOpened: false,
		operationType: 'create',
		operationId: null,
		operationPayload: {},
		refetching: false,
	});

	const [access, setAccess] = useState<string>('');
	const [opened, modalHandler] = useDisclosure();
	const [user, setUser] = useState<IUser>();

	// get booking packages
	const {
		data,
		loading: fetching,
		refetch,
	} = useQuery<{
		users: { nodes: IUser[]; meta: IPaginationMeta };
	}>(USERS_QUERY);

	// remove bulk bookings
	const [bulkDeleteCustomer, { loading: bulkDeleting }] = useMutation(
		BULK_REMOVE_USER,
		{
			onCompleted: () => {
				refetch();
				showNotification({
					title: 'Customers bulk delete successful!',
					color: 'red',
					icon: <FiTrash size={20} />,
					message: '',
				});
			},
		}
	);

	// form initiate
	const {
		register,
		handleSubmit,
		reset,
		setValue,
		formState: { errors },
	} = useForm<{
		name: string;
		email: string;
		role: string;
		password: string;
	}>({
		resolver: yupResolver(
			Yup.object().shape({
				name: Yup.string().required().label('Name'),
				email: Yup.string().email().required().label('Email'),
				password: Yup.string().min(8).required().label('Password'),
				role: Yup.string().required().label('Role'),
			})
		),
	});

	// handle refetch
	const handleRefetch = (variables: any) => {
		setState({ refetching: true, operationId: '', modalOpened: false });
		refetch(variables).finally(() => {
			setState({ refetching: false });
		});
	};

	const columns = useMemo<MRT_ColumnDef<any>[]>(
		() => [
			{
				accessorKey: 'name',
				accessorFn: (originalRow: IUser) => (
					<Flex align={'center'} gap={10}>
						<Avatar src={originalRow?.avatar} size={'md'} radius={100} />
						<Text fw={500}>{originalRow?.name}</Text>
					</Flex>
				),
				header: 'Name',
			},
			{
				accessorKey: 'email',
				header: 'Email',
			},
			{
				accessorKey: 'phone',
				header: 'Phone Number',
			},
			{
				accessorKey: 'role',
				accessorFn: (originalRow: IUser) => (
					<Badge
						color={getRoleBadgeColor(originalRow?.role)}
						size='md'
						variant='filled'
						radius='sm'
					>
						{originalRow?.role}
					</Badge>
				),
				header: 'Role',
			},
		],
		[]
	);

	// create user
	const [createUser, { loading: creating__user }] = useMutation(
		CREATE_USER_MUTATION,
		Notify({
			sucTitle: 'User created successfully',
			action: () => {
				refetch();
				setState({
					modalOpened: false,
				});
			},
		})
	);

	// on submit user create form
	const onSubmitUserForm = (input: any) => {
		createUser({
			variables: {
				input,
			},
		});
	};

	// update user access
	const [accessMutate, { loading: access__loading }] = useMutation(
		MANAGE_USER_ACCESS_MUTATION,
		Notify({
			sucTitle: 'User access changed',
			action: () => {
				refetch();
				setAccess('');
				modalHandler.close();
			},
		})
	);

	return (
		<>
			<PageTitleArea
				title='Our customers'
				tagline='Our solid customers'
				currentPathName='Customers'
				othersPath={[
					{
						pathName: 'Home',
						href: '/',
					},
				]}
			/>

			{/* access modal  */}
			<Modal
				title='Change user access'
				opened={opened}
				onClose={modalHandler.close}
				centered
			>
				<div>
					<Text size='sm'>Select an access point from dropdown</Text>

					<Radio.Group
						onChange={(e) => setAccess(() => e)}
						defaultValue={user?.role}
					>
						<Stack mt='xs'>
							<Radio color='teal' value='ADMIN' label='Admin' />
							<Radio color='orange' value='MODERATOR' label='Moderator' />
							<Radio color='yellow' value='CUSTOMER' label='Customer' />
						</Stack>
					</Radio.Group>
					<Space h={'md'} />
					<Group>
						<Button
							onClick={() =>
								accessMutate({
									variables: {
										input: {
											_id: user?._id,
											role: access,
										},
									},
								})
							}
							loading={access__loading}
							size='sm'
							color='teal'
						>
							Change access
						</Button>
					</Group>
				</div>
			</Modal>

			{/* users data table */}
			<DataTable
				columns={columns}
				data={data?.users?.nodes ?? []}
				refetch={handleRefetch}
				totalCount={data?.users?.meta?.totalCount ?? 100}
				RowActionMenu={(row: IUser) => (
					<>
						<Menu.Item
							onClick={() => {
								modalHandler.open();
								setUser(row);
							}}
							icon={<IconAccessible size={18} />}
							color='teal'
						>
							Manage Access
						</Menu.Item>
					</>
				)}
				ActionArea={
					<>
						<Button
							color='violet'
							variant='light'
							leftIcon={<IconPlus size={16} />}
							onClick={() =>
								setState({ modalOpened: true, operationType: 'create' })
							}
							size='sm'
						>
							Add new
						</Button>
					</>
				}
				loading={state.refetching}
			/>

			<EmptyPannel
				isShow={!data?.users?.nodes?.length && !fetching}
				title='There is no customers found!'
				Icon={<TbUsers size={40} color='red' />}
			/>

			<Space h={10} />

			<Drawer
				opened={state.modalOpened}
				onClose={() =>
					setState({
						modalOpened: false,
					})
				}
				size='md'
				title='Create a new user'
				position='right'
			>
				<form onSubmit={handleSubmit(onSubmitUserForm)}>
					<Input.Wrapper
						label='Name'
						size='md'
						error={<ErrorMessage name='name' errors={errors} />}
					>
						<Input {...register('name')} placeholder='Mehedi H. Rafiz' />
					</Input.Wrapper>

					<Space h={'sm'} />

					<Input.Wrapper
						label='Email'
						size='md'
						error={<ErrorMessage name='email' errors={errors} />}
					>
						<Input {...register('email')} placeholder='example@gmail.com' />
					</Input.Wrapper>

					<Space h={'sm'} />

					<Input.Wrapper
						label='Password'
						size='md'
						error={<ErrorMessage name='password' errors={errors} />}
					>
						<PasswordInput {...register('password')} placeholder='********' />
					</Input.Wrapper>

					<Space h={'sm'} />

					<Input.Wrapper
						label='Select Role'
						size='md'
						error={<ErrorMessage name='role' errors={errors} />}
					>
						<Select
							data={['ADMIN', 'MODERATOR', 'CUSTOMER']}
							defaultValue={'ADMIN'}
							onChange={(e) => setValue('role', e!)}
							placeholder='********'
						/>
					</Input.Wrapper>

					<Space h={'sm'} />

					<Button type='submit' loading={creating__user} color='teal' fullWidth>
						Create
					</Button>
				</form>
			</Drawer>
		</>
	);
};

export default UsersTable;

const getRoleBadgeColor = (role: string) => {
	switch (role) {
		case 'ADMIN':
			return 'teal';

		case 'CUSTOMER':
			return 'violet';

		case 'MODERATOR':
			return 'orange';

		default:
			break;
	}
};

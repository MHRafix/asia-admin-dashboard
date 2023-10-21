import { IPaginationMeta } from '@/app/api/models/CommonPagination.model';
import { IUser } from '@/app/api/models/users.model';
import {
	BULK_REMOVE_USER,
	USERS_QUERY,
} from '@/app/config/queries/users.query';
import EmptyPannel from '@/components/common/EmptyPannel';
import PageTitleArea from '@/components/common/PageTitleArea';
import DataTable from '@/components/common/Table/DataTable';
import { IState } from '@/pages/reception_management/attendance_activities';
import { useMutation, useQuery } from '@apollo/client';
import { Avatar, Button, Flex, Menu, Space, Text } from '@mantine/core';
import { useSetState } from '@mantine/hooks';
import { showNotification } from '@mantine/notifications';
import { IconPlus, IconTrash } from '@tabler/icons-react';
import { MRT_ColumnDef } from 'mantine-react-table';
import React, { useMemo } from 'react';
import { FiTrash } from 'react-icons/fi';
import { TbUsers } from 'react-icons/tb';

const CustomerTable: React.FC<{}> = () => {
	const [state, setState] = useSetState<IState>({
		modalOpened: false,
		operationType: 'create',
		operationId: null,
		operationPayload: {},
		refetching: false,
	});

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
		],
		[]
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

			{data?.users?.nodes?.length && (
				<DataTable
					columns={columns}
					data={data?.users?.nodes ?? []}
					refetch={handleRefetch}
					totalCount={data?.users?.meta?.totalCount ?? 100}
					RowActionMenu={(row: IUser) => (
						<>
							<Menu.Item
								onClick={() => {
									setState({
										modalOpened: true,
										operationId: row?._id,
									});
								}}
								icon={<IconTrash size={18} />}
								color='red'
							>
								Remove
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
			)}

			<EmptyPannel
				isShow={!data?.users?.nodes?.length && !fetching}
				title='There is no customers found!'
				Icon={<TbUsers size={40} color='red' />}
			/>

			<Space h={10} />
		</>
	);
};

export default CustomerTable;

import { IPaginationMeta } from '@/app/api/models/CommonPagination.model';
import { IUser } from '@/app/api/models/users.model';
import {
	BULK_REMOVE_USER,
	USERS_QUERY,
} from '@/app/config/queries/users.query';
import {
	TABLE_DATA_LIMITS,
	TABLE_DEFAULT_LIMIT,
} from '@/app/config/table_configuration';
import EmptyPannel from '@/components/common/EmptyPannel';
import CircularLoader from '@/components/common/Loader';
import PageTitleArea from '@/components/common/PageTitleArea';
import Pagination from '@/components/common/Pagination';
import { CUSTOMER_TABLE_HEAD } from '@/components/common/TABLE_HEAD';
import TableHead from '@/components/common/TableHead';
import { Query_Variable } from '@/logic/queryVariables';
import { useMutation, useQuery } from '@apollo/client';
import { Button, Select, Space, Table } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import Router, { useRouter } from 'next/router';
import React, { useState } from 'react';
import { FiTrash } from 'react-icons/fi';
import { TbUsers } from 'react-icons/tb';
import CustomersTableBody from './CustomersTableBody';

const CustomerTable: React.FC<{}> = () => {
	const [page, setPage] = useState<number>(1);
	const [limit, setLimit] = useState<number>(5);
	const [customerIds, setCustomerIds] = useState<string[]>([]);
	const router = useRouter();

	// get booking packages
	const {
		data: customers,
		loading: fetching,
		refetch,
	} = useQuery<{
		users: { nodes: IUser[]; meta: IPaginationMeta };
	}>(
		USERS_QUERY,
		Query_Variable(
			router.query.page as string,
			router.query.limit as string,
			page,
			limit
		)
	);

	// change booking limits
	const handleLimitChange = (limit: string) => {
		Router.replace({
			query: { ...Router.query, limit, page: 1 },
		});
		setLimit(parseInt(limit));
	};

	// remove bulk bookings
	const [bulkDeleteCustomer, { loading: bulkDeleting }] = useMutation(
		BULK_REMOVE_USER,
		{
			onCompleted: () => {
				refetch();
				setCustomerIds([]);
				showNotification({
					title: 'Customers bulk delete successfull!',
					color: 'red',
					icon: <FiTrash size={20} />,
					message: '',
				});
			},
		}
	);

	return (
		<>
			<PageTitleArea
				title='Our customers'
				tagline='Our solid customers'
				actionComponent={
					<div className='flex items-center gap-2'>
						<Button
							loading={bulkDeleting}
							disabled={!customerIds?.length}
							color='red'
							leftIcon={<FiTrash size={16} />}
							onClick={() =>
								bulkDeleteCustomer({
									variables: {
										uIds: customerIds,
									},
								})
							}
						>
							Bulk Remove
						</Button>
						<Select
							w={120}
							placeholder='Pick one'
							onChange={(value) => handleLimitChange(value!)}
							data={TABLE_DATA_LIMITS}
							defaultValue={TABLE_DEFAULT_LIMIT}
						/>
					</div>
				}
			/>

			<div className='bg-[#212231] shadow-lg rounded-md'>
				<Table>
					<thead>
						<tr>
							{CUSTOMER_TABLE_HEAD.map((head: string, idx: number) => (
								<TableHead key={idx} headData={head} />
							))}
						</tr>
					</thead>
					<tbody>
						{customers?.users?.nodes?.map((customer: IUser, idx: number) => (
							<CustomersTableBody
								key={idx}
								customer={customer}
								refetchUser={refetch}
								onStoreId={setCustomerIds}
							/>
						))}
					</tbody>
				</Table>

				<EmptyPannel
					isShow={!customers?.users?.nodes?.length && !fetching}
					title='There is no customers found!'
					Icon={<TbUsers size={40} color='red' />}
				/>
				<CircularLoader isShow={fetching} />
				<Pagination
					isShow={
						(customers?.users?.nodes?.length! as number) &&
						(!fetching as boolean)
					}
					limit={limit}
					onPageChange={setPage}
					page={page}
					meta={customers?.users?.meta!}
				/>
				<Space h={10} />
			</div>
		</>
	);
};

export default CustomerTable;

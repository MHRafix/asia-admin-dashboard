import { IPaginationMeta } from '@/app/api/models/CommonPagination.model';
import { IEmployees } from '@/app/api/models/employees.model';
import { Notify } from '@/app/config/alertNotification/Notification';
import {
	BULK_REMOVE_EMPLOYEE,
	EMPLOYEES_QUERY,
} from '@/app/config/queries/employees.query';
import {
	TABLE_DATA_LIMITS,
	TABLE_DEFAULT_LIMIT,
} from '@/app/config/table_configuration';
import EmptyPannel from '@/components/common/EmptyPannel';
import CircularLoader from '@/components/common/Loader';
import PageTitleArea from '@/components/common/PageTitleArea';
import Pagination from '@/components/common/Pagination';
import { EMPLOYEES_TABLE_HEAD } from '@/components/common/TABLE_HEAD';
import TableHead from '@/components/common/TableHead';
import { Query_Variable } from '@/logic/queryVariables';
import { useMutation, useQuery } from '@apollo/client';
import { Button, Select, Space, Table } from '@mantine/core';
import Router, { useRouter } from 'next/router';
import React, { useState } from 'react';
import { FiTrash } from 'react-icons/fi';
import { RiTeamLine } from 'react-icons/ri';
import EmployeesTableBody from './EmployeesTableBody';

const EmployeesTable: React.FC<{}> = () => {
	const [page, setPage] = useState<number>(1);
	const [limit, setLimit] = useState<number>(5);
	const [employeesIds, setEmployeesIds] = useState<string[]>([]);

	const router = useRouter();

	// get booking packages
	const {
		data: employeesData,
		loading: fetching,
		refetch,
	} = useQuery<{
		teams: { nodes: IEmployees[]; meta: IPaginationMeta };
	}>(
		EMPLOYEES_QUERY,
		Query_Variable(
			router.query.page as string,
			router.query.limit as string,
			page,
			limit,
			router.query.sort as string
		)
	);

	// change booking limits
	const handleLimitChange = (limit: string) => {
		Router.replace({
			query: { ...Router.query, limit, page: 1 },
		});
		setLimit(parseInt(limit));
	};

	const onSuccess = () => {
		refetch();
		setEmployeesIds([]);
	};

	// remove bulk employee
	const [bulkDeleteEmployee, { loading: bulkDeleting }] = useMutation(
		BULK_REMOVE_EMPLOYEE,
		Notify({
			sucTitle: 'Employee bulk delete successfully!',
			sucMessage: 'Please refetch employees.',
			errMessage: 'Please try again.',
			action: onSuccess,
		})
	);
	return (
		<>
			<PageTitleArea
				title='Employees'
				tagline='Our employees'
				currentPathName='Employee'
				othersPath={[
					{
						href: '/',
						pathName: 'Home',
					},
				]}
				actionComponent={
					<div className='flex items-center gap-2 mb-5'>
						<Button
							loading={bulkDeleting}
							disabled={!employeesIds?.length}
							color='red'
							leftIcon={<FiTrash size={16} />}
							onClick={() =>
								bulkDeleteEmployee({
									variables: { uIds: employeesIds },
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
							{EMPLOYEES_TABLE_HEAD?.map((head: string, idx: number) => (
								<TableHead key={idx} headData={head} />
							))}
						</tr>
					</thead>
					<tbody>
						{employeesData?.teams?.nodes?.map(
							(employee: IEmployees, idx: number) => (
								<EmployeesTableBody
									key={idx}
									employee={employee}
									refetchEmployee={refetch}
									onStoreId={setEmployeesIds}
								/>
							)
						)}
					</tbody>
				</Table>
				<EmptyPannel
					isShow={!employeesData?.teams?.nodes?.length && !fetching}
					title='There is no employees found!'
					Icon={<RiTeamLine size={40} color='red' />}
				/>
				<CircularLoader isShow={fetching} />
				<Pagination
					isShow={
						(employeesData?.teams?.nodes?.length! as number) &&
						(!fetching as boolean)
					}
					limit={limit}
					onPageChange={setPage}
					page={page}
					meta={employeesData?.teams?.meta!}
				/>

				<Space h={10} />
			</div>
		</>
	);
};

export default EmployeesTable;

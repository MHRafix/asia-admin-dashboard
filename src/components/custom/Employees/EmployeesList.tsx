import { IPaginationMeta } from '@/app/api/models/CommonPagination.model';
import { IEmployees } from '@/app/api/models/employees.model';
import { Notify } from '@/app/config/alertNotification/Notification';
import {
	BULK_REMOVE_EMPLOYEE,
	EMPLOYEES_QUERY,
} from '@/app/config/queries/employees.query';
import { BOOKING_TABLE_DEFAULT_SORTBY } from '@/app/config/table_configuration';
import EmptyPannel from '@/components/common/EmptyPannel';
import PageTitleArea from '@/components/common/PageTitleArea';
import { useMutation, useQuery } from '@apollo/client';
import { Button, Input, Space } from '@mantine/core';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { FiTrash } from 'react-icons/fi';
import { RiTeamLine } from 'react-icons/ri';
import EmployeeCard from './EmployeeCard';
import EmployeeCardSkeleton from './EmployeeCardSkeleton';

const EmployeesList: React.FC<{}> = () => {
	const [page, setPage] = useState<number>(1);
	const [limit, setLimit] = useState<number>(50);
	const [employeesIds, setEmployeesIds] = useState<string[]>([]);

	const router = useRouter();

	// get booking packages
	const {
		data: employeesData,
		loading: fetching,
		refetch,
	} = useQuery<{
		teams: { nodes: IEmployees[]; meta: IPaginationMeta };
	}>(EMPLOYEES_QUERY, {
		variables: {
			page: page,
			limit: limit,
			sortBy: BOOKING_TABLE_DEFAULT_SORTBY,
		},
	});

	const onSuccess = () => {
		refetch();
		setEmployeesIds([]);
	};

	// remove bulk employee
	const [bulkDeleteEmployee, { loading: bulkDeleting }] = useMutation(
		BULK_REMOVE_EMPLOYEE,
		Notify({
			sucTitle: 'Employee bulk delete successfully!',
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
						<Input
							icon={<FaSearch />}
							variant='unstyled'
							className='w-[300px] !border-[1px] !border-[#32344b] border-solid px-2 rounded-md'
							placeholder='Search employee...'
						/>
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
					</div>
				}
			/>

			<div className='shadow-lg rounded-md'>
				<div className='grid grid-cols-3 gap-3'>
					{employeesData?.teams?.nodes?.map((data: IEmployees, idx: number) => (
						<EmployeeCard key={idx} data={data} onRefetch={refetch} />
					))}
				</div>

				{fetching && (
					<div className='grid grid-cols-3 gap-3'>
						{new Array(12).fill(12).map((_, idx) => (
							<EmployeeCardSkeleton key={idx} />
						))}
					</div>
				)}

				<EmptyPannel
					isShow={!employeesData?.teams?.nodes?.length && !fetching}
					title='There is no employees found!'
					Icon={<RiTeamLine size={40} color='red' />}
				/>

				<Space h={10} />
			</div>
		</>
	);
};

export default EmployeesList;

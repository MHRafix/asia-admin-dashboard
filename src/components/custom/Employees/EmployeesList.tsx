import { IPaginationMeta } from '@/app/api/models/CommonPagination.model';
import { IEmployees } from '@/app/api/models/employees.model';
import { EMPLOYEES_QUERY } from '@/app/config/gql-queries/employees.query';
import { MatchOperator } from '@/app/config/gql-types';
import { BOOKING_TABLE_DEFAULT_SORTBY } from '@/app/config/table_configuration';
import EmptyPannel from '@/components/common/EmptyPannel';
import PageTitleArea from '@/components/common/PageTitleArea';
import { useQuery } from '@apollo/client';
import { Button, Drawer, Input, Space } from '@mantine/core';
import { useDebouncedState, useDisclosure } from '@mantine/hooks';
import { IconPlus } from '@tabler/icons-react';
import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { RiTeamLine } from 'react-icons/ri';
import EmployeeCard from './EmployeeCard';
import EmployeeCardSkeleton from './EmployeeCardSkeleton';
import EmployeeForm from './NewEmployee/EmployeeForm';

const EmployeesList: React.FC<{}> = () => {
	const [page] = useState<number>(1);
	const [limit] = useState<number>(50);
	const [searchKey, setSearchKey] = useDebouncedState('', 500);
	const [opened, handler] = useDisclosure();
	const [employee, setEmployee] = useState<IEmployees | null>(null);

	// get booking packages
	const {
		data: employeesData,
		loading: fetching,
		refetch,
	} = useQuery<{
		teams: { nodes: IEmployees[]; meta: IPaginationMeta };
	}>(EMPLOYEES_QUERY, {
		variables: {
			input: {
				page: page,
				limit: limit,
				sortBy: BOOKING_TABLE_DEFAULT_SORTBY,
			},
		},
	});

	useEffect(() => {
		if (searchKey) {
			refetch({
				input: {
					page: page,
					limit: limit,
					sortBy: BOOKING_TABLE_DEFAULT_SORTBY,
					where: {
						key: 'name',
						operator: MatchOperator.Contains,
						value: searchKey,
					},
				},
			});
		} else {
			refetch({
				input: {
					page: page,
					limit: limit,
					sortBy: BOOKING_TABLE_DEFAULT_SORTBY,
				},
			});
		}
	}, [searchKey]);

	// on success
	const onSuccess = () => {
		refetch();
		handler.close();
	};

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
					<div className='lg:flex grid items-center gap-2 mb-5'>
						<Input
							icon={<FaSearch />}
							variant='unstyled'
							className='lg:w-[300px] !border-[1px] !border-[#32344b] border-solid px-2 rounded-md'
							placeholder='Search employee...'
							onChange={(e) => setSearchKey(e.target.value)}
						/>
						<Button
							leftIcon={<IconPlus />}
							color='violet'
							variant='light'
							onClick={() => {
								handler.open();
								setEmployee(null);
							}}
						>
							Add new
						</Button>
					</div>
				}
			/>

			<div className='grid lg:grid-cols-3 gap-3 overflow-hidden'>
				{employeesData?.teams?.nodes?.map((data: IEmployees, idx: number) => (
					<EmployeeCard
						key={idx}
						data={data}
						onRefetch={refetch}
						onEdit={() => {
							setEmployee(data);
							handler.open();
						}}
					/>
				))}
			</div>

			{fetching && (
				<div className='grid lg:grid-cols-3 gap-3'>
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

			<Drawer
				opened={opened}
				onClose={handler.close}
				title='Employee create or update'
				size={'md'}
				position='right'
			>
				<EmployeeForm onSuccess={onSuccess} employee={employee!} />
			</Drawer>

			<Space h={10} />
		</>
	);
};

export default EmployeesList;

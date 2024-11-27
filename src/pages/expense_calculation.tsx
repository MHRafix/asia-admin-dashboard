import {
	IExpensesType,
	IExpensesWithPagination,
} from '@/app/api/models/expense.model';
import { Notify } from '@/app/config/alertNotification/Notification';
import protectWithSession from '@/app/config/authProtection/protectWithSession';
import {
	Expense_Remove_Mutation,
	Expenses_List_Query,
} from '@/app/config/gql-queries/expense.query';
import { MatchOperator } from '@/app/config/gql-types';
import PageTitleArea from '@/components/common/PageTitleArea';
import DataTable from '@/components/common/Table/DataTable';
import AdminLayout from '@/components/layouts/AdminLayout';
import { useMutation, useQuery } from '@apollo/client';
import { Button, Menu, Space, Text } from '@mantine/core';
import { useSetState } from '@mantine/hooks';
import { modals } from '@mantine/modals';
import { IconPencil, IconPlus, IconTrash } from '@tabler/icons-react';
import { MRT_ColumnDef } from 'mantine-react-table';
import { NextPage } from 'next';
import { useMemo } from 'react';
import { IState } from './reception_management/attendance_activities';

const ExpenseList: NextPage = () => {
	const [state, setState] = useSetState<IState>({
		modalOpened: false,
		operationType: 'create',
		operationId: null,
		operationPayload: {},
		refetching: false,
	});

	const {
		data: expenses,
		loading: fetching__expenses,
		refetch: isRefetching,
	} = useQuery<{
		expenseCalculationList: IExpensesWithPagination;
	}>(Expenses_List_Query);

	const handleRefetch = (variables: any) => {
		setState({ refetching: true, operationId: '', modalOpened: false });
		isRefetching(variables).finally(() => {
			setState({ refetching: false });
		});
	};

	const columns = useMemo<MRT_ColumnDef<any>[]>(
		() => [
			{
				accessorKey: 'title',
				header: 'Expense',
			},
			{
				accessorKey: 'description',
				header: 'Description',
			},
			{
				accessorKey: 'amount',
				header: 'Amount',
				accessorFn: (expense: IExpensesType) => {
					return (
						<Text className='!text-red-500 font-bold'>
							{expense?.amount || 0} BDT
						</Text>
					);
				},
			},
		],
		[]
	);

	// remove client data mutation
	const [removeExpense, { loading: removing }] = useMutation(
		Expense_Remove_Mutation,
		Notify({
			sucTitle: 'Expense removed successfully',
			action: () => isRefetching(),
		})
	);

	return (
		<AdminLayout title='Expense list'>
			<PageTitleArea
				title='Expenses Management'
				tagline='Organization expenses management'
				currentPathName='Expenses Management'
				othersPath={[
					{
						pathName: 'Home',
						href: '/',
					},
				]}
			/>

			<DataTable
				columns={columns}
				data={expenses?.expenseCalculationList?.nodes ?? []}
				refetch={handleRefetch}
				totalCount={expenses?.expenseCalculationList?.meta?.totalCount ?? 100}
				RowActionMenu={(row: IExpensesType) => (
					<>
						<Menu.Item
							icon={<IconPencil size={18} />}
							color='orange'
							onClick={() =>
								setState({
									modalOpened: true,
									operationType: 'update',
									operationPayload: row,
								})
							}
						>
							Edit
						</Menu.Item>
						<Menu.Item
							icon={<IconTrash size={18} />}
							color='red'
							onClick={() =>
								modals.openConfirmModal({
									title: 'Proceed to remove',
									children: (
										<Text size='sm'>
											Are you sure you want to delete your data?
										</Text>
									),
									labels: {
										cancel: 'Cencel',
										confirm: 'Yes',
									},
									onCancel: () => {},
									onConfirm: () =>
										removeExpense({
											variables: {
												payload: {
													key: '_id',
													operator: MatchOperator.Eq,
													value: row?._id,
												},
											},
										}),
								})
							}
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
				loading={state.refetching || removing || fetching__expenses}
			/>

			<Space h={30} />
		</AdminLayout>
	);
};

export default protectWithSession(ExpenseList);

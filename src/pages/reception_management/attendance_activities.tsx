import protectWithSession from '@/app/config/authProtection/protectWithSession';
import { MatchOperator } from '@/app/config/gql';
import { DELETE_APPOINTMENT_MUTATION } from '@/app/config/queries/appointments.query';
import DataTable from '@/components/common/Table/DataTable';
import { deleteConfirmModal } from '@/components/common/deleteConfirmModal';
import AdminLayout from '@/components/layouts/AdminLayout';
import { useMutation } from '@apollo/client';
import { Badge, Button, Menu } from '@mantine/core';
import { useSetState } from '@mantine/hooks';
import { IconPlus, IconTrash } from '@tabler/icons-react';
import dayjs from 'dayjs';
import { MRT_ColumnDef } from 'mantine-react-table';
import { NextPage } from 'next';
import { useMemo } from 'react';

interface IState {
	modalOpened: boolean;
	operationType: 'create' | 'update';
	operationId?: string | null;
	operationPayload?: any;
	refetching: boolean;
}

const AttendanceActivities: NextPage = () => {
	const [state, setState] = useSetState<IState>({
		modalOpened: false,
		operationType: 'create',
		operationId: null,
		operationPayload: {},
		refetching: false,
	});

	// const { data, loading, refetch } = useQuery<{
	// 	accounting__transactions: any;
	// }>(APPOINTMENTS_QUERY);

	// const { data: accountData, refetch: refetchAccounts } = useQuery<{
	// 	accounting__accounts: AccountsWithPagination;
	// }>(ACCOUNTS_LIST_DROPDOWN, {
	// 	variables: {
	// 		where: { limit: -1 },
	// 	},
	// });

	const [deleteMutation] = useMutation(DELETE_APPOINTMENT_MUTATION, {
		onCompleted: () => handleRefetch({}),
	});

	const handleRefetch = (variables: any) => {
		setState({ refetching: true });
		// refetch(variables).finally(() => {
		// 	setState({ refetching: false });
		// });
	};

	const handleDeleteAccount = (_id: string) => {
		deleteConfirmModal(deleteMutation, _id);
		//   title: "Sure to delete account?",
		//   description: "Be careful!! Once you deleted, it can not be undone",
		//   isDangerous: true,
		//   onConfirm() {
		// 	deleteAccountMutation({
		// 	  variables: {
		// 		where: { key: "_id", operator: MatchOperator.Eq, value: _id },
		// 	  },
		// 	});
		//   },
	};

	const columns = useMemo<MRT_ColumnDef<any>[]>(
		() => [
			{
				accessorFn: (row: any) =>
					`${row?.account?.name} [${row?.account?.referenceNumber}]`,
				header: 'Account',
			},
			{
				accessorKey: 'account.brunchName',
				header: 'Brunch Name',
			},
			{
				accessorKey: 'amount',
				header: 'Amount',
			},
			{
				accessorFn: (row: any) =>
					row?.type === 'DEBIT' ? (
						<Badge color='red'>Reduce Balance</Badge>
					) : (
						<Badge color='green'>Add Balance</Badge>
					),
				header: 'Type',
			},
			{
				accessorFn: (row: any) =>
					dayjs(row?.createdAt).format('MMMM D, YYYY h:mm A'),
				// filterVariant: "date-range",
				accessorKey: 'createdAt',
				header: 'Date',
			},
		],
		[]
	);
	return (
		<AdminLayout title='Attendance'>
			<DataTable
				columns={columns}
				data={[]}
				filters={[
					{
						key: 'source',
						operator: MatchOperator.Eq,
						value: 'Accounting_Transaction_Source.BalanceAdjustment',
					},
				]}
				refetch={handleRefetch}
				totalCount={100}
				RowActionMenu={(row: any) => (
					<>
						<Menu.Item
							onClick={() => handleDeleteAccount(row._id)}
							icon={<IconTrash size={18} />}
						>
							Delete
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
		</AdminLayout>
	);
};

export default protectWithSession(AttendanceActivities);

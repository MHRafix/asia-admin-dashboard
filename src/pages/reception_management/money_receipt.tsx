import {
	MoneyReceipt,
	MoneyReceiptsWithPagination,
} from '@/app/api/models/money-receipt.model';
import { Notify } from '@/app/config/alertNotification/Notification';
import protectWithSession from '@/app/config/authProtection/protectWithSession';
import {
	DELETE_MONEY_RECEIPT_MUTATION,
	Money_Receipt_Query,
} from '@/app/config/gql-queries/money-receipt.query';
import { MatchOperator } from '@/app/config/gql-types';
import DrawerWrapper from '@/components/common/Drawer/DrawerWrapper';
import PageTitleArea from '@/components/common/PageTitleArea';
import DataTable from '@/components/common/Table/DataTable';
import MoneyReceiptCreateForm from '@/components/custom/MoneyReceipts/MoneyReceiptCreateForm';
import MoneyReceiptDemo from '@/components/custom/MoneyReceipts/MoneyReceiptDemo';
import AdminLayout from '@/components/layouts/AdminLayout';
import { useMutation, useQuery } from '@apollo/client';
import { Avatar, Button, Flex, Menu, Text } from '@mantine/core';
import { useSetState } from '@mantine/hooks';
import { modals } from '@mantine/modals';
import {
	IconPencil,
	IconPlus,
	IconReceipt,
	IconTrash,
} from '@tabler/icons-react';
import dayjs from 'dayjs';
import { MRT_ColumnDef } from 'mantine-react-table';
import { NextPage } from 'next';
import { useMemo, useState } from 'react';

const MoneyReceiptPage: NextPage = () => {
	const [receipt, setReceipt] = useState<MoneyReceipt | null>();
	const [state, setState] = useSetState<any>({
		modalOpened: false,
		operationType: 'create',
		operationId: null,
		operationPayload: {},
		refetching: false,
	});

	// money receipt data api
	const {
		data,
		loading: money__receipts__loading,
		refetch,
	} = useQuery<{ moneyReceipts: MoneyReceiptsWithPagination }>(
		Money_Receipt_Query
	);

	// handle refetch data
	const handleRefetch = (variables: any) => {
		setState({ refetching: true, operationId: '', modalOpened: false });
		refetch(variables).finally(() => {
			setState({ refetching: false });
		});
	};

	// table column
	const columns = useMemo<MRT_ColumnDef<any>[]>(
		() => [
			{
				accessorKey: 'mrNo',
				header: 'MR No',
			},
			{
				accessorKey: 'clientName',
				header: 'Client name',
			},
			{
				accessorKey: 'contactNumber',
				header: 'Phone',
			},
			{
				accessorKey: 'serviceName',
				accessorFn: (originalRow: MoneyReceipt) => (
					<Text color='teal' fw={700}>
						{originalRow?.service?.title}
					</Text>
				),
				header: 'Service',
			},
			{
				accessorKey: 'passportNo',
				accessorFn: (originalRow: MoneyReceipt) => (
					<Text color='teal' fw={700}>
						{originalRow?.passportNo}
					</Text>
				),
				header: 'Passport No',
			},
			{
				accessorKey: 'paymentType',
				header: 'Payment Type',
			},

			{
				accessorKey: 'amountInNumber',
				accessorFn: (originalRow: MoneyReceipt) => (
					<Text className='p-2 rounded-sm text-violet-500 capitalize'>
						{originalRow?.amountInNumber ?? 0} BDT
					</Text>
				),
				header: 'Total amount',
			},
			{
				accessorKey: 'authorizeBy.name',
				accessorFn: (originalRow: MoneyReceipt) => (
					<Flex align={'center'} gap={10}>
						<Avatar
							src={originalRow?.authorizeBy?.avatar}
							size={'md'}
							radius={100}
						/>
						<Text fw={500}>{originalRow?.authorizeBy?.name}</Text>
					</Flex>
				),
				header: 'Authorize By',
			},

			{
				accessorFn: (row: MoneyReceipt) =>
					dayjs(row?.issueDate).format('MMMM D, YYYY h:mm A'),
				// filterVariant: "date-range",
				accessorKey: 'issueDate',
				header: 'Issue date',
			},
			{
				accessorFn: (row: MoneyReceipt) =>
					dayjs(row?.deliveryDate).format('MMMM D, YYYY h:mm A'),
				// filterVariant: "date-range",
				accessorKey: 'deliveryDate',
				header: 'Delivery date',
			},
		],
		[]
	);

	// delete receipt api
	const [deleteReceipt, { loading: deleting__receipt }] = useMutation(
		DELETE_MONEY_RECEIPT_MUTATION,
		Notify({
			sucTitle: 'Receipt deleted successfully!',
			action: () => {
				refetch();
			},
		})
	);

	return (
		<AdminLayout title='Money receipts'>
			<PageTitleArea
				title='Money receipt'
				tagline='Money receipt as payment prove'
			/>

			{/*  create, update & preview drawer */}
			<DrawerWrapper
				opened={state.modalOpened}
				size={state.operationType === 'demo' ? '75%' : 'md'}
				title={`Money receipt ${state.operationType}`}
				close={() => {
					setState({
						modalOpened: false,
					});
					setReceipt(null);
				}}
			>
				{state.operationType === 'demo' ? (
					<MoneyReceiptDemo receipt={receipt!} />
				) : (
					<MoneyReceiptCreateForm
						operationType={state.operationType}
						receipt={receipt!}
						refetch={refetch}
						prevReceipts={data?.moneyReceipts?.nodes!}
					/>
				)}
			</DrawerWrapper>

			<DataTable
				columns={columns}
				data={data?.moneyReceipts?.nodes ?? []}
				refetch={handleRefetch}
				totalCount={data?.moneyReceipts?.meta?.totalCount ?? 100}
				isExportPDF={false}
				RowActionMenu={(row: MoneyReceipt) => (
					<>
						<Menu.Item
							icon={<IconReceipt size={18} />}
							color='teal'
							onClick={() => {
								setState({
									modalOpened: true,
									operationType: 'demo',
								});
								setReceipt(row);
							}}
						>
							View Receipt
						</Menu.Item>
						<Menu.Item
							icon={<IconPencil size={18} />}
							color='orange'
							onClick={() => {
								setState({
									modalOpened: true,
									operationType: 'update',
								});
								setReceipt(row);
							}}
						>
							Edit Receipt
						</Menu.Item>
						<Menu.Item
							icon={<IconTrash size={18} />}
							color='red'
							onClick={() =>
								modals.openConfirmModal({
									title: 'Please confirm your action',
									children: (
										<Text size='sm'>Proceed to action that you want!</Text>
									),
									labels: { confirm: 'Confirm', cancel: 'Cancel' },
									onCancel: () => {},
									onConfirm: () =>
										deleteReceipt({
											variables: {
												input: {
													key: '_id',
													operator: MatchOperator.Eq,
													value: row?._id,
												},
											},
										}),
								})
							}
						>
							Remove Receipt
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
				loading={
					state.refetching || money__receipts__loading || deleting__receipt
				}
			/>
		</AdminLayout>
	);
};

export default protectWithSession(MoneyReceiptPage);

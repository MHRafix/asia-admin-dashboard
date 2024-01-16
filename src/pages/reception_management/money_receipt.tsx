import { Money_Receipt_Query } from '@/app/api/gql-api-hooks/money-receipt.query';
import {
	MoneyReceipt,
	MoneyReceiptsWithPagination,
} from '@/app/api/models/money-receipt.model';
import DrawerWrapper from '@/components/common/Drawer/DrawerWrapper';
import PageTitleArea from '@/components/common/PageTitleArea';
import DataTable from '@/components/common/Table/DataTable';
import MoneyReceiptDemo from '@/components/custom/MoneyReceipts/MoneyReceiptDemo';
import AdminLayout from '@/components/layouts/AdminLayout';
import { IState } from '@/pages/reception_management/attendance_activities';
import { useQuery } from '@apollo/client';
import { Avatar, Button, Flex, Menu, Text } from '@mantine/core';
import { useSetState } from '@mantine/hooks';
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
	const [state, setState] = useSetState<IState>({
		modalOpened: false,
		operationType: 'create',
		operationId: null,
		operationPayload: {},
		refetching: false,
	});
	const [receipt, setReceipt] = useState<MoneyReceipt | null>();

	const {
		data,
		loading: money__receipts__loading,
		refetch,
	} = useQuery<{ moneyReceipts: MoneyReceiptsWithPagination }>(
		Money_Receipt_Query
	);

	const handleRefetch = (variables: any) => {
		setState({ refetching: true, operationId: '', modalOpened: false });
		refetch(variables).finally(() => {
			setState({ refetching: false });
		});
	};
	// contactNumber
	// passportNo
	// paymentType
	// serviceName
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

	return (
		<AdminLayout title='Money receipts'>
			<PageTitleArea
				title='Money receipt'
				tagline='Money receipt as payment prove'
			/>

			<DrawerWrapper
				opened={state.modalOpened}
				size='75%'
				title='Money Receipt'
				close={() => {
					setState({
						modalOpened: false,
					});
					setReceipt(null);
				}}
			>
				<MoneyReceiptDemo receipt={receipt!} />
			</DrawerWrapper>

			{data?.moneyReceipts?.nodes?.length && (
				<DataTable
					columns={columns}
					data={data?.moneyReceipts?.nodes ?? []}
					refetch={handleRefetch}
					totalCount={data?.moneyReceipts?.meta?.totalCount ?? 100}
					RowActionMenu={(row: MoneyReceipt) => (
						<>
							<Menu.Item
								icon={<IconReceipt size={18} />}
								color='teal'
								onClick={() => {
									setState({
										modalOpened: true,
									});
									setReceipt(row);
								}}
							>
								View Receipt
							</Menu.Item>
							<Menu.Item icon={<IconPencil size={18} />} color='orange'>
								Edit Receipt
							</Menu.Item>
							<Menu.Item icon={<IconTrash size={18} />} color='red'>
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
					loading={state.refetching}
				/>
			)}

			{/* <AppSettingsForm /> */}
		</AdminLayout>
	);
};

export default MoneyReceiptPage;

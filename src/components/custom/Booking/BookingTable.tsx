import {
	BULK_REMOVE_BOOKING,
	DELETE_BOOKING_MUTATION,
	PACKAGE_BOOKINGS_QUERY,
	UPDATE_BOOKING_STATUS,
} from '@/app/config/queries/bookings.query';

import { IPaginationMeta } from '@/app/api/models/CommonPagination.model';
import {
	BOOKING_STATUS,
	IBooking,
	PAYMENT_STATUS,
	STATUS_ARR,
} from '@/app/api/models/bookings.model';
import {
	getBadgeColors,
	getPaymentBadgeColors,
} from '@/app/config/logic/getColors';
import EmptyPanel from '@/components/common/EmptyPanels/EmptyPanel';
import PageTitleArea from '@/components/common/PageTitleArea';
import DataTable from '@/components/common/Table/DataTable';
import { Query_Variable } from '@/logic/queryVariables';
import { IState } from '@/pages/reception_management/attendance_activities';
import { useMutation, useQuery } from '@apollo/client';
import {
	ActionIcon,
	Badge,
	Button,
	CopyButton,
	Flex,
	Menu,
	Text,
	Tooltip,
} from '@mantine/core';
import { useSetState } from '@mantine/hooks';
import { showNotification } from '@mantine/notifications';
import { IconPlus, IconTrash } from '@tabler/icons-react';
import { MRT_ColumnDef } from 'mantine-react-table';
import Router, { useRouter } from 'next/router';
import React, { useMemo, useState } from 'react';
import { BiCopy } from 'react-icons/bi';
import { FaCheck } from 'react-icons/fa';
import { FiTrash } from 'react-icons/fi';
import TrackPackagePopover from './TrackPackagePopover';

const BookingTable: React.FC<{}> = () => {
	const router = useRouter();
	const [page, setPage] = useState<number>(1);
	const [limit, setLimit] = useState<number>(5);
	const [bookingIds, setBookingIds] = useState<string[]>([]);

	const [state, setState] = useSetState<IState>({
		modalOpened: false,
		operationType: 'create',
		operationId: null,
		operationPayload: {},
		refetching: false,
		status: BOOKING_STATUS.PENDING,
	});
	// const [status, setStatus] = useState<string>(booking?.status!);

	// get booking packages
	const {
		data: bookings,
		loading: fetching,
		refetch,
	} = useQuery<{
		bookings: { nodes: IBooking[]; meta: IPaginationMeta };
	}>(
		PACKAGE_BOOKINGS_QUERY,
		Query_Variable(
			router.query.page as string,
			router.query.limit as string,
			page,
			limit,
			router.query.sort as string
		)
	);

	// delete booking
	const [deleteBooking, { loading: deletingBooking }] = useMutation(
		DELETE_BOOKING_MUTATION,
		{
			onCompleted: () => {
				// refetchBooking();
				showNotification({
					title: 'Booking successfully deleted!',
					color: 'red',
					icon: <FiTrash size={20} />,
					message: '',
				});
			},
		}
	);

	// update booking
	const [updateBooking, { loading: updatingBooking }] = useMutation(
		UPDATE_BOOKING_STATUS,
		{
			onCompleted: () => {
				// refetchBooking();
				showNotification({
					title: 'Booking successfully updated!',
					color: 'teal',
					message: '',
				});
			},
		}
	);
	// const handleUpdateAttendee = (
	// 	_id: string,
	// 	status: BOOKING_STATUS,
	// 	note: string
	// ) => {
	// 	updateMutation({
	// 		variables: {
	// 			input: {
	// 				_id,
	// 				status,
	// 				verifyBy: user?._id,
	// 				note,
	// 			},
	// 		},
	// 	});
	// };

	const handleRefetch = (variables: any) => {
		setState({ refetching: true, operationId: '', modalOpened: false });
		refetch(variables).finally(() => {
			setState({ refetching: false });
		});
	};

	const columns = useMemo<MRT_ColumnDef<any>[]>(
		() => [
			{
				accessorKey: 'customerDetails.name',
				accessorFn: (originalRow: IBooking) => (
					<Flex align={'center'} gap={10}>
						<Text fw={500}>{originalRow?.customerDetails?.name}</Text>
					</Flex>
				),
				header: 'Name',
			},
			{
				accessorKey: 'transactionId',
				accessorFn: (originalRow: IBooking) => (
					<div className='flex gap-2 items-center'>
						{originalRow?.transactionId}
						<CopyButton value={originalRow?.transactionId!} timeout={2000}>
							{({ copied, copy }) => (
								<Tooltip
									label={copied ? 'Copied' : 'Copy'}
									withArrow
									position='right'
								>
									<ActionIcon color={copied ? 'teal' : 'gray'} onClick={copy}>
										{copied ? <FaCheck size='1rem' /> : <BiCopy size='1rem' />}
									</ActionIcon>
								</Tooltip>
							)}
						</CopyButton>
					</div>
				),
				header: 'Transaction ID',
			},
			{
				accessorKey: 'paymentDetails.paymentStatus',
				accessorFn: (row: IBooking) => (
					<Badge
						color={getPaymentBadgeColors(row?.paymentDetails?.paymentStatus!)}
						size='lg'
						fw={500}
						variant='dot'
						radius='sm'
					>
						{row?.paymentDetails?.paymentStatus}
					</Badge>
				),
				header: 'Status',
			},
			{
				accessorKey: 'packageId',
				accessorFn: (originalRow: IBooking) => (
					<TrackPackagePopover packageId={originalRow?.packageId!} />
				),
				header: 'Track',
			},
			{
				accessorKey: 'packageId',
				accessorFn: (originalRow: IBooking) => (
					<Menu>
						<Menu.Target>
							<Badge
								color={getBadgeColors(originalRow?.status!)}
								size='lg'
								fw={500}
								variant='filled'
								radius='sm'
							>
								{originalRow?.status}
							</Badge>
						</Menu.Target>

						<Menu.Dropdown className='!bg-[#1D1E2B]'>
							{STATUS_ARR.map((STATUS: string, idx: number) => (
								<Menu.Item
									key={idx}
									disabled={status === STATUS}
									color={getBadgeColors(STATUS)}
									onClick={() => {
										updateBooking({
											variables: {
												id: originalRow._id,
												status: STATUS,
												paymentDetails: {
													paymentStatus: PAYMENT_STATUS[idx],
													totalAmount: originalRow?.paymentDetails?.totalAmount,
												},
											},
										});
									}}
								>
									<Text ml={15} size={'md'} fw={500}>
										{STATUS}
									</Text>
								</Menu.Item>
							))}
						</Menu.Dropdown>
					</Menu>
				),
				header: 'Track',
			},
		],
		[]
	);

	// change booking limits
	const handleLimitChange = (limit: string) => {
		Router.replace({
			query: { ...Router.query, limit, page: 1 },
		});
		setLimit(parseInt(limit));
	};

	// remove bulk bookings
	const [bulkDeleteBooking, { loading: bulkDeleting }] = useMutation(
		BULK_REMOVE_BOOKING,
		{
			variables: {
				uIds: bookingIds,
			},

			onCompleted: () => {
				refetch();
				setBookingIds([]);
				showNotification({
					title: 'Bookings bulk delete successful!',
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
				title='Package Bookings'
				tagline='Booked travel packages'
				currentPathName='Package Bookings'
				othersPath={[
					{
						pathName: 'Home',
						href: '/',
					},
				]}
			/>

			{bookings?.bookings?.nodes?.length && (
				<DataTable
					columns={columns}
					data={bookings?.bookings?.nodes ?? []}
					refetch={handleRefetch}
					totalCount={bookings?.bookings?.meta?.totalCount ?? 100}
					RowActionMenu={(row: IBooking) => (
						<>
							<Menu.Item
								// onClick={() => handleDeleteAttendance(row._id)}
								icon={<IconTrash size={18} />}
								color='red'
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
			)}
			<EmptyPanel
				isShow={!bookings?.bookings?.nodes?.length && !fetching}
				title='Oops sorry, No bookings found!'
				imgPath='/emptyPanel.png'
			/>
		</>
	);
};

export default BookingTable;

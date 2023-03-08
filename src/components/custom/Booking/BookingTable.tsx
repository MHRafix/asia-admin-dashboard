import {
	BOOKING_TABLE_DATA_SORTBY,
	BOOKING_TABLE_DEFAULT_SORTBY,
	TABLE_DATA_LIMITS,
	TABLE_DEFAULT_LIMIT,
} from '@/app/config/configuration';
import {
	BULK_REMOVE_BOOKING,
	PACAKGE_BOOKINGS_QUERY,
} from '@/app/config/gql-query';
import { IBooking } from '@/app/models/bookings.model';
import { IPaginationMeta } from '@/app/models/CommonPagination.model';
import EmptyPannel from '@/components/common/EmptyPannel';
import CircularLoader from '@/components/common/Loader';
import PageTitleArea from '@/components/common/PageTitleArea';
import Pagination from '@/components/common/Pagination';
import TableHead from '@/components/common/TableHead';
import { BOOKING_TABLE_HEAD } from '@/components/common/TABLE_HEAD';
import { Query_Variable } from '@/logic/queryVariables';
import { useMutation, useQuery } from '@apollo/client';
import { Button, Select, Space, Table } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import Router, { useRouter } from 'next/router';
import React, { useState } from 'react';
import { FiTrash } from 'react-icons/fi';
import { TbCalendarTime } from 'react-icons/tb';
import BookingTableBody from './BookingTableBody';

const BookingTable: React.FC<{}> = () => {
	const [page, setPage] = useState<number>(1);
	const [limit, setLimit] = useState<number>(5);
	const [bookingIds, setBookingIds] = useState<string[]>([]);

	const router = useRouter();

	// get booking packages
	const {
		data: bookings,
		loading: fetching,
		refetch,
	} = useQuery<{
		bookings: { nodes: IBooking[]; meta: IPaginationMeta };
	}>(
		PACAKGE_BOOKINGS_QUERY,
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

	const handleSortChange = (sortBy: string) => {
		Router.replace({
			query: { ...Router.query, sort: sortBy },
		});
		// setLimit(parseInt(limit));
		console.log(sortBy);
	};

	// remove bulk bookings
	const [bulkDeleteBooking, { loading: bulkDeleting }] = useMutation(
		BULK_REMOVE_BOOKING,
		{
			onCompleted: () => {
				refetch();
				showNotification({
					title: 'Bookings bulk delete successfull!',
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
				actionComponent={
					<div className='flex items-center gap-2'>
						<Button
							loading={bulkDeleting}
							disabled={!bookingIds?.length}
							color='red'
							leftIcon={<FiTrash size={16} />}
							onClick={() => bulkDeleteBooking()}
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
						<Select
							w={120}
							placeholder='Pick one'
							onChange={(value) => handleSortChange(value!)}
							data={BOOKING_TABLE_DATA_SORTBY}
							defaultValue={BOOKING_TABLE_DEFAULT_SORTBY}
						/>
						<TbCalendarTime size={20} />
						<span className='text-dimmed'>{'12 Feb, 23'}</span>
					</div>
				}
			/>

			<div className='bg-[#212231] shadow-lg rounded-md'>
				<Table>
					<thead>
						<tr>
							{BOOKING_TABLE_HEAD?.map((head: string, idx: number) => (
								<TableHead key={idx} headData={head} />
							))}
						</tr>
					</thead>
					<tbody>
						{bookings?.bookings?.nodes?.map(
							(booking: IBooking, idx: number) => (
								<BookingTableBody
									key={idx}
									booking={booking}
									refetchBooking={refetch}
									onStoreId={setBookingIds}
								/>
							)
						)}
					</tbody>
				</Table>
				<EmptyPannel
					isShow={!bookings?.bookings?.nodes?.length && !fetching}
					title='There is no bookings found!'
				/>
				<CircularLoader isShow={fetching} />
				<Pagination
					isShow={
						(bookings?.bookings?.nodes?.length! as number) &&
						(!fetching as boolean)
					}
					limit={limit}
					onPageChange={setPage}
					page={page}
					meta={bookings?.bookings?.meta!}
				/>

				<Space h={10} />
			</div>
		</>
	);
};

export default BookingTable;

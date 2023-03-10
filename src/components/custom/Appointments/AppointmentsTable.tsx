import {
	APPOINTMENTS_TABLE_DATA_SORTBY,
	APPOINTMENTS_TABLE_DEFAULT_SORTBY,
	TABLE_DATA_LIMITS,
	TABLE_DEFAULT_LIMIT,
} from '@/app/config/configuration';
import { APPOINTMENTS_QUERY } from '@/app/config/queries/appointments.query';
import { IAppointment } from '@/app/models/appointment.model';
import { IPaginationMeta } from '@/app/models/CommonPagination.model';
import EmptyPannel from '@/components/common/EmptyPannel';
import CircularLoader from '@/components/common/Loader';
import PageTitleArea from '@/components/common/PageTitleArea';
import Pagination from '@/components/common/Pagination';
import TableHead from '@/components/common/TableHead';
import { APPOINTMENT_TABLE_HEAD } from '@/components/common/TABLE_HEAD';
import { Query_Variable } from '@/logic/queryVariables';
import { useQuery } from '@apollo/client';
import { Button, Select, Space, Table } from '@mantine/core';
import Router, { useRouter } from 'next/router';
import React, { useState } from 'react';
import { BsBookmarkCheck } from 'react-icons/bs';
import { FiTrash } from 'react-icons/fi';
import { SiGotomeeting } from 'react-icons/si';
import { TbCalendarTime } from 'react-icons/tb';
import AppointmentsTableBody from './AppointmentsTableBody';

const AppointmentsTable: React.FC<{}> = () => {
	const [page, setPage] = useState<number>(1);
	const [limit, setLimit] = useState<number>(5);
	const [appointmentIds, setAppointmentIds] = useState<string[]>([]);

	const router = useRouter();

	// get booking packages
	const {
		data: appointmentsData,
		loading: fetching,
		refetch,
	} = useQuery<{
		appointments: { nodes: IAppointment[]; meta: IPaginationMeta };
	}>(
		APPOINTMENTS_QUERY,
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
	};

	// remove bulk bookings
	// const [bulkDeleteBooking, { loading: bulkDeleting }] = useMutation(
	// 	BULK_REMOVE_BOOKING,
	// 	{
	// 		variables: {
	// 			uIds: bookingIds,
	// 		},

	// 		onCompleted: () => {
	// 			refetch();
	// 			showNotification({
	// 				title: 'Bookings bulk delete successfull!',
	// 				color: 'red',
	// 				icon: <FiTrash size={20} />,
	// 				message: '',
	// 			});
	// 		},
	// 	}
	// );

	return (
		<>
			<PageTitleArea
				title='Appointments'
				tagline='Booked appointments'
				actionComponent={
					<div className='flex items-center gap-2'>
						<Button
							// loading={bulkDeleting}
							disabled={!appointmentIds?.length}
							color='red'
							leftIcon={<FiTrash size={16} />}
							// onClick={() => bulkDeleteBooking()}
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
							data={APPOINTMENTS_TABLE_DATA_SORTBY}
							defaultValue={APPOINTMENTS_TABLE_DEFAULT_SORTBY}
						/>
						<TbCalendarTime size={20} />
						<span className='text-dimmed'>{new Date().toDateString()}</span>
					</div>
				}
			/>

			<div className='bg-[#212231] shadow-lg rounded-md'>
				<Table>
					<thead>
						<tr>
							{APPOINTMENT_TABLE_HEAD?.map((head: string, idx: number) => (
								<TableHead key={idx} headData={head} />
							))}
						</tr>
					</thead>
					<tbody>
						{appointmentsData?.appointments?.nodes?.map(
							(appointment: IAppointment, idx: number) => (
								<AppointmentsTableBody
									key={idx}
									appointment={appointment}
									refetchAppointment={refetch}
									onStoreId={setAppointmentIds}
								/>
							)
						)}
					</tbody>
				</Table>
				<EmptyPannel
					isShow={!appointmentsData?.appointments?.nodes?.length && !fetching}
					title='There is no appointments found!'
					Icon={<SiGotomeeting size={40} color='red' />}
				/>
				<CircularLoader isShow={fetching} />
				<Pagination
					isShow={
						(appointmentsData?.appointments?.nodes?.length! as number) &&
						(!fetching as boolean)
					}
					limit={limit}
					onPageChange={setPage}
					page={page}
					meta={appointmentsData?.appointments?.meta!}
				/>

				<Space h={10} />
			</div>
		</>
	);
};

export default AppointmentsTable;

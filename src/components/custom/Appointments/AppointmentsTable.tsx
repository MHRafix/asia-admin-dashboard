import { IPaginationMeta } from '@/app/api/models/CommonPagination.model';
import { IAppointment } from '@/app/api/models/appointment.model';
import { Notify } from '@/app/config/alertNotification/Notification';
import {
	APPOINTMENTS_QUERY,
	BULK_REMOVE_APPOINTMENT,
} from '@/app/config/queries/appointments.query';
import {
	APPOINTMENTS_TABLE_DATA_SORTBY,
	APPOINTMENTS_TABLE_DEFAULT_SORTBY,
	TABLE_DATA_LIMITS,
	TABLE_DEFAULT_LIMIT,
} from '@/app/config/table_configuration';
import EmptyPannel from '@/components/common/EmptyPannel';
import CircularLoader from '@/components/common/Loader';
import PageTitleArea from '@/components/common/PageTitleArea';
import Pagination from '@/components/common/Pagination';
import { APPOINTMENT_TABLE_HEAD } from '@/components/common/TABLE_HEAD';
import TableHead from '@/components/common/TableHead';
import { Query_Variable } from '@/logic/queryVariables';
import { useMutation, useQuery } from '@apollo/client';
import { Button, Select, Space, Table } from '@mantine/core';
import Router, { useRouter } from 'next/router';
import React, { useState } from 'react';
import { FiTrash } from 'react-icons/fi';
import { SiGotomeeting } from 'react-icons/si';
import AppointmentsTableBody from './AppointmentsTableBody';

const AppointmentsTable: React.FC<{}> = () => {
	const [page, setPage] = useState<number>(1);
	const [limit, setLimit] = useState<number>(5);
	const [appointmentIds, setAppointmentIds] = useState<string[]>([]);

	const { query } = useRouter();

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
			query.page as string,
			query.limit as string,
			page,
			limit,
			query.sort as string
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

	const onSuccess = () => {
		refetch();
	};

	// remove bulk bookings
	const [bulkDeleteBooking, { loading: bulkDeleting }] = useMutation(
		BULK_REMOVE_APPOINTMENT,
		Notify({
			sucTitle: 'Appointments bulk delete successfull!',
			sucMessage: 'Please refetch appointments.',
			errMessage: 'Please try again.',
			action: onSuccess,
		})
	);

	return (
		<>
			<PageTitleArea
				title='Appointments'
				tagline='Booked appointments'
				actionComponent={
					<div className='flex items-center gap-2'>
						<Button
							loading={bulkDeleting}
							disabled={!appointmentIds?.length}
							color='red'
							leftIcon={<FiTrash size={16} />}
							onClick={() =>
								bulkDeleteBooking({
									variables: {
										uIds: appointmentIds,
									},
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
							defaultValue={
								(query.limit as string)
									? (query.limit as string)
									: TABLE_DEFAULT_LIMIT
							}
						/>
						<Select
							w={120}
							placeholder='Pick one'
							onChange={(value) => handleSortChange(value!)}
							data={APPOINTMENTS_TABLE_DATA_SORTBY}
							defaultValue={APPOINTMENTS_TABLE_DEFAULT_SORTBY}
						/>
					</div>
				}
				currentPathName='Appointments'
				othersPath={[
					{
						pathName: 'Home',
						href: '/',
					},
				]}
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

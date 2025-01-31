import { IPaginationMeta } from '@/app/api/models/CommonPagination.model';
import { IAppointment } from '@/app/api/models/appointment.model';
import { Notify } from '@/app/config/alertNotification/Notification';
import {
	APPOINTMENTS_QUERY,
	DELETE_APPOINTMENT_MUTATION,
} from '@/app/config/gql-queries/appointments.query';
import { MatchOperator } from '@/app/config/gql-types';
import { getBadgeColors } from '@/app/config/logic/getColors';
import DrawerWrapper from '@/components/common/Drawer/DrawerWrapper';
import PageTitleArea from '@/components/common/PageTitleArea';
import DataTable from '@/components/common/Table/DataTable';
import { useMutation, useQuery } from '@apollo/client';
import { Badge, Menu, Text } from '@mantine/core';
import { useSetState } from '@mantine/hooks';
import { modals } from '@mantine/modals';
import { IconMessage, IconTrash } from '@tabler/icons-react';
import dayjs from 'dayjs';
import { MRT_ColumnDef } from 'mantine-react-table';
import React, { useMemo } from 'react';
import ReplyDrawer from './ReplyDrawer';

const AppointmentsTable: React.FC<{}> = () => {
	const [state, setState] = useSetState<any>({
		modalOpened: false,
		operationType: 'create',
		operationId: null,
		operationPayload: {},
		refetching: false,
		appointment: null,
	});

	// get booking packages
	const {
		data,
		loading: fetching,
		refetch,
	} = useQuery<{
		appointments: { nodes: IAppointment[]; meta: IPaginationMeta };
	}>(APPOINTMENTS_QUERY, {
		variables: {},
	});

	// handle refetch
	const handleRefetch = (variables: any) => {
		setState({ refetching: true, operationId: '', modalOpened: false });
		refetch(variables).finally(() => {
			setState({ refetching: false });
		});
	};

	// table columns
	const columns = useMemo<MRT_ColumnDef<any>[]>(
		() => [
			{
				accessorKey: 'name',
				header: 'Name',
			},
			{
				accessorKey: 'email',
				header: 'Email',
			},
			{
				accessorKey: 'phone',
				header: 'Phone',
			},
			{
				accessorKey: 'status',
				accessorFn: (originalRow: IAppointment) => (
					<Badge
						color={getBadgeColors(originalRow?.status!)}
						size='lg'
						fw={500}
						variant='dot'
						radius='sm'
					>
						{originalRow?.status}
					</Badge>
				),
				header: 'Status',
			},
			{
				accessorKey: 'subService',
				header: 'Sub Service',
			},
			{
				accessorFn: (originalRow: IAppointment) =>
					dayjs(originalRow?.createdAt ?? new Date()).format('MMMM D, YYYY'),
				// filterVariant: "date-range",
				accessorKey: 'createdAt',
				header: 'Created at',
			},
		],
		[]
	);

	// delete appointment api
	const [deleteAppointment, { loading: deleting__receipt }] = useMutation(
		DELETE_APPOINTMENT_MUTATION,
		Notify({
			sucTitle: 'Appointment deleted successfully!',
			action: () => {
				refetch();
			},
		})
	);

	return (
		<>
			<PageTitleArea
				title='Appointments'
				tagline='Booked appointments'
				currentPathName='Appointments'
				othersPath={[
					{
						pathName: 'Home',
						href: '/',
					},
				]}
			/>
			{/*  create, & reply drawer */}
			<DrawerWrapper
				opened={state.modalOpened}
				size={state.operationType === 'reply' ? '50%' : 'lg'}
				title={`Appointment ${state.operationType}`}
				close={() => {
					setState({
						modalOpened: false,
						appointment: null,
					});
				}}
			>
				{state.operationType === 'answer' ? (
					<ReplyDrawer
						clientQuestions={state?.appointment?.clientQuestions}
						onClose={() => {
							refetch();
							setState({ modalOpened: false });
						}}
						_id={state?.appointment?._id}
						name={state?.appointment?.name}
						email={state?.appointment?.email}
					/>
				) : // <MoneyReceiptCreateForm
				// 	operationType={state.operationType}
				// 	receipt={receipt!}
				// 	refetch={refetch}
				// />
				null}
			</DrawerWrapper>
			<DataTable
				columns={columns}
				data={data?.appointments?.nodes ?? []}
				refetch={handleRefetch}
				totalCount={data?.appointments?.meta?.totalCount ?? 100}
				isExportPDF={false}
				RowActionMenu={(row: IAppointment) => (
					<>
						<Menu.Item
							icon={<IconMessage size={18} />}
							color='teal'
							onClick={() =>
								setState({
									operationType: 'answer',
									modalOpened: true,
									appointment: row,
								})
							}
						>
							View & Answer
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
										deleteAppointment({
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
							Remove
						</Menu.Item>
					</>
				)}
				// ActionArea={
				// 	<>
				// 		<Button
				// 			color='violet'
				// 			variant='light'
				// 			leftIcon={<IconPlus size={16} />}
				// 			onClick={() =>
				// 				setState({ modalOpened: true, operationType: 'create' })
				// 			}
				// 			size='sm'
				// 		>
				// 			Add new
				// 		</Button>
				// 	</>
				// }
				loading={state.refetching}
			/>{' '}
		</>
	);
};

export default AppointmentsTable;

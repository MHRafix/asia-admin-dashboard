// import { IAttendance } from '@/app/api/models/attendance.model';
// import { IMeta } from '@/app/api/models/common.model';
// import { Notify } from '@/app/config/alertNotification/Notification';
// import protectWithSession from '@/app/config/authProtection/protectWithSession';
// import { Attendance_Status } from '@/app/config/gql';
// import { getAttendanceStatusColor } from '@/app/config/logic/getColors';
// import { useGetSession } from '@/app/config/logic/getSession';
// import { DELETE_APPOINTMENT_MUTATION } from '@/app/config/gql-queries/appointments.query';
// import {
// 	GET_ATTENDANCES_QUERY,
// 	UPDATE_ATTENDANCE_MUTATION,
// } from '@/app/config/gql-queries/attendance.query';
// import EmptyPanel from '@/components/common/EmptyPanels/EmptyPanel';
// import PageTitleArea from '@/components/common/PageTitleArea';
// import DataTable from '@/components/common/Table/DataTable';
// import AdminLayout from '@/components/layouts/AdminLayout';
// import { useMutation, useQuery } from '@apollo/client';
// import {
// 	Avatar,
// 	Badge,
// 	Button,
// 	Drawer,
// 	Flex,
// 	Input,
// 	Menu,
// 	Space,
// 	Text,
// 	Textarea,
// } from '@mantine/core';
// import { useSetState } from '@mantine/hooks';
// import { IconPlus, IconTrash } from '@tabler/icons-react';
// import dayjs from 'dayjs';
// import { MRT_ColumnDef } from 'mantine-react-table';
// import { NextPage } from 'next';
// import { useMemo, useState } from 'react';

// const AttendanceActivities: NextPage = () => {
// 	const { user } = useGetSession();
// 	const [reportTxt, setReportTxt] = useState<string>('');

// 	const [state, setState] = useSetState<IState>({
// 		modalOpened: false,
// 		operationType: 'create',
// 		operationId: null,
// 		operationPayload: {},
// 		refetching: false,
// 		status: Attendance_Status.PENDING,
// 	});

// 	const {
// 		data,
// 		loading: fetching__attendance,
// 		refetch,
// 	} = useQuery<{
// 		Attendances: {
// 			nodes: IAttendance[];
// 			meta: IMeta;
// 		};
// 	}>(GET_ATTENDANCES_QUERY, {
// 		variables: {
// 			input: {
// 				sort: 'DESC',
// 				sortBy: '_id',
// 			},
// 		},
// 	});

// 	const [deleteMutation] = useMutation(DELETE_APPOINTMENT_MUTATION, {
// 		onCompleted: () => handleRefetch({}),
// 	});

// 	const [updateMutation, { loading: updating }] = useMutation(
// 		UPDATE_ATTENDANCE_MUTATION,
// 		Notify({
// 			sucTitle: 'Updated successfully!',
// 			action: () => handleRefetch({}),
// 		})
// 	);

// 	const handleUpdateAttendee = (
// 		_id: string,
// 		status: Attendance_Status,
// 		note: string
// 	) => {
// 		updateMutation({
// 			variables: {
// 				input: {
// 					_id,
// 					status,
// 					verifyBy: user?._id,
// 					note,
// 				},
// 			},
// 		});
// 	};

// 	const handleRefetch = (variables: any) => {
// 		setState({ refetching: true, operationId: '', modalOpened: false });
// 		refetch(variables).finally(() => {
// 			setState({ refetching: false });
// 		});
// 	};

// 	const columns = useMemo<MRT_ColumnDef<any>[]>(
// 		() => [
// 			{
// 				accessorKey: 'attendee.name',
// 				accessorFn: (originalRow: IAttendance) => (
// 					<Flex align={'center'} gap={10}>
// 						<Avatar
// 							src={originalRow?.attendee?.avatar}
// 							size={'md'}
// 							radius={100}
// 						/>
// 						<Text fw={500}>{originalRow?.attendee?.name}</Text>
// 					</Flex>
// 				),
// 				header: 'Attendee Name',
// 			},
// 			{
// 				accessorKey: 'verifyBy.name',
// 				accessorFn: (originalRow: IAttendance) => (
// 					<Flex align={'center'} gap={5}>
// 						<Avatar
// 							size={'md'}
// 							radius={100}
// 							src={originalRow?.verifyBy?.avatar}
// 						/>
// 						<Text fw={500}>{originalRow?.verifyBy?.name}</Text>
// 					</Flex>
// 				),
// 				header: 'Verified by',
// 			},
// 			{
// 				accessorKey: 'status',
// 				accessorFn: (row: IAttendance) => (
// 					<Menu>
// 						<Menu.Target>
// 							<Badge
// 								color={getAttendanceStatusColor(
// 									row?.status as Attendance_Status
// 								)}
// 								variant='outline'
// 							>
// 								{row.status}
// 							</Badge>
// 						</Menu.Target>
// 						<Menu.Dropdown>
// 							<Menu.Item
// 								color='yellow'
// 								disabled={row.status === Attendance_Status.PENDING}
// 								onClick={() =>
// 									handleUpdateAttendee(
// 										row?._id,
// 										Attendance_Status.PENDING,
// 										row?.note
// 									)
// 								}
// 							>
// 								{Attendance_Status.PENDING}
// 							</Menu.Item>
// 							<Menu.Item
// 								color='teal'
// 								disabled={row.status === Attendance_Status.VERIFIED}
// 								onClick={() =>
// 									handleUpdateAttendee(
// 										row?._id,
// 										Attendance_Status.VERIFIED,
// 										row?.note
// 									)
// 								}
// 							>
// 								{Attendance_Status.VERIFIED}
// 							</Menu.Item>
// 							<Menu.Item
// 								color='red'
// 								disabled={row.status === Attendance_Status.NOT_PRESENT}
// 								onClick={() =>
// 									handleUpdateAttendee(
// 										row?._id,
// 										Attendance_Status.NOT_PRESENT,
// 										row?.note
// 									)
// 								}
// 							>
// 								{Attendance_Status.NOT_PRESENT}
// 							</Menu.Item>
// 						</Menu.Dropdown>
// 					</Menu>
// 				),
// 				header: 'Status',
// 			},
// 			{
// 				accessorFn: (row: IAttendance) =>
// 					dayjs(row?.createdAt).format('MMMM D, YYYY h:mm A'),
// 				// filterVariant: "date-range",
// 				accessorKey: 'createdAt',
// 				header: 'Attendance time',
// 			},
// 			{
// 				accessorKey: 'note',
// 				accessorFn: (originalRow: IAttendance) => (
// 					<Text className='p-2 rounded-sm text-violet-500 capitalize'>
// 						{originalRow?.note}
// 					</Text>
// 				),
// 				header: 'Report note',
// 			},
// 		],
// 		[]
// 	);
// 	return (
// 		<AdminLayout title='Employees Attendance'>
// 			<PageTitleArea
// 				title='Attendances'
// 				tagline='Track attendances of employees'
// 				currentPathName='Attendances'
// 				othersPath={[
// 					{
// 						pathName: 'Home',
// 						href: '/',
// 					},
// 				]}
// 			/>

// 			<Space h={30} />

// 			{/* <FunctionalComponentWithFunctionalComponentToPrint> */}
// 			<DataTable
// 				columns={columns}
// 				data={data?.Attendances?.nodes ?? []}
// 				refetch={handleRefetch}
// 				totalCount={data?.Attendances?.meta?.totalCount ?? 100}
// 				RowActionMenu={(row: IAttendance) => (
// 					<>
// 						<Menu.Item
// 							onClick={() => {
// 								setReportTxt(row?.note);
// 								setState({
// 									modalOpened: true,
// 									operationId: row?._id,
// 									status: row?.status as Attendance_Status,
// 								});
// 							}}
// 							icon={<IconTrash size={18} />}
// 							color='yellow'
// 						>
// 							Report on Attendee
// 						</Menu.Item>
// 					</>
// 				)}
// 				ActionArea={
// 					<>
// 						<Button
// 							color='violet'
// 							variant='light'
// 							leftIcon={<IconPlus size={16} />}
// 							onClick={() =>
// 								setState({ modalOpened: true, operationType: 'create' })
// 							}
// 							size='sm'
// 						>
// 							Add new
// 						</Button>
// 					</>
// 				}
// 				loading={state.refetching}
// 			/>

// 			<Drawer
// 				opened={state.modalOpened}
// 				onClose={() => setState({ modalOpened: false })}
// 				position='right'
// 			>
// 				<form
// 					onSubmit={(e) => {
// 						e.preventDefault();
// 						handleUpdateAttendee(state?.operationId!, state.status!, reportTxt);
// 					}}
// 				>
// 					<Input.Wrapper label='Describe report'>
// 						<Textarea
// 							onChange={(txt) => setReportTxt(txt.target.value)}
// 							defaultValue={reportTxt}
// 							placeholder='Describe your report...'
// 						/>
// 					</Input.Wrapper>
// 					<Space h='md' />

// 					<Button type='submit' loading={updating} fullWidth color='teal'>
// 						Save Report
// 					</Button>
// 				</form>
// 			</Drawer>

// 			<EmptyPanel
// 				imgPath='/attendance.png'
// 				title='There is no attendance found!'
// 				isShow={!data?.Attendances?.nodes?.length && !fetching__attendance}
// 			/>
// 		</AdminLayout>
// 	);
// };

// export default protectWithSession(AttendanceActivities);
export interface IState {
	modalOpened: boolean;
	operationType: 'create' | 'update' | null;
	operationId?: string | null;
	operationPayload?: any;
	refetching: boolean;
	status?: any;
}

import protectWithSession from '@/app/config/authProtection/protectWithSession';
import AdminLayout from '@/components/layouts/AdminLayout';
import { NextPage } from 'next';

const AttendanceActivities: NextPage = () => {
	return (
		<AdminLayout title='Attendance list'>
			Attendance system temporarily off
		</AdminLayout>
	);
};

export default protectWithSession(AttendanceActivities);

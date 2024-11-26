import { ClientWithPagination, IClient } from '@/app/api/models/client.model';
import { Notify } from '@/app/config/alertNotification/Notification';
import protectWithSession from '@/app/config/authProtection/protectWithSession';
import {
	GET_CLIENTS_QUERY,
	Remove_Client_Data,
} from '@/app/config/gql-queries/clientsData.query';
import { MatchOperator } from '@/app/config/gql-types';
import EmptyPanel from '@/components/common/EmptyPanels/EmptyPanel';
import PageTitleArea from '@/components/common/PageTitleArea';
import DataTable from '@/components/common/Table/DataTable';
import ClientDataForm from '@/components/custom/ClientData/ClientDataForm';
import AdminLayout from '@/components/layouts/AdminLayout';
import { useMutation, useQuery } from '@apollo/client';
import { Button, Drawer, Menu, Space, Text } from '@mantine/core';
import { useSetState } from '@mantine/hooks';
import { modals } from '@mantine/modals';
import { IconPencil, IconPlus, IconTrash } from '@tabler/icons-react';
import { MRT_ColumnDef } from 'mantine-react-table';
import { useMemo } from 'react';
import { IState } from './attendance_activities';

const BusinessData = () => {
	const [state, setState] = useSetState<IState>({
		modalOpened: false,
		operationType: 'create',
		operationId: null,
		operationPayload: {},
		refetching: false,
	});

	const {
		data: clients,
		loading: fetching__clients,
		refetch: isRefetching,
	} = useQuery<{
		Clients: ClientWithPagination;
	}>(GET_CLIENTS_QUERY);

	const handleRefetch = (variables: any) => {
		setState({ refetching: true, operationId: '', modalOpened: false });
		isRefetching(variables).finally(() => {
			setState({ refetching: false });
		});
	};

	const columns = useMemo<MRT_ColumnDef<any>[]>(
		() => [
			{
				accessorKey: 'name',
				header: 'Client Name',
			},
			{
				accessorKey: 'email',
				header: 'Email',
			},
			{
				accessorKey: 'phone',
				header: 'Phone Number',
			},
		],
		[]
	);

	// remove client data mutation
	const [removeClientData, { loading: removing }] = useMutation(
		Remove_Client_Data,
		Notify({
			sucTitle: 'Client data removed',
			action: () => isRefetching(),
		})
	);

	return (
		<AdminLayout>
			<PageTitleArea
				title='Clients contact list'
				tagline='Client business data'
				currentPathName='Client list'
				othersPath={[
					{
						pathName: 'Home',
						href: '/',
					},
				]}
			/>

			<Drawer
				opened={state.modalOpened}
				position='right'
				onClose={() =>
					setState({
						modalOpened: false,
					})
				}
				title='Add new client'
				size='md'
			>
				<ClientDataForm
					onSuccess={() => {
						isRefetching();
						setState({
							modalOpened: false,
						});
					}}
					operationType={state.operationType}
					operationPayload={state.operationPayload}
				/>
			</Drawer>

			<Space h={30} />

			<DataTable
				columns={columns}
				data={clients?.Clients?.nodes ?? []}
				refetch={handleRefetch}
				totalCount={clients?.Clients?.meta?.totalCount ?? 100}
				RowActionMenu={(row: IClient) => (
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
										removeClientData({
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
				loading={state.refetching || removing}
			/>

			<Space h={30} />

			<EmptyPanel
				imgPath='/clientsData.png'
				isShow={!clients?.Clients?.nodes?.length && !fetching__clients}
				title='There is no clients data found!'
			/>
		</AdminLayout>
	);
};

export default protectWithSession(BusinessData);

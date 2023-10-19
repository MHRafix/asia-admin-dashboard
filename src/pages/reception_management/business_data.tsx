import { ClientWithPagination, IClient } from '@/app/api/models/client.model';
import protectWithSession from '@/app/config/authProtection/protectWithSession';
import { GET_CLIENTS_QUERY } from '@/app/config/queries/clientsData.query';
import EmptyPanel from '@/components/common/EmptyPanels/EmptyPanel';
import PageTitleArea from '@/components/common/PageTitleArea';
import DataTable from '@/components/common/Table/DataTable';
import AdminLayout from '@/components/layouts/AdminLayout';
import { useQuery } from '@apollo/client';
import { Anchor, Button, Menu, Space } from '@mantine/core';
import { useSetState } from '@mantine/hooks';
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
		refetch: reFetching__clients,
	} = useQuery<{
		Clients: ClientWithPagination;
	}>(GET_CLIENTS_QUERY);

	const handleRefetch = (variables: any) => {
		setState({ refetching: true, operationId: '', modalOpened: false });
		reFetching__clients(variables).finally(() => {
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
			{
				accessorKey: 'address',
				header: 'Address',
			},
			{
				accessorKey: 'facebook',
				accessorFn: (originalRow: IClient) => (
					<Anchor
						target='_blank'
						href={`https://facebook.com/${originalRow?.facebook}`}
						color='teal'
					>
						Visit Facebook
					</Anchor>
				),
				header: 'Facebook url',
			},
		],
		[]
	);

	return (
		<AdminLayout>
			<PageTitleArea
				title='Clients contact list'
				tagline='Track contact details of clients'
				currentPathName='Clients list'
				othersPath={[
					{
						pathName: 'Home',
						href: '/',
					},
				]}
			/>

			<Space h={30} />

			{clients?.Clients?.nodes?.length && (
				<DataTable
					columns={columns}
					data={clients?.Clients?.nodes ?? []}
					// filters={[
					// 	{
					// 		key: 'source',
					// 		operator: MatchOperator.Eq,
					// 		value: 'Accounting_Transaction_Source.BalanceAdjustment',
					// 	},
					// ]}
					refetch={handleRefetch}
					totalCount={clients?.Clients?.meta?.totalCount ?? 100}
					RowActionMenu={(row: IClient) => (
						<>
							{/* <Menu.Item
							onClick={() => handleDeleteAttendance(row._id)}
							icon={<IconTrash size={18} />}
							color='red'
						>
							Delete
						</Menu.Item> */}
							<Menu.Item icon={<IconPencil size={18} />} color='orange'>
								Edit
							</Menu.Item>
							<Menu.Item icon={<IconTrash size={18} />} color='red'>
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
					loading={state.refetching}
				/>
			)}

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

import { IAttendance } from '@/app/api/models/attendance.model';
import { IMeta } from '@/app/api/models/common.model';
import { Notify } from '@/app/config/alertNotification/Notification';
import { useGetSession } from '@/app/config/logic/getSession';
import { signOut } from '@/app/config/logic/signOut';
import {
	CHECK_IS_ELIGIBLE_FOR_ATTENDANCE,
	CREATE_ATTENDANCE_MUTATION,
} from '@/app/config/queries/attendance.query';
import { useMutation, useQuery } from '@apollo/client';
import {
	Avatar,
	Button,
	Group,
	Menu,
	Text,
	Tooltip,
	UnstyledButton,
} from '@mantine/core';
import { openConfirmModal } from '@mantine/modals';
import dayjs from 'dayjs';
import Link from 'next/link';
import React, { useRef } from 'react';
import { BsGear } from 'react-icons/bs';
import { FiLogOut, FiTrash } from 'react-icons/fi';
import { MdChevronRight } from 'react-icons/md';
export const UserButton: React.FC = () => {
	const { loading, user } = useGetSession();
	const ref = useRef();

	const { data, refetch } = useQuery<{
		Attendances: {
			nodes: IAttendance[];
			meta: IMeta;
		};
	}>(CHECK_IS_ELIGIBLE_FOR_ATTENDANCE, {
		variables: {
			input: {
				limit: 1,
				sort: 'DESC',
				sortBy: 'createdAt',
				where: [
					{
						key: 'attendee',
						operator: 'eq',
						value: user?._id,
					},
				],
			},
		},
	});

	const [createAttendance, { loading: creating }] = useMutation(
		CREATE_ATTENDANCE_MUTATION,
		Notify({
			sucTitle: 'Attendance request sent successfully!',
			sucMessage: "You'll notified after approved.",
			action: () => refetch(),
		})
	);

	return (
		<Group position='center' bg={'#262736'}>
			<Menu withArrow>
				<Menu.Target>
					<UnstyledButton
						// @ts-ignore
						ref={ref}
						sx={(theme) => ({
							display: 'block',
							width: '100%',
							padding: theme.spacing.md,
							color:
								theme.colorScheme === 'dark'
									? theme.colors.dark[0]
									: theme.black,

							'&:hover': {
								backgroundColor: '#25262B',
							},
						})}
						// {...others}
					>
						<Group>
							<Avatar src={user?.avatar} radius='xl' />

							<div style={{ flex: 1 }}>
								<Text size='sm' weight={500}>
									{user?.name}
								</Text>

								<Text color='dimmed' size='xs'>
									{user?.email}
								</Text>
							</div>

							{<MdChevronRight size='1rem' />}
						</Group>
					</UnstyledButton>
				</Menu.Target>
				<Menu.Dropdown py={10} bg={'#262736'} className='!text-center'>
					<Menu.Label fz={19} ff={'Nunito sans, sans-serif'}>
						{user?.name}
					</Menu.Label>

					<Tooltip label={'Attendance can only be eligible once a day.'}>
						<Button
							color='teal'
							radius={100}
							my={10}
							disabled={
								dayjs(data?.Attendances?.nodes?.[0]?.createdAt!).format(
									'MMMM D, YYYY'
								) === dayjs(new Date()).format('MMMM D, YYYY')
							}
							loading={creating}
							onClick={() =>
								createAttendance({
									variables: {
										input: {
											attendee: user?._id,
										},
									},
								})
							}
						>
							Attendance Request
						</Button>
					</Tooltip>

					<Link
						href={'/settings/my-profile/update-profile'}
						className='!no-underline'
					>
						<Menu.Item
							icon={<BsGear size={18} />}
							// color='violet'
							fz={16}
							ff={'Nunito sans, sans-serif'}
						>
							Profile settings
						</Menu.Item>
					</Link>
					<Menu.Item
						icon={<FiLogOut size={16} />}
						ff={'Nunito sans, sans-serif'}
						fz={16}
						// color='violet'
						onClick={() =>
							openConfirmModal({
								title: 'Confirm your logout action',
								// centered: true,
								children: (
									<Text size='sm'>Are you sure you want to logout.</Text>
								),
								labels: {
									confirm: 'Logout',
									cancel: 'No, Let me logged in',
								},
								confirmProps: { color: 'red' },
								onCancel: () => {},
								onConfirm: () => signOut(),
							})
						}
					>
						Logout
					</Menu.Item>
					<Menu.Item
						ff={'Nunito sans, sans-serif'}
						fz={16}
						color='red'
						icon={<FiTrash size={16} />}
						onClick={() =>
							openConfirmModal({
								title: 'Confirm your delete account action',
								// centered: true,
								children: (
									<Text size='sm'>
										Are you sure you want to delete account ?
									</Text>
								),
								labels: {
									confirm: 'Delete Account',
									cancel: 'No',
								},
								confirmProps: { color: 'red' },
								onCancel: () => {},
								onConfirm: () => {},
							})
						}
					>
						Delete my account
					</Menu.Item>
				</Menu.Dropdown>
			</Menu>
		</Group>
	);
};

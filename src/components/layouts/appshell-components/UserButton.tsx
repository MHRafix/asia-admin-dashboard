import { useGetSession } from '@/app/config/logic/getSession';
import { signOut } from '@/app/config/logic/signOut';
import { Avatar, Group, Menu, Text, UnstyledButton } from '@mantine/core';
import { openConfirmModal } from '@mantine/modals';
import Link from 'next/link';
import React, { useRef } from 'react';
import { BsGear } from 'react-icons/bs';
import { FiLogOut, FiTrash } from 'react-icons/fi';
import { MdChevronRight } from 'react-icons/md';
export const UserButton: React.FC = () => {
	const { loading, user } = useGetSession();
	const ref = useRef();
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
				<Menu.Dropdown py={10} bg={'#262736'}>
					<Menu.Label fz={19} ff={'Nunito sans, sans-serif'}>
						{user?.name}
					</Menu.Label>
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
					>
						Delete my account
					</Menu.Item>
				</Menu.Dropdown>
			</Menu>
		</Group>
	);
};

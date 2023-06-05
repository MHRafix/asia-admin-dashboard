import { useGetSession } from '@/app/config/logic/getSession';
import { Group, Menu, Text, UnstyledButton } from '@mantine/core';
import Link from 'next/link';
import React, { useRef } from 'react';
import { BiNotification } from 'react-icons/bi';
import {
	MdChevronRight,
	MdOutlineNotifications,
	MdOutlineNotificationsActive,
} from 'react-icons/md';

export const NotificationButton: React.FC = () => {
	const { loading, user } = useGetSession();
	const ref = useRef();
	return (
		<Group position='center'>
			<Menu withArrow>
				<Menu.Target>
					<UnstyledButton
						// @ts-ignore
						ref={ref}
						sx={(theme) => ({
							display: 'block',
							width: '100%',
							padding: '10px',
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
							{/* <Avatar src={user?.avatar} radius='xl' /> */}

							<MdOutlineNotifications size={20} />
							<Text size='md' weight={500} ff={'Nunito sans, sans-serif'}>
								Notifications
							</Text>

							{<MdChevronRight size='1rem' />}
						</Group>
					</UnstyledButton>
				</Menu.Target>
				<Menu.Dropdown py={10} bg={'#262736'}>
					<Link
						href={'/settings/app_notification/new_notification'}
						className='!no-underline'
					>
						<Menu.Item
							icon={<BiNotification size={18} />}
							// color='violet'
							fz={16}
							ff={'Nunito sans, sans-serif'}
						>
							New notifications
						</Menu.Item>
					</Link>
					<Link
						href={'/settings/app_info/opening_hours'}
						className='!no-underline'
					>
						<Menu.Item
							icon={<MdOutlineNotificationsActive size={18} />}
							// color='violet'
							fz={16}
							ff={'Nunito sans, sans-serif'}
						>
							All Notifications
						</Menu.Item>
					</Link>
				</Menu.Dropdown>
			</Menu>
		</Group>
	);
};

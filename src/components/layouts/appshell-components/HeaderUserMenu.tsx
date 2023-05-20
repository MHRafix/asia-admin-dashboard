import { useGetSession } from '@/app/config/logic/getSession';
import { signOut } from '@/app/config/logic/signOut';
import { Avatar, Menu, Text } from '@mantine/core';
import { openConfirmModal } from '@mantine/modals';
import Link from 'next/link';

const HeaderUserMenu = () => {
	const { loading, user } = useGetSession();
	return (
		<Menu shadow='md' width={200}>
			<Menu.Target>
				<Avatar color='cyan'>{user?.name.slice(0, 1)}</Avatar>
			</Menu.Target>

			<Menu.Dropdown>
				<Menu.Label>{user?.email}</Menu.Label>
				<Link href={'/settings'} className='!no-underline'>
					<Menu.Item>Settings</Menu.Item>
				</Link>
				<Menu.Item
					onClick={() =>
						openConfirmModal({
							title: 'Confirm your logout action',
							// centered: true,
							children: <Text size='sm'>Are you sure you want to logout.</Text>,
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
			</Menu.Dropdown>
		</Menu>
	);
};

export default HeaderUserMenu;

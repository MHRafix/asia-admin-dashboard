import {
	ActionIcon,
	Navbar,
	NavLink,
	ScrollArea,
	Space,
	Text,
} from '@mantine/core';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { MenuButton } from './MenuButton';
import { menus } from './menus';
import { NotificationButton } from './NotificationButton';
import { UserButton } from './UserButton';

interface Props {
	opened: boolean;
	setOpened: (state: boolean) => void;
}

const AdminMenu: React.FC<Props> = ({ opened, setOpened }) => {
	const { pathname } = useRouter();

	return (
		<Navbar
			hiddenBreakpoint='sm'
			hidden={!opened}
			width={{ sm: 200, lg: 250 }}
			style={{ background: '#212231', zIndex: 100000000 }}
		>
			{' '}
			<Navbar.Section>
				<div>
					<Image src='/logo.png' alt='Logo' width={130} height={52} />
				</div>
			</Navbar.Section>
			<Space h={20} />
			{opened && (
				<div className='p-3 ml-auto'>
					<ActionIcon size='lg' color='red' onClick={() => setOpened(false)}>
						✖
					</ActionIcon>
				</div>
			)}
			<Navbar.Section grow component={ScrollArea}>
				{menus.map((item) => (
					<NavLink
						style={{
							fontFamily: 'Nunito sans, sans-serif',
							borderLeft:
								pathname.includes(item.href) && pathname === item.href
									? '4px solid #5d34d8'
									: 0,
						}}
						fz={20}
						key={item.label}
						icon={item.icon}
						label={
							<Text size='md' weight={500} ff={'Nunito sans, sans-serif'}>
								{item.label}
							</Text>
						}
						component={Link}
						href={item.href}
						active={pathname === item.href}
						styles={(theme) => ({
							// theme.colors.brand[9]
							root: {
								fontWeight: pathname.includes(item.href) ? 600 : 400,
								fontFamily: 'Nunito sans, sans-serif',
								fontSize: 20,
							},
						})}
					/>
				))}

				<MenuButton />
				<NotificationButton />
			</Navbar.Section>
			<Space h={20} />
			<Navbar.Section>
				<UserButton />
			</Navbar.Section>
		</Navbar>
	);
};

export default AdminMenu;

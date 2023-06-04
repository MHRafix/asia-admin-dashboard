import { ActionIcon, Navbar, NavLink, ScrollArea, Space } from '@mantine/core';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { menus } from './menus';
import { UserButton } from './UserButton';

interface Props {
	opened: boolean;
	setOpened: (state: boolean) => void;
}

const AdminMenu: React.FC<Props> = ({ opened, setOpened }) => {
	const { query, asPath, pathname } = useRouter();

	return (
		<Navbar
			hiddenBreakpoint='sm'
			hidden={!opened}
			width={{ sm: 200, lg: 250 }}
			style={{ background: '#212231', zIndex: 100000000 }}
			pb={20}
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
						key={item.label}
						label={item.label}
						component={Link}
						href={item.href}
						active={pathname === item.href}
						styles={(theme) => ({
							// theme.colors.brand[9]
							root: {
								fontWeight: pathname.includes(item.href) ? 600 : 400,
								fontFamily: 'Nunito sans, sans-serif',
							},
						})}
					/>
				))}
			</Navbar.Section>
			<Space h={20} />
			<Navbar.Section>
				<UserButton />
			</Navbar.Section>
		</Navbar>
	);
};

export default AdminMenu;

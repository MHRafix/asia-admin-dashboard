import {
	ActionIcon,
	Navbar,
	NavLink,
	ScrollArea,
	Space,
	Text,
} from '@mantine/core';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { menus } from './menus';
import { NotificationButton } from './NotificationButton';
import { SettingsMenuButton } from './SettingsMenuButton';
import { UserButton } from './UserButton';

interface Props {
	opened: boolean;
	setOpened: (state: boolean) => void;
}

const AdminMenu: React.FC<Props> = ({ opened, setOpened }) => {
	const { pathname, asPath } = useRouter();

	return (
		<Navbar
			hiddenBreakpoint='sm'
			hidden={!opened}
			width={{ sm: 200, lg: 250 }}
			style={{ background: '#212231', zIndex: 100000000 }}
		>
			{' '}
			<Navbar.Section>
				<div className='flex items-center justify-center'>
					{/* <Image src='/logo.png' alt='Logo' width={130} height={52} /> */}
					<Text fz={35} ff={'Nunito sans, sans-serif'} fw={700} color='violet'>
						Asia tours
					</Text>
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
								asPath.includes(item.href) && asPath === item.href
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
						disabled={
							item?.href === '/rating_&&_reviews' ||
							item?.href === '/expenses_calculation'
						}
						active={asPath === item.href}
						styles={(theme) => ({
							// theme.colors.brand[9]
							root: {
								fontWeight: asPath.includes(item.href) ? 600 : 400,
								fontFamily: 'Nunito sans, sans-serif',
								fontSize: 20,
							},
						})}
					/>
				))}

				<NotificationButton />
				<SettingsMenuButton />
			</Navbar.Section>
			<Space h={20} />
			<Navbar.Section>
				<UserButton />
			</Navbar.Section>
		</Navbar>
	);
};

export default AdminMenu;

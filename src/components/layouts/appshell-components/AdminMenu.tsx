import { ActionIcon, Navbar, NavLink } from '@mantine/core';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { menus } from './menus';

interface Props {
	opened: boolean;
	setOpened: (state: boolean) => void;
	style: string;
	width: any;
	height: number;
}

const AdminMenu: React.FC<Props> = ({ opened, setOpened }) => {
	const { query, asPath } = useRouter();

	const getNavIdentifier = (path: string, hasId: boolean) => {
		if (!hasId) {
			return path;
		}

		const pathArray = path.split('/');
		const item = pathArray[pathArray.length - 1];
		return item;
	};
	return (
		<div className=''>
			<Navbar
				hiddenBreakpoint='sm'
				hidden={!opened}
				width={{ sm: 200, lg: 300 }}
				style={{ background: '#212231', zIndex: 100000000 }}
				py={20}
			>
				{opened && (
					<div className='p-3 ml-auto'>
						<ActionIcon size='lg' color='red' onClick={() => setOpened(false)}>
							✖
						</ActionIcon>
					</div>
				)}
				<Navbar.Section>
					{menus.map((menu) => (
						<NavLink
							styles={{
								label: {
									color: 'white',
								},
								// root:{background: "#1D1E2C"}
							}}
							active={getNavIdentifier(asPath, Boolean(query.id)) === menu.href}
							key={menu.label}
							label={menu.label}
							icon={menu?.icon}
							component={Link}
							href={menu.href}
						/>
					))}
				</Navbar.Section>
			</Navbar>
		</div>
	);
};

export default AdminMenu;

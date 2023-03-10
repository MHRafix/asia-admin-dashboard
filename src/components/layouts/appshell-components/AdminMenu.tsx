import { Navbar, NavLink } from '@mantine/core';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { menus } from './menus';

interface Props {
	opened: boolean;
	style: string;
	width: any;
	height: number;
}

const AdminMenu: React.FC<Props> = ({ opened, style, width, height }) => {
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
				p='md'
				hiddenBreakpoint='sm'
				hidden={!opened}
				width={{ sm: 200, lg: 300, ...width }}
				style={{ background: '#212231' }}
				// height={ { sm: 100, lg:500}}
			>
				<Navbar.Section mt='xs'>
					{menus.map((menu) => (
						<NavLink
							// style={{ background: "#1D1E2C" }}
							styles={{
								label: {
									// background: "#1D1E2C",
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

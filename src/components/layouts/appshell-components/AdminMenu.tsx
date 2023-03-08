import { Navbar, NavLink } from '@mantine/core';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { BsBookmarkCheck } from 'react-icons/bs';
import { FaRegChartBar } from 'react-icons/fa';
import { HiOutlineViewGrid } from 'react-icons/hi';
import { RiApps2Line } from 'react-icons/ri';
import { TbSettings, TbUsers } from 'react-icons/tb';

const data = [
	{
		label: 'Dashboard',
		icon: <HiOutlineViewGrid size={20} />,
		href: '/',
	},
	{
		label: 'Bookings',
		icon: <BsBookmarkCheck size={20} />,
		href: '/bookings',
	},
	{
		label: 'Customers',
		icon: <TbUsers size={20} />,
		href: '/customers',
	},
	{
		label: 'Reports',
		icon: <FaRegChartBar size={20} />,
		href: '/reports',
	},
	{
		label: 'Apps',
		icon: <RiApps2Line size={20} />,
		href: '/apps',
	},
	{
		label: 'Settings',
		icon: <TbSettings size={20} />,
		href: '/settings',
	},
];

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
					{data.map((item) => (
						<NavLink
							// style={{ background: "#1D1E2C" }}
							styles={{
								label: {
									// background: "#1D1E2C",
									color: 'white',
								},
								// root:{background: "#1D1E2C"}
							}}
							active={getNavIdentifier(asPath, Boolean(query.id)) === item.href}
							key={item.label}
							label={item.label}
							icon={item?.icon}
							component={Link}
							href={item.href}
						/>
					))}
				</Navbar.Section>
			</Navbar>
		</div>
	);
};

export default AdminMenu;

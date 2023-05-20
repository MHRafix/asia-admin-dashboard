import { BsBookmarkCheck } from 'react-icons/bs';
import { FaRegChartBar } from 'react-icons/fa';
import { HiOutlineViewGrid } from 'react-icons/hi';
import { RiTeamLine } from 'react-icons/ri';
import { SiGotomeeting } from 'react-icons/si';
import { TbSettings, TbUsers } from 'react-icons/tb';
import { TiPlaneOutline } from 'react-icons/ti';

export const menus = [
	{
		label: 'Dashboard',
		icon: <FaRegChartBar size={25} />,
		href: '/dashboard',
	},
	{
		label: 'Bookings',
		icon: <BsBookmarkCheck size={25} />,
		href: '/bookings',
	},
	{
		label: 'Customers',
		icon: <TbUsers size={25} />,
		href: '/customers',
	},
	{
		label: 'Services',
		icon: <HiOutlineViewGrid size={25} />,
		href: '/services',
	},
	{
		label: 'Tour Packages',
		icon: <TiPlaneOutline size={25} />,
		href: '/tour_packages',
	},
	{
		label: 'Appointments',
		icon: <SiGotomeeting size={25} />,
		href: '/appointments',
	},
	{
		label: 'Employees',
		icon: <RiTeamLine size={25} />,
		href: '/employees',
	},
	{
		label: 'Settings',
		icon: <TbSettings size={25} />,
		href: '/settings',
	},
];

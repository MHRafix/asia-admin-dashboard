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
		icon: <FaRegChartBar size={20} />,
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
		label: 'Services',
		icon: <HiOutlineViewGrid size={20} />,
		href: '/services',
	},
	{
		label: 'Tour Packages',
		icon: <TiPlaneOutline size={20} />,
		href: '/tour_packages',
	},
	{
		label: 'Appointments',
		icon: <SiGotomeeting size={20} />,
		href: '/appointments',
	},
	{
		label: 'Employees',
		icon: <RiTeamLine size={20} />,
		href: '/employees',
	},
	{
		label: 'Settings',
		icon: <TbSettings size={20} />,
		href: '/settings',
	},
];

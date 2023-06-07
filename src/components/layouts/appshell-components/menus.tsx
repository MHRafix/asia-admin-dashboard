import { BsBookmarkCheck, BsUiChecksGrid } from 'react-icons/bs';
import { FaRegChartBar } from 'react-icons/fa';
// import { LuListChecks } from 'react-icons/';
import {
	MdOutlineCalculate,
	MdOutlineRateReview,
	MdWorkspacesOutline,
} from 'react-icons/md';
import { SiGotomeeting } from 'react-icons/si';
import { TbListCheck, TbUsers } from 'react-icons/tb';

export const menus = [
	{
		label: 'Dashboard',
		icon: <FaRegChartBar size={20} />,
		href: '/',
		// href: 'https://asia-admin.vercel.app',
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
		icon: <TbListCheck size={20} />,
		href: '/services',
	},
	{
		label: 'Tour Packages',
		icon: <BsUiChecksGrid size={20} />,
		href: '/tour_packages',
	},
	{
		label: 'Appointments',
		icon: <SiGotomeeting size={20} />,
		href: '/appointments',
	},
	{
		label: 'Employees',
		icon: <MdWorkspacesOutline size={20} />,
		href: '/employees',
	},
	{
		label: 'Rating & Reviews',
		icon: <MdOutlineRateReview size={20} />,
		href: '/rating_&&_reviews',
	},
	{
		label: 'Expenses Calculation',
		icon: <MdOutlineCalculate size={20} />,
		href: '/expenses_calculation',
	},
];

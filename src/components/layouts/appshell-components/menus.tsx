import { BiNotification, BiUserPlus } from 'react-icons/bi';
import { BsBookmarkCheck, BsReceipt, BsUiChecksGrid } from 'react-icons/bs';
import { FaNetworkWired, FaRegChartBar, FaTasks } from 'react-icons/fa';
import { HiOutlineViewGrid, HiOutlineViewGridAdd } from 'react-icons/hi';
import {
	MdOutlineAnalytics,
	MdOutlineCalculate,
	MdOutlineDocumentScanner,
	MdOutlineLocalOffer,
	MdOutlineLockClock,
	MdOutlineNotifications,
	MdOutlineNotificationsActive,
	MdOutlinePostAdd,
	MdOutlineRateReview,
	MdWorkspacesOutline,
} from 'react-icons/md';
import { SiGotomeeting } from 'react-icons/si';
import {
	TbActivityHeartbeat,
	TbDeviceDesktop,
	TbFileSymlink,
	TbListCheck,
	TbListDetails,
	TbTextPlus,
	TbUsers,
} from 'react-icons/tb';
import { VscSettings } from 'react-icons/vsc';

export const menus = [
	{
		label: 'Dashboard',
		icon: <FaRegChartBar size={20} />,
		href: '/',
		// href: 'https://asia-admin.vercel.app',
	},

	{
		label: 'Reception Managing',
		icon: <BsReceipt size={20} />,
		href: '/reception_management',
		children: [
			{
				label: 'Attendance Activities',
				icon: <TbActivityHeartbeat size={20} />,
				href: '/attendance_activities',
			},
			{
				label: 'Appointments',
				icon: <SiGotomeeting size={20} />,
				href: '/appointments',
			},
			{
				label: 'Task Review',
				icon: <FaTasks size={20} />,
				href: '/task_review',
			},
			{
				label: 'Business Data',
				icon: <MdOutlineAnalytics size={20} />,
				href: '/business_data',
			},
		],
	},

	{
		label: 'IT Sector',
		icon: <TbDeviceDesktop size={20} />,
		href: '/it_sector',
		children: [
			{
				label: 'Package Bookings',
				icon: <BsBookmarkCheck size={20} />,
				href: '/bookings',
			},
			{
				label: 'Visa Requirements',
				icon: <MdOutlineDocumentScanner size={20} />,
				href: '/visa_requirements',
			},
			{
				label: 'Blogs',
				icon: <MdOutlinePostAdd size={20} />,
				href: '/blogs',
			},
			{
				label: 'Packages and Plans',
				icon: <BsUiChecksGrid size={20} />,
				href: '/tour',
				children: [
					{
						label: 'Tour Packages',
						icon: <HiOutlineViewGrid size={20} />,
						href: '/tour_packages',
					},
					{
						label: 'New Package',
						icon: <HiOutlineViewGridAdd size={20} />,
						href: '/tour_packages/createPackage',
					},
					{
						label: 'All Offers',
						icon: <MdOutlineLocalOffer size={20} />,
						href: '/offers',
					},
					{
						label: 'New Offers',
						icon: <TbTextPlus size={20} />,
						href: '/offers/new_offers',
					},
				],
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
		],
	},

	{
		label: 'Task Management',
		icon: <MdOutlineRateReview size={20} />,
		href: '/task_management',
		children: [
			{
				label: 'Indian Visa Processing',
				icon: <TbFileSymlink size={20} />,
				href: '/task_management/indian_visa_processing',
			},
			{
				label: 'Thai Visa Processing',
				icon: <TbFileSymlink size={20} />,
				href: '/task_management/thai_visa_processing',
			},

			{
				label: 'KSA Visa Processing',
				icon: <TbFileSymlink size={20} />,
				href: '/task_management/ksa_visa_processing',
			},
			{
				label: 'UAE Visa Processing',
				icon: <TbFileSymlink size={20} />,
				href: '/task_management/uae_visa_processing',
			},
			{
				label: 'Europe Visa Processing',
				icon: <TbFileSymlink size={20} />,
				href: '/task_management/europe_visa_processing',
			},
			{
				label: 'Others Visa Processing',
				icon: <TbFileSymlink size={20} />,
				href: '/task_management/others_visa_processing',
			},
		],
	},

	{
		label: 'Manage Employees',
		icon: <MdWorkspacesOutline size={20} />,
		href: '/manage',
		children: [
			{
				label: 'All Employees',
				icon: <FaNetworkWired size={20} />,
				href: '/employees',
			},
			{
				label: 'New Employee',
				icon: <BiUserPlus size={20} />,
				href: '/new_employee',
			},
		],
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
	{
		label: 'Notifications',
		icon: <MdOutlineNotifications />,
		href: '/settings/',
		children: [
			{
				label: 'New Notifications',
				href: '/settings/app_notification/new_notification',
				icon: <BiNotification size={18} />,
			},
			{
				label: 'All Notifications',
				href: '/settings/app_notification/all_notifications',
				icon: <MdOutlineNotificationsActive size={18} />,
			},
		],
	},
	{
		label: 'Settings',
		icon: <VscSettings />,
		href: '/settings/',
		children: [
			{
				label: 'Basic information',
				href: '/settings/app_info/basic_info',
				icon: <TbListDetails size={18} />,
			},
			{
				label: 'Opening hours',
				href: '/settings/app_info/opening_hours',
				icon: <MdOutlineLockClock size={18} />,
			},
		],
	},
];

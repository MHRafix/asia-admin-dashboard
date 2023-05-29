import protectWithSession from '@/app/config/authProtection/protectWithSession';
import DateRangePicker from '@/components/common/DateRangePicker';
import PageTitleArea from '@/components/common/PageTitleArea';
import {
	ChartBookingAnalytics,
	ChartTransactionAnalytics,
} from '@/components/custom/Dashboard/ChartAnalytics';
import GridOverViewCard from '@/components/custom/Dashboard/GridOverViewCard';
import TravelPackages from '@/components/custom/TravelPackage/TravelPackages';
import AdminLayout from '@/components/layouts/AdminLayout';
import { useMediaQuery } from '@mantine/hooks';
import { useState } from 'react';

const Dashboard = () => {
	const [value, setValue] = useState<Date | null>(new Date());
	const largeScreen = useMediaQuery('(min-width: 60em)');

	return (
		<AdminLayout title='Dashboard'>
			<PageTitleArea title='Dashboard' tagline='Business growth overview' />
			<div className='grid gap-10'>
				<GridOverViewCard />

				<div className='lg:flex grid justify-between gap-8'>
					<div className=' bg-[#212231] md:px-0 shadow-2xl lg:w-5/12 rounded-sm'>
						<div className='mt-2'>
							<DateRangePicker />
						</div>
						<ChartTransactionAnalytics />
					</div>

					<div className='lg:w-7/12 bg-[#212231] px-2 shadow-2xl rounded-sm'>
						{' '}
						<div className='mt-2'>
							<DateRangePicker />
						</div>
						<ChartBookingAnalytics />
					</div>
				</div>

				<TravelPackages skeletonCount={4} />
			</div>
		</AdminLayout>
	);
};

export default protectWithSession(Dashboard);

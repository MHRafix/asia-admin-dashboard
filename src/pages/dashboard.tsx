import protectWithSession from '@/app/config/authProtection/protectWithSession';
import {
	getBookingsDateRange,
	getTransactionDateRange,
} from '@/app/config/logic/getDateRanges';
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
	const [transactionDate, onChangeTransactionDate] = useState<[Date, Date]>(
		getTransactionDateRange()
	);
	const [bookingsFilterDate, onChangeBookingsFilterDate] = useState<
		[Date, Date]
	>(getBookingsDateRange());
	const largeScreen = useMediaQuery('(min-width: 60em)');

	return (
		<AdminLayout title='Dashboard'>
			<PageTitleArea
				title='Dashboard'
				tagline='Business growth overview'
				currentPathName='Dashboard'
				othersPath={[
					{
						pathName: 'Home',
						href: '/',
					},
				]}
			/>
			<div className='grid gap-10'>
				<GridOverViewCard />

				<div className='lg:flex grid justify-between gap-8'>
					<div className=' bg-[#212231] md:px-0 shadow-2xl lg:w-5/12 rounded-sm'>
						<div className='mt-2'>
							<DateRangePicker
								dateRange={transactionDate}
								onChangeDate={onChangeTransactionDate}
							/>
						</div>
						<ChartTransactionAnalytics />
					</div>

					<div className='lg:w-7/12 bg-[#212231] px-2 shadow-2xl rounded-sm'>
						{' '}
						<div className='mt-2'>
							<DateRangePicker
								dateRange={bookingsFilterDate}
								onChangeDate={onChangeBookingsFilterDate}
							/>
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

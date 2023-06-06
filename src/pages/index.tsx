import { useGetDashboardOverviewData } from '@/app/api/rest-api-hooks/rest.api';
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
import OverViewCardSkeleton from '@/components/custom/Dashboard/OverViewCardSkeleton';
import TravelPackages from '@/components/custom/TravelPackage/TravelPackages';
import AdminLayout from '@/components/layouts/AdminLayout';
import { Title } from '@mantine/core';
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
	const { isLoading, data } = useGetDashboardOverviewData();
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
				{isLoading && <OverViewCardSkeleton />}
				{!isLoading && (
					<GridOverViewCard overViewCardData={data?.overViewCardData!} />
				)}

				<div className='grid lg:grid-cols-2 justify-between gap-5'>
					<div className=' bg-[#212231] shadow-2xl rounded-sm w-[12/12]'>
						<div className='mt-2'>
							<DateRangePicker
								dateRange={transactionDate}
								onChangeDate={onChangeTransactionDate}
							/>
						</div>
						<ChartTransactionAnalytics />
					</div>

					<div className='w-12/12 bg-[#212231] px-2 shadow-2xl rounded-sm'>
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

				{/* popular travel packages */}
				<div>
					<Title fw={500} fz={25} ff={'Nunito sans, sans-serif'} mb={20}>
						Popular packages
					</Title>
					<TravelPackages skeletonCount={3} />
				</div>
			</div>
		</AdminLayout>
	);
};

export default protectWithSession(Dashboard);

import { useGetDashboardOverviewData } from '@/app/api/rest-api-hooks/rest.api';
import protectWithSession from '@/app/config/authProtection/protectWithSession';
import { useGetDateFilteredBookings } from '@/app/config/logic/getDateFromRange';
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
import { useState } from 'react';

const Dashboard = () => {
	const [transactionDate, onChangeTransactionDate] = useState<[Date, Date]>(
		getTransactionDateRange()
	);
	const [bookingsFilterDate, onChangeBookingsFilterDate] = useState<
		[Date, Date]
	>(getBookingsDateRange());
	const { isLoading, data } = useGetDashboardOverviewData();

	const { getDaysArray } = useGetDateFilteredBookings(bookingsFilterDate);

	const date = getDaysArray(
		bookingsFilterDate[0]?.toISOString(),
		bookingsFilterDate[1]?.toISOString()
	);
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

				<div className='grid lg:grid-cols-2 gap-5'>
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
						<ChartBookingAnalytics
							date={date}
							chartData={data?.bookingsChartAnalytics!}
						/>
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

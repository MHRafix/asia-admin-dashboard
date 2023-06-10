import { useGetTravelPackages } from '@/app/api/gql-api-hooks/travelPackage.api';
import { useGetDashboardOverviewData } from '@/app/api/rest-api-hooks/rest.api';
import protectWithSession from '@/app/config/authProtection/protectWithSession';
import { useGetDateFilteredBookings } from '@/app/config/logic/getDateFromRange';
import {
	getBookingsDateRange,
	getTransactionDateRange,
} from '@/app/config/logic/getDateRanges';
import DateRangePicker from '@/components/common/DateRangePicker';
import PageTitleArea from '@/components/common/PageTitleArea';
import TourCardSkeleton from '@/components/common/Tour/TourCardSkeleton';
import {
	ChartBookingAnalytics,
	ChartTransactionAnalytics,
} from '@/components/custom/Dashboard/Charts/ChartAnalytics';
import DashboardSkeleton from '@/components/custom/Dashboard/DashboardSkeleton';
import GridOverViewCard from '@/components/custom/Dashboard/OverViewCard.tsx/GridOverViewCard';
import PopularPackagesCarousel from '@/components/custom/Dashboard/PackagesSlider/PopularPackagesCarousel';
import AdminLayout from '@/components/layouts/AdminLayout';
import { Title } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';

const Dashboard = () => {
	const [transactionDate, onChangeTransactionDate] = useState<[Date, Date]>(
		getTransactionDateRange()
	);
	const [bookingsFilterDate, onChangeBookingsFilterDate] = useState<
		[Date, Date]
	>(getBookingsDateRange());

	const { packages } = useGetTravelPackages();

	// dashboard overview api
	const { triggerApi } = useGetDashboardOverviewData();
	const {
		data: dashboardOverviewData,
		refetch,
		isLoading,
	} = useQuery(
		['dashboardOverviewData'],
		async () => {
			const res = await triggerApi({
				firstDate: bookingsFilterDate[0]?.toISOString(),
				lastDate: bookingsFilterDate[1]?.toISOString(),
			});
			return res?.data;
		},
		{
			enabled: Boolean(bookingsFilterDate[1]),
			onError: async (err: AxiosError) => {
				showNotification({
					title: err.message,
					message: 'Error fetching chart data.',
					color: err.message,
				});
			},
		}
	);

	useEffect(() => {
		Boolean(bookingsFilterDate[1])
			? refetch()
			: showNotification({
					title: "Last date can't be empty!",
					message: 'Please select last date.',
					color: 'red',
			  });
	}, [bookingsFilterDate]);
	const { getDaysArray } = useGetDateFilteredBookings(bookingsFilterDate);

	const dates = getDaysArray(
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
			{isLoading && <DashboardSkeleton />}
			{!isLoading && (
				<div className='grid gap-8'>
					<GridOverViewCard
						overViewCardData={dashboardOverviewData?.overViewCardData!}
					/>

					<div className='grid'>
						<div className='w-12/12 bg-[#212231] px-2 shadow-2xl rounded-sm'>
							{' '}
							<div className='mt-2'>
								<DateRangePicker
									dateRange={bookingsFilterDate}
									onChangeDate={onChangeBookingsFilterDate}
								/>
							</div>
							<ChartBookingAnalytics
								date={dates}
								chartData={dashboardOverviewData?.bookingsChartAnalytics!}
							/>
						</div>
					</div>

					{/* popular travel packages */}
					<div className='lg:flex grid gap-8'>
						<div className='lg:w-7/12 '>
							<Title fw={500} fz={25} ff={'Nunito sans, sans-serif'} mb={20}>
								Transaction analytics
							</Title>
							<div className=' bg-[#212231] shadow-2xl rounded-sm'>
								{/* <div className='mt-2'>
								<DateRangePicker
								dateRange={transactionDate}
								onChangeDate={onChangeTransactionDate}
								/>
							</div> */}
								<ChartTransactionAnalytics
									transactions={dashboardOverviewData?.overViewCardData!}
								/>
							</div>
						</div>

						<div className='lg:w-5/12'>
							<Title fw={500} fz={25} ff={'Nunito sans, sans-serif'} mb={20}>
								Popular packages
							</Title>
							<TourCardSkeleton show={!packages?.length} />

							<PopularPackagesCarousel packages={packages!} />
						</div>
					</div>
				</div>
			)}
		</AdminLayout>
	);
};

export default protectWithSession(Dashboard);

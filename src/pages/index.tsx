import {
	IDashboardOverview,
	ITaskRevinewDataType,
} from '@/app/api/models/dashboard.model';
import { ITravelPackage } from '@/app/api/models/travelPackage.model';
import { useGetDashboardAnalyticsData } from '@/app/api/rest-api-hooks/rest.api';
import protectWithSession from '@/app/config/authProtection/protectWithSession';
import { All_Employee_ID } from '@/app/config/gql-queries/dashboard.query';
import { GET_TRAVEL_PACKAGES } from '@/app/config/gql-queries/travelPackage.query';
import { SortType } from '@/app/config/gql-types';
import { getBookingsDateRange } from '@/app/config/logic/getDateRanges';
import DateRangePicker from '@/components/common/DateRangePicker';
import PageTitleArea from '@/components/common/PageTitleArea';
import TourCard from '@/components/common/Tour/TourCard';
import DashboardSkeleton from '@/components/custom/Dashboard/DashboardSkeleton';
import GridOverViewCard from '@/components/custom/Dashboard/OverViewCard.tsx/GridOverViewCard';
import TaskRevinewCard from '@/components/custom/Dashboard/OverViewCard.tsx/TaskRevinewCard';
import AdminLayout from '@/components/layouts/AdminLayout';
import { useQuery as ApolloQuery } from '@apollo/client';
import { Select, Space, Title } from '@mantine/core';
import { useEffect, useState } from 'react';

const Dashboard = () => {
	const [bookingsFilterDate, onChangeBookingsFilterDate] = useState<
		[Date, Date]
	>(getBookingsDateRange());
	const [dashboardOverviewData, setDashboardOverviewData] =
		useState<IDashboardOverview>();
	const [isLoadingOveviewData, setIsLoadingOverviewData] =
		useState<boolean>(false);

	const [revinewType, setRevinewType] = useState<string>('By Employee');

	const [revinewData, setRevinewData] = useState<ITaskRevinewDataType[]>();
	const [isLoadingRevinewData, setIsLoadingRevinewData] =
		useState<boolean>(false);

	// travel packages api
	const { data: travelPackages } = ApolloQuery<{
		travelPackages: { nodes: ITravelPackage[] };
	}>(GET_TRAVEL_PACKAGES, {
		variables: {
			input: {
				page: 1,
				limit: 6,
				sort: SortType.Desc,
				sortBy: '_id',
			},
		},
	});

	// All employee ids api
	const { data: employeeIds, loading: employeeIdsLoading } = ApolloQuery<{
		allEmployeeIds: string[];
	}>(All_Employee_ID);

	// dashboard overview api
	const { overViewDataApi, taskRevinewDataApi } =
		useGetDashboardAnalyticsData();

	useEffect(() => {
		if (bookingsFilterDate[1]) {
			setIsLoadingOverviewData(true);
			overViewDataApi({
				firstDate: bookingsFilterDate[0]?.toISOString(),
				lastDate: bookingsFilterDate[1]?.toISOString(),
			}).then((res) => {
				setIsLoadingOverviewData(false);
				setDashboardOverviewData(res?.data);
			});
		}
	}, [bookingsFilterDate]);

	useEffect(() => {
		if (!employeeIdsLoading) {
			setIsLoadingRevinewData(true);
			taskRevinewDataApi({
				employeeIds:
					revinewType === 'Grand Total' ? [] : employeeIds?.allEmployeeIds,
			}).then((res) => {
				setIsLoadingRevinewData(false);
				setRevinewData(res?.data);
			});
		}
	}, [employeeIds?.allEmployeeIds, revinewType]);

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

			<div className='grid gap-8'>
				{isLoadingOveviewData || isLoadingRevinewData ? (
					<DashboardSkeleton />
				) : (
					<div>
						<GridOverViewCard
							overViewCardData={dashboardOverviewData?.overViewCardData!}
						/>

						<div className='grid mt-10 mb-10'>
							<div>
								<div className='lg:flex justify-between items-center gap-5'>
									<Title
										fw={500}
										fz={25}
										ff={'Nunito sans, sans-serif'}
										mb={10}
									>
										Task Revinew
									</Title>

									<div className='md:flex items-center gap-3'>
										<DateRangePicker
											dateRange={bookingsFilterDate}
											onChangeDate={onChangeBookingsFilterDate}
										/>

										<Select
											data={['Grand Total', 'By Employee']}
											onChange={(e) => setRevinewType(e!)}
											value={revinewType}
											size='md'
											className='mt-2'
										/>
									</div>
								</div>

								<Space h={20} />

								<div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5'>
									<>
										{revinewData?.map(
											(taskRevinew: ITaskRevinewDataType, idx: number) => (
												<TaskRevinewCard
													key={idx}
													revinew={taskRevinew as ITaskRevinewDataType}
												/>
											)
										)}
									</>
								</div>
							</div>
						</div>
					</div>
				)}

				{/* popular travel packages */}
				<Title fw={500} fz={25} ff={'Nunito sans, sans-serif'} mb={10}>
					Popular packages
				</Title>

				<div className='grid lg:grid-cols-4 gap-5'>
					{travelPackages?.travelPackages?.nodes?.map(
						(TPackage: ITravelPackage, idx: number) => (
							<TourCard key={idx} TPackage={TPackage} actionBtn={false} />
						)
					)}
				</div>
			</div>
		</AdminLayout>
	);
};

export default protectWithSession(Dashboard);
/**
 <ChartTransactionAnalytics
                  transactions={{
                    totalTransactions:
                      dashboardOverviewData?.overViewCardData
                        ?.totalTransactions!,
                    newAppointments:
                      dashboardOverviewData?.overViewCardData
                        ?.totalTransactions!,
                    newBookings:
                      dashboardOverviewData?.overViewCardData
                        ?.totalTransactions!,
                    newFlights:
                      dashboardOverviewData?.overViewCardData
                        ?.totalTransactions!,
                  }}
                />
                <div className="mt-2">
                  <DateRangePicker
                    dateRange={bookingsFilterDate}
                    onChangeDate={onChangeBookingsFilterDate}
                  />
                </div>
                <ChartBookingAnalytics
                  date={dates}
                  chartData={dashboardOverviewData?.bookingsChartAnalytics!}
                />
 */

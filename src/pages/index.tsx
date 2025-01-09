import {
	IGrandRevinewOverviewData,
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
import TourCardSkeleton from '@/components/common/Tour/TourCardSkeleton';
import DashboardSkeleton from '@/components/custom/Dashboard/DashboardSkeleton';
import GridOverViewCard from '@/components/custom/Dashboard/OverViewCard.tsx/GridOverViewCard';
import TaskRevinewCard from '@/components/custom/Dashboard/OverViewCard.tsx/TaskRevinewCard';
import AdminLayout from '@/components/layouts/AdminLayout';
import { useQuery as ApolloQuery } from '@apollo/client';
import { Space, Title } from '@mantine/core';
import { useEffect, useState } from 'react';

const Dashboard = () => {
	const [filterDate, onChangeFilterDate] = useState<[Date, Date]>(
		getBookingsDateRange()
	);

	// dashboard overview data
	const [grandRevinewData, setGrandRevinewData] =
		useState<IGrandRevinewOverviewData>();
	const [isLoadingGrandRevinewData, setIsLoadingGrandRevinewData] =
		useState<boolean>(true);

	// employee revinew data
	const [employeeRevinewData, setEmployeeRevinewData] =
		useState<ITaskRevinewDataType[]>();
	const [isLoadingEmployeeRevinewData, setIsLoadingEmployeeRevinewData] =
		useState<boolean>(true);

	// travel packages api
	const { data: travelPackages, loading: travelPackageLoading } = ApolloQuery<{
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
	const { taskGrandRevinewApi, taskRevinewByEmployeeApi } =
		useGetDashboardAnalyticsData();

	useEffect(() => {
		try {
			if (filterDate[1]) {
				setIsLoadingGrandRevinewData(true);
				setIsLoadingEmployeeRevinewData(true);
				taskGrandRevinewApi(filterDate).then((res) => {
					setGrandRevinewData(res?.data);
				});

				if (!employeeIdsLoading) {
					setIsLoadingEmployeeRevinewData(true);
					taskRevinewByEmployeeApi(
						{
							employeeIds: employeeIds?.allEmployeeIds,
						},
						filterDate
					).then((res) => {
						setEmployeeRevinewData(res?.data);
						setIsLoadingGrandRevinewData(false);
						setIsLoadingEmployeeRevinewData(false);
					});
				}
			}
		} catch (error) {
			setIsLoadingGrandRevinewData(false);
			setIsLoadingEmployeeRevinewData(false);
		}
	}, [employeeIds?.allEmployeeIds, filterDate]);

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
				{isLoadingGrandRevinewData || isLoadingEmployeeRevinewData ? (
					<DashboardSkeleton />
				) : (
					<div>
						{' '}
						<div className='lg:flex justify-between items-center gap-5 mb-5'>
							<Title fw={500} fz={25} ff={'Nunito sans, sans-serif'}>
								Accounts Analytics
							</Title>

							<div className='md:flex items-center gap-3'>
								<DateRangePicker
									dateRange={filterDate}
									onChangeDate={onChangeFilterDate}
								/>
							</div>
						</div>
						<GridOverViewCard grandRevinewData={grandRevinewData!} />
						<div className='grid mt-10 mb-10'>
							<div>
								<div className='lg:flex justify-between items-center gap-5'>
									<Title fw={500} fz={25} ff={'Nunito sans, sans-serif'}>
										Task Revenue
									</Title>
								</div>

								<Space h={20} />

								<div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5'>
									<>
										{employeeRevinewData?.map(
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
				{!travelPackageLoading ? (
					<>
						{travelPackages?.travelPackages?.nodes?.length ? (
							<div>
								<Title fw={500} fz={25} ff={'Nunito sans, sans-serif'} mb={10}>
									Popular packages
								</Title>

								<div className='grid lg:grid-cols-4 gap-5'>
									{travelPackages?.travelPackages?.nodes?.map(
										(TPackage: ITravelPackage, idx: number) => (
											<TourCard
												key={idx}
												TPackage={TPackage}
												actionBtn={false}
											/>
										)
									)}
								</div>
							</div>
						) : null}
					</>
				) : (
					<div className='grid lg:grid-cols-4 gap-5'>
						{new Array(12).fill(12).map((_, idx: number) => (
							<TourCardSkeleton
								key={idx}
								show={!Boolean(travelPackages?.travelPackages?.nodes?.length)}
							/>
						))}
					</div>
				)}
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

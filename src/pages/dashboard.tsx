import protectWithSession from '@/app/config/authProtection/protectWithSession';
import PageTitleArea from '@/components/common/PageTitleArea';
import { ChartAnalytics } from '@/components/custom/Dashboard/ChartAnalytics';
import GridOverViewCard from '@/components/custom/Dashboard/GridOverViewCard';
import TravelPackages from '@/components/custom/TravelPackage/TravelPackages';
import AdminLayout from '@/components/layouts/AdminLayout';
import { DatePicker } from '@mantine/dates';
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
					<div className=' bg-[#212231] md:px-10 px-5 py-10 shadow-xl lg:w-5/12 rounded-sm'>
						<DatePicker
							value={value}
							onChange={setValue}
							size={largeScreen ? 'xl' : 'xs'}
							renderDay={(date) => {
								const getDate = date.getDate();
								const getDay = date.getDay();
								return (
									<div className='!mx-10'>
										<div
											className={
												getDate === value?.getDate() &&
												getDay === value.getDay()
													? 'bg-red-500 md:text-xl p-2 md:w-[54px] md:h-[54px] flex items-center justify-center rounded-sm'
													: ''
											}
										>
											{getDate}
										</div>
									</div>
								);
							}}
						/>{' '}
					</div>

					<div className='lg:w-7/12 bg-[#212231] px-2 shadow-xl rounded-sm'>
						<ChartAnalytics />
					</div>
				</div>

				<TravelPackages />
			</div>
		</AdminLayout>
	);
};

export default protectWithSession(Dashboard);

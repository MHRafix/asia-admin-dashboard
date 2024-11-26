import { IGrandRevinewOverviewData } from '@/app/api/models/dashboard.model';
import { Space, Text, ThemeIcon } from '@mantine/core';
import {
	IconCircleCheck,
	IconCurrencyTaka,
	IconSortDescending,
	IconTimeline,
} from '@tabler/icons-react';
import { useRouter } from 'next/router';
import { TbTransform } from 'react-icons/tb';
import { CountUp } from 'use-count-up';

const GridOverViewCard: React.FC<{
	grandRevinewData: IGrandRevinewOverviewData;
}> = ({ grandRevinewData }) => {
	const router = useRouter();

	return (
		<div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5'>
			<div
				onClick={() => router.push('/reception_management/appointments')}
				className='flex items-center bg-[#212231] px-4 py-5 rounded-md cursor-pointer gap-5 shadow-2xl'
			>
				<ThemeIcon color='violet' size={60} variant='light' radius={8}>
					<IconCurrencyTaka size={30} />
				</ThemeIcon>
				<div>
					<Text fw={700} fz={25}>
						<CountUp
							isCounting
							end={grandRevinewData?.grandRevinew}
							duration={3}
							thousandsSeparator=','
						/>
					</Text>

					<Space h={0} />
					<Text fz={15} fw={400} color='#55587b'>
						Grand Revinew
					</Text>
				</div>
			</div>
			<div
				onClick={() => router.push('/it_sector/bookings')}
				className='flex items-center bg-[#212231] px-4 py-5 rounded-md cursor-pointer gap-5 shadow-2xl'
			>
				<ThemeIcon color='violet' size={60} variant='light' radius={8}>
					<IconTimeline size={30} />
				</ThemeIcon>
				<div>
					<Text fw={700} fz={25}>
						<CountUp
							isCounting
							end={grandRevinewData?.totalRevinew}
							duration={3}
							thousandsSeparator=','
						/>
					</Text>
					<Space h={0} />
					<Text fz={15} fw={400} color='#55587b'>
						Total Revinew
					</Text>
				</div>
			</div>
			<div
				onClick={() => router.push('/')}
				className='flex items-center bg-[#212231] px-4 py-5 rounded-md cursor-pointer gap-5 shadow-2xl'
			>
				<ThemeIcon color='violet' size={60} variant='light' radius={8}>
					<IconCircleCheck size={30} />
				</ThemeIcon>
				<div>
					<Text fw={700} fz={25}>
						<CountUp
							isCounting
							end={grandRevinewData?.totalPaidRevinew}
							duration={3}
							thousandsSeparator=','
						/>
					</Text>
					<Space h={0} />
					<Text fz={15} fw={400} color='#55587b'>
						Total Paid Revinew
					</Text>
				</div>
			</div>
			<div
				onClick={() => router.push('/')}
				className='flex items-center bg-[#212231] px-4 py-5 rounded-md cursor-pointer gap-5 shadow-2xl'
			>
				<ThemeIcon color='violet' size={60} variant='light' radius={8}>
					<IconSortDescending size={30} />
				</ThemeIcon>
				<div>
					<Text fw={700} fz={25}>
						<CountUp
							isCounting
							end={grandRevinewData?.totalDueRavinew}
							duration={3}
							thousandsSeparator=','
						/>
					</Text>
					<Space h={0} />
					<Text fz={15} fw={400} color='#55587b'>
						Total Due Revinew
					</Text>
				</div>
			</div>
			<div
				onClick={() => router.push('/')}
				className='flex items-center bg-[#212231] px-4 py-5 rounded-md cursor-pointer gap-5 shadow-2xl'
			>
				<ThemeIcon color='violet' size={60} variant='light' radius={8}>
					<TbTransform size={30} />
				</ThemeIcon>
				<div>
					<Text fw={700} fz={25}>
						<CountUp
							isCounting
							end={grandRevinewData?.totalExpense}
							duration={3}
							thousandsSeparator=','
						/>
					</Text>
					<Space h={0} />
					<Text fz={15} fw={400} color='#55587b'>
						Total Expence
					</Text>
				</div>
			</div>
		</div>
	);
};

export default GridOverViewCard;

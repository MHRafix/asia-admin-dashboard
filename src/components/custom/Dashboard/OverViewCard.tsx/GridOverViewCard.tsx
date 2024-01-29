import { IOverViewCardData } from '@/app/api/models/dashboard.model';
import { Space, Text, ThemeIcon } from '@mantine/core';
import { useRouter } from 'next/router';
import { BsBookmarkCheck } from 'react-icons/bs';
import { SiGotomeeting } from 'react-icons/si';
import { TbPlaneInflight, TbTransform } from 'react-icons/tb';
import { CountUp } from 'use-count-up';

const GridOverViewCard: React.FC<{ overViewCardData: IOverViewCardData }> = ({
	overViewCardData,
}) => {
	const router = useRouter();

	return (
		<div className='grid lg:grid-cols-4 sm:grid-cols-2 gap-5'>
			<div
				onClick={() => router.push('/reception_management/appointments')}
				className='flex items-center bg-[#212231] px-4 py-5 rounded-md cursor-pointer gap-5 shadow-2xl'
			>
				<ThemeIcon color='violet' size={60} variant='light' radius={8}>
					<SiGotomeeting size={30} />
				</ThemeIcon>
				<div>
					<Text fw={700} fz={25}>
						<CountUp
							isCounting
							end={overViewCardData?.newAppointments}
							duration={3}
						/>
					</Text>

					<Space h={0} />
					<Text fz={15} fw={400} color='#55587b'>
						New Appointments
					</Text>
				</div>
			</div>
			<div
				onClick={() => router.push('/it_sector/bookings')}
				className='flex items-center bg-[#212231] px-4 py-5 rounded-md cursor-pointer gap-5 shadow-2xl'
			>
				<ThemeIcon color='violet' size={60} variant='light' radius={8}>
					<BsBookmarkCheck size={30} />
				</ThemeIcon>
				<div>
					<Text fw={700} fz={25}>
						<CountUp
							isCounting
							end={overViewCardData?.newBookings}
							duration={3}
						/>
					</Text>
					<Space h={0} />
					<Text fz={15} fw={400} color='#55587b'>
						New Bookings
					</Text>
				</div>
			</div>
			<div
				onClick={() => router.push('/')}
				className='flex items-center bg-[#212231] px-4 py-5 rounded-md cursor-pointer gap-5 shadow-2xl'
			>
				<ThemeIcon color='violet' size={60} variant='light' radius={8}>
					<TbPlaneInflight size={30} />
				</ThemeIcon>
				<div>
					<Text fw={700} fz={25}>
						<CountUp
							isCounting
							end={overViewCardData?.newFlights}
							duration={3}
						/>
					</Text>
					<Space h={0} />
					<Text fz={15} fw={400} color='#55587b'>
						New Flight
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
							end={overViewCardData?.totalTransactions}
							duration={3}
						/>
					</Text>
					<Space h={0} />
					<Text fz={15} fw={400} color='#55587b'>
						Total Transaction
					</Text>
				</div>
			</div>
		</div>
	);
};

export default GridOverViewCard;

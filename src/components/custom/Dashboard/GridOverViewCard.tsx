import { Space, Text, ThemeIcon } from '@mantine/core';
import { BsBookmarkCheck } from 'react-icons/bs';
import { SiGotomeeting } from 'react-icons/si';
import { TbPlaneInflight, TbTransform } from 'react-icons/tb';

const GridOverViewCard: React.FC = () => {
	return (
		<div className='grid lg:grid-cols-4 sm:grid-cols-2 gap-5'>
			<div className='flex items-center bg-[#212231] px-4 py-5 rounded-md cursor-pointer gap-5 shadow-2xl'>
				<ThemeIcon color='violet' size={60} variant='light' radius={8}>
					<SiGotomeeting size={30} />
				</ThemeIcon>
				<div>
					<Text fw={700} fz={25}>
						5353
					</Text>
					<Space h={0} />
					<Text fz={15} fw={400} color='#55587b'>
						New Appointments
					</Text>
				</div>
			</div>
			<div className='flex items-center bg-[#212231] px-4 py-5 rounded-md cursor-pointer gap-5 shadow-2xl'>
				<ThemeIcon color='violet' size={60} variant='light' radius={8}>
					<BsBookmarkCheck size={30} />
				</ThemeIcon>
				<div>
					<Text fw={700} fz={25}>
						5353
					</Text>
					<Space h={0} />
					<Text fz={15} fw={400} color='#55587b'>
						New Bookings
					</Text>
				</div>
			</div>
			<div className='flex items-center bg-[#212231] px-4 py-5 rounded-md cursor-pointer gap-5 shadow-2xl'>
				<ThemeIcon color='violet' size={60} variant='light' radius={8}>
					<TbPlaneInflight size={30} />
				</ThemeIcon>
				<div>
					<Text fw={700} fz={25}>
						5353
					</Text>
					<Space h={0} />
					<Text fz={15} fw={400} color='#55587b'>
						New Flight
					</Text>
				</div>
			</div>
			<div className='flex items-center bg-[#212231] px-4 py-5 rounded-md cursor-pointer gap-5 shadow-2xl'>
				<ThemeIcon color='violet' size={60} variant='light' radius={8}>
					<TbTransform size={30} />
				</ThemeIcon>
				<div>
					<Text fw={700} fz={25}>
						5353
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

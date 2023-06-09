import { ITransportation } from '@/store/createPackgage.store';
import { Box, Button, Card, Divider, Flex, Text } from '@mantine/core';
import Image from 'next/image';
import React from 'react';

const TravelTransportItem: React.FC<{
	transportation: ITransportation;
	serialNumber: number;
}> = ({ transportation, serialNumber }) => {
	return (
		<div className='my-4'>
			<Card px={{ xs: 'sm', sm: 'lg' }} radius='md' shadow='2xl' bg={'#212231'}>
				<Box className='sm:flex justify-between items-center gap-5 '>
					<Text fz={{ xs: 16, sm: 18 }} fw={500} ff='Nunito Sans, sans-serif'>
						{serialNumber < 1 ? 'Go from' : 'Return from'} -{' '}
						{transportation?.departureStation}
					</Text>
					<Button variant='light' color='gray'>
						<Text fz={{ xs: 14, sm: 16 }} ff='Nunito Sans, sans-serif'>
							{
								new Date(transportation?.departureDate)
									.toDateString()
									.split('20')[0]
							}
						</Text>
					</Button>
				</Box>

				<Divider my='xs' color='#e1e1e1' />

				<div className='md:flex grid justify-between gap-5 '>
					<Flex align='center' gap={10}>
						{transportation?.tourBy === 'BY_AIR' && (
							<Image
								src={planeImage}
								alt='transportIcon'
								width={30}
								height={30}
							/>
						)}
						{transportation?.tourBy === 'BY_ROAD' && (
							<Image src={busIcon} alt='transportIcon' width={30} height={30} />
						)}
						{transportation?.tourBy === 'BY_RAIL' && (
							<Image
								src={railIcon}
								alt='transportIcon'
								width={30}
								height={30}
							/>
						)}
						<Text
							ff='Nunito Sans, sans-serif'
							fz={16}
							bg={'#FE3F52'}
							px={15}
							py={3}
							color='#fff'
							className='rounded-sm'
						>
							{transportation?.transportName}
						</Text>
					</Flex>
					<div>
						<Text ff='Nunito Sans, sans-serif' fz={15} fw={500}>
							{transportation?.departureStation} -{' '}
							{transportation?.destinationStation}
						</Text>
						<Text ff='Nunito Sans, sans-serif' fz={13}>
							Departure : {transportation?.departureTime} - Arrival :{' '}
							{transportation?.arrivalTime}
						</Text>
					</div>
					<div className='md:text-right'>
						<Text fz={15} fw={500}>
							{`${transportation?.stops} stops`}
						</Text>
						<Text size='sm'>Break : {transportation?.journeyBreak}</Text>
					</div>
				</div>
			</Card>
		</div>
	);
};

export default TravelTransportItem;

export const busIcon = 'https://i.ibb.co/VC0JTP4/bus-2.png';
export const railIcon = 'https://i.ibb.co/526LVNg/train.png';
export const planeImage =
	'https://cdn-icons-png.flaticon.com/512/9129/9129518.png';

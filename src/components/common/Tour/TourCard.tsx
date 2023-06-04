import { ITravelPackage } from '@/app/api/models/travelPackage.model';
import { Box, Flex, Rating, Text, Title } from '@mantine/core';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { MdLocationPin } from 'react-icons/md';

interface ITourCardProp {
	TPackage: ITravelPackage;
}

const TourCard: React.FC<ITourCardProp> = ({ TPackage }) => {
	return (
		<Link
			href={`/tour-packages/${TPackage?._id}`}
			className='no-underline text-white'
		>
			<Box className=' bg-[#212231] hover:bg-[#212237] relative rounded-lg grid shadow-xl pb-3'>
				<div className='mx-auto mt-2'>
					{TPackage?.thumbnail && (
						<Image
							src={TPackage?.thumbnail}
							alt='card image'
							className='rounded-lg mx-auto text-center'
							width={270}
							height={180}
						/>
					)}
				</div>

				<div className='p-3'>
					<Flex justify='space-between' align='center'>
						<Title order={4} mt={4} mb={6} ff='Nunito Sans, sans-serif'>
							{TPackage?.packageTitle}
						</Title>

						<div className='text-sm font-semibold'>
							$ {TPackage?.regularPrice}
						</div>
					</Flex>
					<Flex justify='space-between' align='center'>
						<Flex gap={2} align='center'>
							<MdLocationPin size={16} color='#FF597B' />
							<Text
								ff='Nunito Sans, sans-serif'
								className='text-sm text-slate-400'
							>
								{TPackage?.destination}
							</Text>
						</Flex>
						<Flex>
							<Text color='cyan' size='xs'>
								<Rating
									size='xs'
									color='teal'
									value={4.5}
									fractions={2}
									readOnly
								/>
							</Text>
						</Flex>
					</Flex>
				</div>
			</Box>
		</Link>
	);
};

export default TourCard;

import { useGetTravelPackages } from '@/app/api/gql-api-hooks/travelPackage.api';
import { ITravelPackage } from '@/app/api/models/travelPackage.model';
import TourCard from '@/components/common/Tour/TourCard';
import TourCardSkeleton from '@/components/common/Tour/TourCardSkeleton';
import { Carousel } from '@mantine/carousel';
import { useMediaQuery } from '@mantine/hooks';
import React from 'react';
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';

const PopularPackagesCarousel: React.FC<{ skeletonCount: number }> = ({
	skeletonCount,
}) => {
	const { packages } = useGetTravelPackages();
	const largeScreen = useMediaQuery('(min-width: 60em)');
	return (
		<div>
			<Carousel
				sx={{
					position: 'relative',
				}}
				height={290}
				slideSize={'100%'}
				slideGap='md'
				loop
				align='start'
				nextControlIcon={
					<div className='p-2'>
						<BiRightArrowAlt size={18} />
					</div>
				}
				previousControlIcon={
					<div className='p-2'>
						<BiLeftArrowAlt size={18} />
					</div>
				}
				slidesToScroll={1}
			>
				<TourCardSkeleton show={!packages?.length} />

				{packages?.map((TPackage: ITravelPackage, idx: number) => (
					<Carousel.Slide key={idx}>
						<TourCard TPackage={TPackage} />
					</Carousel.Slide>
				))}
			</Carousel>
		</div>
	);
};

export default PopularPackagesCarousel;

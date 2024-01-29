import { ITravelPackage } from '@/app/api/models/travelPackage.model';
import TourCard from '@/components/common/Tour/TourCard';
import { useMediaQuery } from '@mantine/hooks';
import React from 'react';

const PopularPackagesCarousel: React.FC<{ packages: ITravelPackage[] }> = ({
	packages,
}) => {
	const largeScreen = useMediaQuery('(min-width: 60em)');
	return (
		<div>
			{/* <Carousel
				sx={{
					position: 'relative',
				}}
				height={290}
				slideSize={'100%'}
				// loop
				align='center'
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
				// slidesToScroll={1}
			>
					<Carousel.Slide key={idx}>
					</Carousel.Slide>
			</Carousel> */}
			{packages?.map((TPackage: ITravelPackage, idx: number) => (
				<TourCard TPackage={TPackage} />
			))}
		</div>
	);
};

export default PopularPackagesCarousel;

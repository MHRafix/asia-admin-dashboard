import { Carousel } from '@mantine/carousel';
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';

import React from 'react';
import { useGetTravelPackages } from '@/app/api/api-hooks/travelPackage.api';
import { ITravelPackage } from '@/app/api/models/travelPackage.model';
import TourCardSkeleton from '@/components/common/Tour/TourCardSkeleton';
import TourCard from '@/components/common/Tour/TourCard';
import { useMediaQuery } from '@mantine/hooks';

const TravelPackages: React.FC<{}> = () => {
	const { packages } = useGetTravelPackages();
	const largeScreen = useMediaQuery('(min-width: 60em)');
	return (
		<div className='grid lg:grid-cols-4 lg:gap-3 gap-8'>
			<TourCardSkeleton show={!packages?.length} />

			{packages?.map((TPackage: ITravelPackage, idx: number) => (
				<TourCard TPackage={TPackage} />
			))}
		</div>
	);
};

export default TravelPackages;

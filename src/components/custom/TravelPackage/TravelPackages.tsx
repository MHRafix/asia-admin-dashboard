import { useGetTravelPackages } from '@/app/api/gql-api-hooks/travelPackage.api';
import { ITravelPackage } from '@/app/api/models/travelPackage.model';
import EmptyPanel from '@/components/common/EmptyPanels/EmptyPanel';
import TourCard from '@/components/common/Tour/TourCard';
import TourCardSkeleton from '@/components/common/Tour/TourCardSkeleton';
import React from 'react';

const TravelPackages: React.FC<{ skeletonCount: number }> = ({
	skeletonCount,
}) => {
	const { packages, loading } = useGetTravelPackages();
	// const largeScreen = useMediaQuery('(min-width: 60em)');
	return (
		<div>
			<div className='grid lg:grid-cols-3 lg:gap-3 gap-8'>
				{new Array(skeletonCount).fill(skeletonCount).map((_, idx: number) => (
					<TourCardSkeleton key={idx} show={!packages?.length} />
				))}

				{packages?.map((TPackage: ITravelPackage, idx: number) => (
					<TourCard key={idx} TPackage={TPackage} />
				))}
			</div>

			<EmptyPanel
				imgPath='/tourPackages.png'
				isShow={!packages?.length && !loading}
				title='There is no tour packages found!'
			/>
		</div>
	);
};

export default TravelPackages;

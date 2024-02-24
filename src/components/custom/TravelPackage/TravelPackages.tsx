import { useGetTravelPackages } from '@/app/api/gql-api-hooks/travelPackage.api';
import { ITravelPackage } from '@/app/api/models/travelPackage.model';
import { MatchOperator, SortType } from '@/app/config/gql';
import EmptyPanel from '@/components/common/EmptyPanels/EmptyPanel';
import TourCard from '@/components/common/Tour/TourCard';
import TourCardSkeleton from '@/components/common/Tour/TourCardSkeleton';
import { Group, Select, Space } from '@mantine/core';
import React, { useEffect, useState } from 'react';

const TravelPackages: React.FC<{
	skeletonCount: number;
	withFilter?: boolean;
}> = ({ skeletonCount, withFilter = false }) => {
	const { packages, loading, refetchPackages } = useGetTravelPackages();

	const [status, setStatus] = useState<string>('UPCOMING');

	useEffect(() => {
		if (status === 'ALL') {
			refetchPackages({
				input: {
					page: 1,
					limit: 100,
					sort: SortType.Desc,
					sortBy: '_id',
				},
			});
		} else if (status === 'PUBLISHED' || status === 'NOT-PUBLISHED') {
			refetchPackages({
				input: {
					where: {
						key: 'isPublished',
						operator: MatchOperator.Eq,
						value: status === 'PUBLISHED' ? 'true' : 'false',
					},
				},
			});
		} else if (status === 'FIXED' || status === 'SALE') {
			refetchPackages({
				input: {
					where: {
						key: 'saleStatus',
						operator: MatchOperator.Eq,
						value: status,
					},
				},
			});
		} else {
			refetchPackages({
				input: {
					where: {
						key: 'packageStatus',
						operator: MatchOperator.Eq,
						value: status,
					},
				},
			});
		}
	}, [status]); // const largeScreen = useMediaQuery('(min-width: 60em)');

	return (
		<div>
			{withFilter && (
				<Group position='right'>
					<Select
						size='md'
						w={300}
						data={[
							'ALL',
							'UPCOMING',
							'FINISHED',
							'ALWAYS',
							'PUBLISHED',
							'NOT-PUBLISHED',
						]}
						label='Status Filter'
						defaultValue={'ALL'}
						placeholder='Status filter'
						onChange={(e) => setStatus(e!)}
					/>
				</Group>
			)}

			<Space h={'xl'} />

			<EmptyPanel
				imgPath='/tourPackages.png'
				isShow={!loading && !packages?.length}
				title='There is no tour packages found!'
			/>

			<div className='grid lg:grid-cols-3 lg:gap-3 gap-8'>
				{new Array(skeletonCount).fill(skeletonCount).map((_, idx: number) => (
					<TourCardSkeleton key={idx} show={loading} />
				))}

				{packages?.map((TPackage: ITravelPackage, idx: number) => (
					<TourCard key={idx} TPackage={TPackage} onRefetch={refetchPackages} />
				))}
			</div>
		</div>
	);
};

export default TravelPackages;

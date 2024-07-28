import { ITravelPackage } from '@/app/api/models/travelPackage.model';
import { GET_TRAVEL_PACKAGES } from '@/app/config/gql-queries/travelPackage.query';
import { MatchOperator, SortType } from '@/app/config/gql-types';
import EmptyPanel from '@/components/common/EmptyPanels/EmptyPanel';
import TourCard from '@/components/common/Tour/TourCard';
import TourCardSkeleton from '@/components/common/Tour/TourCardSkeleton';
import { useLazyQuery } from '@apollo/client';
import { Group, Select, Space } from '@mantine/core';
import React, { useEffect, useState } from 'react';

const TravelPackages: React.FC<{
	skeletonCount: number;
	withFilter?: boolean;
}> = ({ skeletonCount, withFilter = false }) => {
	const [fetchPackages, { data, loading, refetch: refetchPackages }] =
		useLazyQuery<{
			travelPackages: { nodes: ITravelPackage[] };
		}>(GET_TRAVEL_PACKAGES, {
			variables: {
				input: {
					page: 1,
					limit: 100,
					sort: SortType.Desc,
					sortBy: '_id',
				},
			},
		});

	const [status, setStatus] = useState<string>('UPCOMING');

	useEffect(() => {
		if (status === 'ALL') {
			fetchPackages({
				variables: {
					input: {
						page: 1,
						limit: 100,
						sort: SortType.Desc,
						sortBy: '_id',
					},
				},
			});
		} else if (status === 'PUBLISHED' || status === 'NOT-PUBLISHED') {
			fetchPackages({
				variables: {
					input: {
						where: {
							page: 1,
							limit: 100,
							sort: SortType.Desc,
							sortBy: '_id',
							key: 'isPublished',
							operator: MatchOperator.Eq,
							value: status === 'PUBLISHED' ? 'true' : 'false',
						},
					},
				},
			});
		} else if (status === 'FIXED' || status === 'SALE') {
			fetchPackages({
				variables: {
					input: {
						where: {
							page: 1,
							limit: 100,
							sort: SortType.Desc,
							sortBy: '_id',
							key: 'saleStatus',
							operator: MatchOperator.Eq,
							value: status,
						},
					},
				},
			});
		} else {
			fetchPackages({
				variables: {
					input: {
						page: 1,
						limit: 100,
						sort: SortType.Desc,
						sortBy: '_id',
						where: {
							key: 'packageStatus',
							operator: MatchOperator.Eq,
							value: status,
						},
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
				isShow={!loading && !data?.travelPackages?.nodes?.length}
				title='There is no tour packages found!'
			/>

			<div className='grid lg:grid-cols-3 lg:gap-3 gap-8'>
				{new Array(skeletonCount).fill(skeletonCount).map((_, idx: number) => (
					<TourCardSkeleton key={idx} show={loading} />
				))}

				{data?.travelPackages?.nodes?.map(
					(TPackage: ITravelPackage, idx: number) => (
						<TourCard
							key={idx}
							TPackage={TPackage}
							onRefetch={refetchPackages}
						/>
					)
				)}
			</div>
		</div>
	);
};

export default TravelPackages;

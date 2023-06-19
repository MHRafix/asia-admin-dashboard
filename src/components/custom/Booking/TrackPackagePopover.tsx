import { ITravelPackage } from '@/app/api/models/travelPackage.model';
import { GET_SINGLE_TRAVEL_PACKAGE } from '@/app/config/queries/travelPackage.query';
import TourCard from '@/components/common/Tour/TourCard';
import { useQuery } from '@apollo/client';
import { Button, Popover } from '@mantine/core';
import React from 'react';

const TrackPackagePopover: React.FC<{ packageId: string }> = ({
	packageId,
}) => {
	const { data } = useQuery<{
		travelPackage: ITravelPackage;
	}>(GET_SINGLE_TRAVEL_PACKAGE, {
		variables: {
			packageId,
		},
	});

	return (
		<div>
			<Popover width={320} withArrow shadow='xl'>
				<Popover.Target>
					<Button size='xs' color='violet' variant='filled' compact>
						Track Pack
					</Button>
				</Popover.Target>
				<Popover.Dropdown p={0}>
					<TourCard TPackage={data?.travelPackage!} />
				</Popover.Dropdown>
			</Popover>
		</div>
	);
};

export default TrackPackagePopover;

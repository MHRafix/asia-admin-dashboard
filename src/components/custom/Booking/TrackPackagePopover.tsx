import { ITravelPackage } from '@/app/api/models/travelPackage.model';
import TourCard from '@/components/common/Tour/TourCard';
import { Button, Popover } from '@mantine/core';
import React from 'react';

const TrackPackagePopover: React.FC<{ TPackage: ITravelPackage }> = ({
	TPackage,
}) => {
	return (
		<div>
			{/* {JSON.stringify(packageId, null)} */}
			<Popover width={320} withArrow shadow='xl'>
				<Popover.Target>
					<Button
						size='sm'
						ff={'Nunito sans, sans-serif'}
						color='violet'
						variant='filled'
						compact
					>
						Track Pack
					</Button>
				</Popover.Target>
				<Popover.Dropdown p={0}>
					<TourCard TPackage={TPackage as ITravelPackage} />
				</Popover.Dropdown>
			</Popover>
		</div>
	);
};

export default TrackPackagePopover;

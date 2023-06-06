import { Skeleton } from '@mantine/core';
import React from 'react';

const OverViewCardSkeleton: React.FC = () => {
	return (
		<div className='grid lg:grid-cols-4 sm:grid-cols-2 gap-5'>
			<Skeleton h={125} radius={5} />
			<Skeleton h={125} radius={5} />
			<Skeleton h={125} radius={5} />
			<Skeleton h={125} radius={5} />
		</div>
	);
};

export default OverViewCardSkeleton;

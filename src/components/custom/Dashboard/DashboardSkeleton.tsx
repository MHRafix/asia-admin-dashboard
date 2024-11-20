import { Skeleton } from '@mantine/core';
import React from 'react';

const DashboardSkeleton: React.FC = () => {
	return (
		<div className='grid gap-8'>
			<div className='grid lg:grid-cols-4 sm:grid-cols-2 gap-5'>
				<Skeleton h={125} radius={5} />
				<Skeleton h={125} radius={5} />
				<Skeleton h={125} radius={5} />
				<Skeleton h={125} radius={5} />
			</div>

			<div className='mt-10 grid sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-5'>
				<Skeleton h={123} radius={5} />
				<Skeleton h={123} radius={5} />
				<Skeleton h={123} radius={5} />
				<Skeleton h={123} radius={5} />
				<Skeleton h={123} radius={5} />
				<Skeleton h={123} radius={5} />
				<Skeleton h={123} radius={5} />
				<Skeleton h={123} radius={5} />
				<Skeleton h={123} radius={5} />
				<Skeleton h={123} radius={5} />
			</div>
		</div>
	);
};

export default DashboardSkeleton;

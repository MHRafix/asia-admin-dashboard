import { Skeleton, Space } from '@mantine/core';
import React from 'react';

const DashboardSkeleton: React.FC = () => {
	return (
		<div className='grid gap-10'>
			<div className='grid lg:grid-cols-4 sm:grid-cols-2 gap-5'>
				<Skeleton h={125} radius={5} />
				<Skeleton h={125} radius={5} />
				<Skeleton h={125} radius={5} />
				<Skeleton h={125} radius={5} />
			</div>
			<div>
				<Skeleton h={500} radius={5} />
			</div>
			<div className='lg:flex gap-5'>
				<div className='lg:w-7/12'>
					<Skeleton w={300} h={40} radius={5} />
					<Space h={10} />
					<Skeleton h={500} radius={5} />
				</div>
				<div className='lg:w-5/12'>
					<Skeleton w={300} h={40} radius={5} />
					<Space h={10} />
					<Skeleton h={300} radius={5} />
				</div>
			</div>
		</div>
	);
};

export default DashboardSkeleton;

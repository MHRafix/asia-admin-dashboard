import { Skeleton } from '@mantine/core';
import React from 'react';

const ServiceSkeleton: React.FC<{ show: boolean }> = ({ show }) => {
	if (!show) {
		return null;
	}
	return (
		<>
			{new Array(6).fill(6).map((_, idx: number) => (
				<div className='relative' key={idx}>
					<Skeleton height={200} />
				</div>
			))}
		</>
	);
};

export default ServiceSkeleton;

import { Box } from '@mantine/core';
import { Flex, Skeleton } from '@mantine/core/';
import React from 'react';

const TourCardSkeleton: React.FC<{ show: boolean }> = ({ show }) => {
	if (!show) {
		return null;
	}
	return (
		<Box className='shadow-2xl rounded-lg relative my-1'>
			<Skeleton className='rounded-t-lg rounded-b-none' height={178} mb='sm' />
			<Flex justify='space-between' align='center' px={8}>
				<Skeleton width={120} height={20} radius='md' mb={10} />
				<Skeleton width={70} height={20} radius='md' mb={10} />
			</Flex>

			<Flex justify='space-between' align='center' px={8} mb={5}>
				<Skeleton width={80} height={20} radius='md' mb={10} />
				<Skeleton width={90} height={20} radius='md' mb={10} />
			</Flex>
		</Box>
	);
};

export default TourCardSkeleton;

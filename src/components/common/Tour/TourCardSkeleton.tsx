import { Box } from '@mantine/core';
import { Flex, Skeleton } from '@mantine/core/';
import React from 'react';

const TourCardSkeleton: React.FC<{ show: boolean }> = ({ show }) => {
	if (!show) {
		return null;
	}
	return (
		<Box className='bg-white drop-shadow-lg rounded-lg relative'>
			<Skeleton className='rounded-t-lg rounded-b-none' height={178} mb='sm' />
			<Flex justify='space-between' align='center' px={8}>
				<Skeleton width={120} height={20} radius='md' mb={10} />
				<Skeleton width={70} height={20} radius='md' mb={10} />
			</Flex>

			<Flex justify='space-between' align='center' px={8} mb={5}>
				<Skeleton width={80} height={20} radius='md' mb={10} />
				<Skeleton width={90} height={20} radius='md' mb={10} />
			</Flex>

			<Skeleton mx={8} width='100' height={66} radius='xl' mb={35} />

			<Flex justify='flex-end' px={8}>
				<Skeleton
					sx={{
						position: 'absolute',
						bottom: -25,
					}}
					width={150}
					height={35}
					radius='md'
					mb={10}
				/>
			</Flex>
		</Box>
	);
};

export default TourCardSkeleton;

import { Flex, Skeleton, Space } from '@mantine/core';

const EmployeeCardSkeleton = () => {
	return (
		<div className='border-solid border-slate-700 border-[1px] rounded-md py-5 px-2 text-center shadow-lg'>
			<Skeleton height={120} circle mb='xl' mx={'auto'} />
			<Skeleton height={25} />
			<Space h={10} />
			<Skeleton height={20} />
			<Space h={10} />
			<Flex gap={10} align={'center'}>
				<Skeleton height={20} width={'30%'} />
				<Space h={10} />
				<Skeleton height={20} width={'30%'} />
				<Space h={10} />
				<Skeleton height={20} width={'30%'} />
			</Flex>
			<Space h={10} />
			<Flex gap={10} align={'center'}>
				<Skeleton height={40} />
				<Skeleton height={40} />
			</Flex>
			<Space h={10} />
			<Skeleton height={40} />
		</div>
	);
};

export default EmployeeCardSkeleton;

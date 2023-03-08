import { IPaginationMeta } from '@/app/models/CommonPagination.model';
import { Button, Text } from '@mantine/core';
import Router from 'next/router';
import React from 'react';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';

interface IPaginationProps {
	isShow: boolean | number;
	meta: IPaginationMeta;
	onPageChange: (state: any) => void;
	limit: number;
	page: number;
}
const Pagination: React.FC<IPaginationProps> = ({
	isShow,
	meta,
	onPageChange,
	limit,
	page,
}) => {
	if (!isShow) {
		return null;
	}
	return (
		<div className='flex gap-3 items-center w-[200px] mx-auto my-4'>
			<Text size='sm'>
				Page: {meta?.currentPage}/{meta?.totalPages}
			</Text>
			<Button
				variant='subtle'
				size='xs'
				color='red'
				onClick={() => {
					onPageChange((prev: number) => prev - 1);
					Router.replace({
						query: { ...Router.query, limit, page: page - 1 },
					});
				}}
				disabled={meta?.currentPage === 1}
			>
				<HiChevronLeft size={20} />
			</Button>
			<Button
				disabled={!meta?.hasNextPage}
				variant='subtle'
				size='xs'
				color='red'
				onClick={() => {
					onPageChange((prev: number) => prev + 1);
					Router.replace({
						query: { ...Router.query, limit, page: page + 1 },
					});
				}}
			>
				<HiChevronRight size={20} />
			</Button>
		</div>
	);
};

export default Pagination;

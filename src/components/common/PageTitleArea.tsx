import { Box, Indicator, Text, Title } from '@mantine/core';
import Link from 'next/link';
import React from 'react';
import { IoIosArrowForward } from 'react-icons/io';

interface IPageTitleProps {
	title: string;
	tagline?: string;
	actionComponent?: JSX.Element;
	currentPathName?: string;
}

const PageTitleArea: React.FC<IPageTitleProps> = ({
	title,
	tagline,
	actionComponent,
	currentPathName,
}) => {
	return (
		<Box className='lg:flex justify-between items-center xs:grid gap-10 lg:mb-5'>
			<div className='mb-5'>
				<Title order={3} fw={500} my={5}>
					{title}
				</Title>
				<Indicator color='red' position='middle-start' size={8}>
					<Text size='sm' className='text-dimmed ml-2'>
						{tagline}
					</Text>
				</Indicator>{' '}
				<div className='gap-1 mt-2 py-[6px] px-3 shadow-sm rounded-md flex items-center'>
					<Link href={'/'} className='no-underline flex items-center gap-1'>
						Home <IoIosArrowForward size='16' />
					</Link>
					<Text>{currentPathName}</Text>
				</div>
			</div>
			<div className='text-right'>{actionComponent}</div>
		</Box>
	);
};

export default PageTitleArea;

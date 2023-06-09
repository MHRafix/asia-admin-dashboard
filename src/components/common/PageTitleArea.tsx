import { Box, Indicator, Text, Title } from '@mantine/core';
import Link from 'next/link';
import React from 'react';
import { IoIosArrowForward } from 'react-icons/io';

interface IPageTitleProps {
	title: string;
	tagline?: string;
	actionComponent?: JSX.Element;
	currentPathName?: string;
	othersPath?: IOthersPath[];
}

const PageTitleArea: React.FC<IPageTitleProps> = ({
	title,
	tagline,
	actionComponent,
	currentPathName,
	othersPath,
}) => {
	return (
		<Box className='lg:flex justify-between  xs:grid gap-10 lg:mb-5'>
			<div>
				<Title order={3} fw={500} my={5}>
					{title}
				</Title>
				{tagline && (
					<Indicator color='red' position='middle-start' size={8}>
						<Text size='sm' className='text-dimmed ml-2'>
							{tagline}
						</Text>
					</Indicator>
				)}
			</div>
			<div className='text-right mb-8 mt-3'>
				{actionComponent}
				<>
					{currentPathName && (
						<div className='lg:-mt-2 mt-3 gap-3 shadow-sm rounded-md flex justify-end items-center'>
							{othersPath?.map((path: IOthersPath, idx: number) => (
								<Link
									key={idx}
									href={path?.href}
									className='no-underline flex items-center gap-1'
								>
									{path?.pathName} &nbsp; <IoIosArrowForward size='16' />
								</Link>
							))}
							<Text>{currentPathName}</Text>
						</div>
					)}
				</>
			</div>
		</Box>
	);
};

export default PageTitleArea;

interface IOthersPath {
	pathName: string;
	href: string;
}

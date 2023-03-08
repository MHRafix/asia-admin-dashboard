import { Flex, Indicator, Text, Title } from '@mantine/core';
import React from 'react';

interface IPageTitleProps {
	title: string;
	tagline?: string;
	actionComponent?: JSX.Element;
}

const PageTitleArea: React.FC<IPageTitleProps> = ({
	title,
	tagline,
	actionComponent,
}) => {
	return (
		<Flex justify='space-between' align='center' mb={30}>
			<div>
				<Title order={3} fw={500} my={5}>
					{title}
				</Title>
				<Indicator color='red' position='middle-start' size={8}>
					<Text size='sm' className='text-dimmed ml-2'>
						{tagline}
					</Text>
				</Indicator>
			</div>

			<div>{actionComponent}</div>
		</Flex>
	);
};

export default PageTitleArea;

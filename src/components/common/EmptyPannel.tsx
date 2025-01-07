import { Button, Paper, Text } from '@mantine/core';
import React from 'react';

interface IEmptyPannelProps {
	isShow: boolean;
	title: string;
	Icon?: JSX.Element;
	actionBtnLabel?: string;
	ActionBtnIcon?: JSX.Element;
}

const EmptyPannel: React.FC<IEmptyPannelProps> = ({
	isShow,
	title,
	Icon,
	actionBtnLabel,
	ActionBtnIcon,
}) => {
	if (!isShow) {
		return null;
	}
	return (
		<Paper className='text-center p-10 my-5 lg:w-6/12 w-full mx-auto'>
			<div>{Icon}</div>
			<Text color='red' fw={500}>
				{title}
			</Text>
			{actionBtnLabel && (
				<Button
					leftIcon={ActionBtnIcon}
					variant='light'
					color='violet'
					size='sm'
					my={5}
				>
					{actionBtnLabel}
				</Button>
			)}
		</Paper>
	);
};

export default EmptyPannel;

import { Button, Text } from '@mantine/core';
import React from 'react';
import { BsBookmarkPlus } from 'react-icons/bs';

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
		<div className='text-center my-5'>
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
		</div>
	);
};

export default EmptyPannel;

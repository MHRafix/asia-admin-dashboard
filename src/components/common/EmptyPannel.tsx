import { Button, Text } from '@mantine/core';
import React from 'react';
import { BsBookmarkCheck, BsBookmarkPlus } from 'react-icons/bs';

const EmptyPannel: React.FC<{ isShow: boolean; title: string }> = ({
	isShow,
	title,
}) => {
	if (!isShow) {
		return null;
	}
	return (
		<div className='text-center my-5'>
			<div>
				<BsBookmarkCheck size={40} color='red' />
			</div>
			<Text color='red' fw={500}>
				{title}
			</Text>
			<Button
				leftIcon={<BsBookmarkPlus size={20} />}
				variant='light'
				color='violet'
				size='sm'
				my={5}
			>
				Add Booking
			</Button>
		</div>
	);
};

export default EmptyPannel;

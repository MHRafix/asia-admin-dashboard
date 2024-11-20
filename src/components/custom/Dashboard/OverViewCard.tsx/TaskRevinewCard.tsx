import { ITaskRevinewDataType } from '@/app/api/models/dashboard.model';
import { Paper, Space, Text, Title } from '@mantine/core';
import React from 'react';
import { CountUp } from 'use-count-up';

const TaskRevinewCard: React.FC<{
	revinew: ITaskRevinewDataType;
}> = React.memo(({ revinew }) => {
	return (
		<Paper shadow='md' px={15} py={10} bg={'#212231'} radius={5}>
			<Title order={5}>{revinew?.title}</Title>
			<Space h={5} />

			<div className='grid grid-cols-2 gap-2'>
				<Text fw={500} color='orange'>
					Total amount
				</Text>
				<Text fw={500} color='orange' ta={'end'}>
					<CountUp
						isCounting
						end={revinew?.totalAmount || 0}
						duration={3}
						thousandsSeparator=','
					/>{' '}
					BDT
				</Text>
			</div>
			<div className='grid grid-cols-2 gap-2'>
				<Text fw={500} color='teal'>
					Paid amount
				</Text>
				<Text fw={500} color='teal' ta={'end'}>
					<CountUp
						isCounting
						end={revinew?.paidAmount || 0}
						duration={3}
						thousandsSeparator=','
					/>{' '}
					BDT
				</Text>
			</div>
			<div className='grid grid-cols-2 gap-2'>
				<Text fw={500} color='red'>
					Due amount
				</Text>
				<Text fw={500} color='red' ta={'end'}>
					<CountUp
						isCounting
						end={revinew?.dueAmount || 0}
						duration={3}
						thousandsSeparator=','
					/>{' '}
					BDT
				</Text>
			</div>
		</Paper>
	);
});

export default TaskRevinewCard;

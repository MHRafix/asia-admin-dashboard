import { Card } from '@mantine/core';
import React from 'react';

const TravelOutline: React.FC<{ description: string }> = ({ description }) => {
	return (
		<Card px={{ xs: 'sm', sm: 'lg' }} radius='md' shadow='lg' bg='#212231'>
			<div dangerouslySetInnerHTML={{ __html: description }}></div>
		</Card>
	);
};

export default TravelOutline;

import { Loader } from '@mantine/core';
import React from 'react';

const CircularLoader: React.FC<{ isShow: boolean }> = ({ isShow }) => {
	if (!isShow) {
		return null;
	}
	return (
		<Loader
			color='violet'
			size='sm'
			className='w-full mx-auto mt-5 text-center'
		/>
	);
};

export default CircularLoader;

import { Burger } from '@mantine/core';
import React from 'react';

const Header: React.FC<{
	opened: boolean;
	setOpened: (state: boolean) => void;
}> = ({ opened, setOpened }) => {
	return (
		<div className='bg-[#1D1E2B] px-3 py-2 border-[0px] border-b-[1px] border-b-slate-600 sm:!block md:!hidden border-solid'>
			<Burger
				// className='sm:!block md:!hidden'
				opened={opened}
				onClick={() => setOpened(!opened)}
				// @ts-ignore
				color={opened && 'red'}
			/>
		</div>
	);
};

export default Header;

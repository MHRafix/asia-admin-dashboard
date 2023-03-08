import { Burger, MediaQuery } from '@mantine/core';
import React from 'react';
import HeaderUserMenu from './HeaderUserMenu';

interface Props {
	title?: string;
	Actions?: React.ReactNode;
	mobileMenuOpen: boolean;
	setMobileMenuOpen: () => void;
}

const AdminNavbar: React.FC<Props> = ({
	title,
	Actions,
	mobileMenuOpen,
	setMobileMenuOpen,
}) => {
	return (
		<div className='bg-[#212231] flex items-center justify-between w-full gap-4 px-4  rounded-sm h-14 drop-shadow-2xl'>
			<div className='flex items-center justify-between w-full'>
				<MediaQuery largerThan='sm' styles={{ display: 'none' }}>
					<Burger
						opened={mobileMenuOpen}
						onClick={setMobileMenuOpen}
						className='mr-2'
						size='sm'
						mr='xl'
					/>
				</MediaQuery>
				<div className='flex items-center justify-between w-full'>
					{/* <Image src={Logo} alt='Logo' width={100} height={100} /> */}
					<div>{Actions}</div>
				</div>
			</div>
			<HeaderUserMenu />
		</div>
	);
};

export default AdminNavbar;

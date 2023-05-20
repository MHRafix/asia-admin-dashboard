import { ActionIcon, Burger, MediaQuery } from '@mantine/core';
import React from 'react';
import HeaderUserMenu from './HeaderUserMenu';
import { MdArrowBackIosNew } from 'react-icons/md';
import Router, { useRouter } from 'next/router';

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
	const router = useRouter();
	return (
		<div className='bg-[#212231] flex items-center justify-between w-full sm:px-10 px-3 rounded-sm h-16 drop-shadow-2xl'>
			<div className='flex items-center justify-between w-full'>
				<div className='flex items-center justify-between w-full'>
					<div>
						{router.pathname !== '/' && (
							<ActionIcon
								size={'xl'}
								radius={100}
								color='violet'
								onClick={() => Router.back()}
							>
								<MdArrowBackIosNew size={18} />
							</ActionIcon>
						)}
					</div>
					{/* <Image src={Logo} alt='Logo' width={100} height={100} /> */}
					<div>{Actions}</div>
				</div>
			</div>
			<HeaderUserMenu />
		</div>
	);
};

export default AdminNavbar;

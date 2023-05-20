import protectWithSession from '@/app/config/authProtection/protectWithSession';
import AdminLayout from '@/components/layouts/AdminLayout';
import { menus } from '@/components/layouts/appshell-components/menus';
import {
	Container,
	Space,
	Text,
	ThemeIcon,
	UnstyledButton,
} from '@mantine/core';
import { NextPage } from 'next';
import { Inter } from 'next/font/google';
import Router from 'next/router';

const inter = Inter({ subsets: ['latin'] });

const HomePage: NextPage = () => {
	return (
		<>
			<AdminLayout title='Home'>
				{/* <Container size={'lg'}> */}
				<div className='grid gap-5 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2'>
					{menus.map((menu, idx: number) => (
						<UnstyledButton
							key={idx}
							onClick={() => Router.push(`/${menu?.href}`)}
							// disabled={menu?.disabled}
							className='no-underline relative bg-[#212231] hover:bg-[#262736] disabled:bg-slate-800 disabled:cursor-not-allowed rounded-md'
						>
							<div className='p-5 text-center rounded-md shadow-2xl '>
								<ThemeIcon
									variant='outline'
									radius='md'
									size={70}
									color='gray'
									className='border-[1px] border-[#333]'
								>
									{menu?.icon}
								</ThemeIcon>
								<Text size='md' mt={20} color='#fff' className='capitalize'>
									{menu?.label}
								</Text>
							</div>
							<Text
								size='md'
								mt={20}
								color='#fff'
								className='absolute top-0 left-2 z-50 px-1 py-[7px] text-xs font-semibold capitalize transform bg-red-500 rounded-full'
							>
								{90 + idx}+
							</Text>
						</UnstyledButton>
					))}
				</div>
				{/* </Container> */}
			</AdminLayout>
		</>
	);
};

export default protectWithSession(HomePage);

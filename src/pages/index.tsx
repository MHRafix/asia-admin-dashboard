import protectWithSession from '@/app/config/authProtection/protectWithSession';
import AdminLayout from '@/components/layouts/AdminLayout';
import { Space } from '@mantine/core';
import { NextPage } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

const HomePage: NextPage = () => {
	return (
		<>
			<AdminLayout title='Dashboard'>
				<Space h={'xl'} />
				Dashboard
			</AdminLayout>
		</>
	);
};

export default protectWithSession(HomePage);

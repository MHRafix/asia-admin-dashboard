import AdminLayout from '@/components/layouts/AdminLayout';
import { Space } from '@mantine/core';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
	return (
		<>
			<AdminLayout title='Dashboard'>
				<Space h={'xl'} />
				Dashboard
			</AdminLayout>
		</>
	);
}

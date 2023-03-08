import AdminLayout from '@/components/layouts/AdminLayout';
import { Space } from '@mantine/core';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
	return (
		<>
			{/* <Head>
				<title>Create Next App</title>
				<meta name='description' content='Generated by create next app' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head> */}
			<AdminLayout title='Asia Admin'>
				<Space h={'xl'} />
				Dashboard
			</AdminLayout>
		</>
	);
}

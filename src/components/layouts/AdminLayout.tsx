import { AppShell } from '@mantine/core';
import Head from 'next/head';
import { PropsWithChildren, useState } from 'react';
import AdminMenu from './appshell-components/AdminMenu';
import AdminNavbar from './appshell-components/AdminNavbar';

interface Props {
	title: string;
	Actions?: React.ReactNode;
}

const AdminLayout: React.FC<PropsWithChildren<Props>> = ({
	children,
	title,
	Actions,
}) => {
	const [opened, setOpened] = useState(false);
	return (
		<div className='text-white'>
			<Head>
				<title>Asia Admin - {title}</title>
				<meta
					name='viewport'
					content='minimum-scale=1, initial-scale=1, width=device-width'
				/>
			</Head>
			<AppShell
				styles={{
					main: { background: `#1D1E2B` },
				}}
				navbarOffsetBreakpoint='sm'
				asideOffsetBreakpoint='sm'
				navbar={
					<AdminMenu
						width={{ base: 300 }}
						height={500}
						style={'dark:bg-black'}
						opened={opened}
					/>
				}
				header={
					<AdminNavbar
						title={title}
						Actions={Actions}
						mobileMenuOpen={opened}
						setMobileMenuOpen={() => setOpened(!opened)}
					/>
				}
			>
				<div className='bg-[#1D1E2B] pr-5 mt-5'>{children}</div>
			</AppShell>
		</div>
	);
};

export default AdminLayout;

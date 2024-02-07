import { AppShell } from '@mantine/core';
import Head from 'next/head';
import { PropsWithChildren, useState } from 'react';
import AdminMenu from './appshell-components/AdminMenu';
import Header from './appshell-components/Header';

interface Props {
	title?: string;
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
				<title>Asia admin - {title ? title : 'Dashboard'}</title>
				<meta
					name='viewport'
					content='minimum-scale=1, initial-scale=1, width=device-width'
				/>
			</Head>
			<AppShell
				styles={{
					main: { background: `#1D1E2B` },
				}}
				header={<Header opened={opened} setOpened={setOpened} />}
				// navbarOffsetBreakpoint='sm'
				// asideOffsetBreakpoint='sm'
				navbar={<AdminMenu opened={opened} setOpened={setOpened} />}
			>
				<main className='bg-[#1D1E2B] sm:pr-2 px-0'>{children}</main>
			</AppShell>
		</div>
	);
};

export default AdminLayout;

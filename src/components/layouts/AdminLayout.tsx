import { AppShell } from '@mantine/core';
import { PropsWithChildren, useState } from 'react';
import AdminMenu from './appshell-components/AdminMenu';
import AdminNavbar from './appshell-components/AdminNavbar';

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
				<main className='bg-[#1D1E2B]'>{children}</main>
			</AppShell>
		</div>
	);
};

export default AdminLayout;

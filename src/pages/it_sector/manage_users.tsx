import protectWithSession from '@/app/config/authProtection/protectWithSession';
import UsersTable from '@/components/custom/Manage_Users/UsersTable';
import AdminLayout from '@/components/layouts/AdminLayout';
import { NextPage } from 'next';

const UserManagementPage: NextPage = () => {
	return (
		<AdminLayout title='User Management'>
			<UsersTable />
		</AdminLayout>
	);
};

export default protectWithSession(UserManagementPage);

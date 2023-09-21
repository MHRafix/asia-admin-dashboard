import protectWithSession from '@/app/config/authProtection/protectWithSession';
import EmployeesList from '@/components/custom/Employees/EmployeesList';
import AdminLayout from '@/components/layouts/AdminLayout';
import { NextPage } from 'next';

const Employees: NextPage = () => {
	return (
		<AdminLayout title='Employees'>
			<EmployeesList />
		</AdminLayout>
	);
};

export default protectWithSession(Employees);

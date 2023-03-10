import EmployeesTable from '@/components/custom/Employees/EmployeesTable';
import AdminLayout from '@/components/layouts/AdminLayout';
import { NextPage } from 'next';

const Employees: NextPage = () => {
	return (
		<AdminLayout title='Employees'>
			<EmployeesTable />
		</AdminLayout>
	);
};

export default Employees;

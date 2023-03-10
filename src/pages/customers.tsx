import CustomerTable from '@/components/custom/Customers/CustomerTable';
import AdminLayout from '@/components/layouts/AdminLayout';
import { NextPage } from 'next';

const CustomerPage: NextPage = () => {
	return (
		<AdminLayout title='Customers'>
			<CustomerTable />
		</AdminLayout>
	);
};

export default CustomerPage;

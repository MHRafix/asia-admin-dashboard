import AppointmentsTable from '@/components/custom/Appointments/AppointmentsTable';
import AdminLayout from '@/components/layouts/AdminLayout';
import { NextPage } from 'next';

const Appointments: NextPage = () => {
	return (
		<AdminLayout title='Appointments'>
			<AppointmentsTable />
		</AdminLayout>
	);
};

export default Appointments;

import protectWithSession from '@/app/config/authProtection/protectWithSession';
import BookingTable from '@/components/custom/Booking/BookingTable';
import AdminLayout from '@/components/layouts/AdminLayout';
import { NextPage } from 'next';

const BookingPage: NextPage = () => {
	return (
		<AdminLayout title='Bookings'>
			<BookingTable />
		</AdminLayout>
	);
};

export default protectWithSession(BookingPage);

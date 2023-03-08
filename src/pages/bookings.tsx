import BookingTable from '@/components/custom/Booking/BookingTable';
import AdminLayout from '@/components/layouts/AdminLayout';
import { format } from 'date-fns';
import { NextPage } from 'next';

const BookingPage: NextPage = () => {
	const result = format(new Date(), 'MMMM yyyy');

	return (
		<AdminLayout>
			<BookingTable />
		</AdminLayout>
	);
};

export default BookingPage;

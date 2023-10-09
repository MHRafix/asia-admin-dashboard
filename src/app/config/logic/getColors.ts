import { PAYMENT_STATUS } from '@/app/api/models/bookings.model';
import { Attendance_Status } from '../gql';

export const getBadgeColors = (status: string) => {
	switch (status) {
		case 'PENDING':
			return 'orange';
		case 'APPROVED':
			return 'violet';
		case 'COMPLETED':
			return 'teal';

		default:
			return 'red';
	}
};

export const getAttendanceStatusColor = (status: Attendance_Status) => {
	switch (status) {
		case 'PENDING':
			return 'orange';
		case 'VERIFIED':
			return 'teal';
		case 'NOT_PRESENT':
			return 'red';

		default:
			return 'violet';
	}
};

export const getPaymentBadgeColors = (status: string) => {
	switch (status) {
		case PAYMENT_STATUS[0]:
			return 'red';
		case PAYMENT_STATUS[1]:
			return 'violet';
		case PAYMENT_STATUS[2]:
			return 'teal';

		default:
			return 'red';
	}
};

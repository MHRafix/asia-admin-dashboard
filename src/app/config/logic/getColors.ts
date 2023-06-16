import { PAYMENT_STATUS } from '@/app/api/models/bookings.model';

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

export const getPaymentBadgeColors = (status: string) => {
	switch (status) {
		case PAYMENT_STATUS.DUE:
			return 'red';
		case PAYMENT_STATUS.IN_REVIEW_PAID:
			return 'violet';
		case PAYMENT_STATUS.PAID:
			return 'teal';

		default:
			return 'red';
	}
};

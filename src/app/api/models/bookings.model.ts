export interface IBooking {
	_id?: string;
	customerDetails: { name?: string; email?: string; phone?: string };
	street?: string;
	city?: string;
	country?: string;
	packageId?: string;
	status?: string;
	transactionId?: string;
	paymentDetails: IPaymentDetails;
}

export interface IPaymentDetails {
	paymentStatus: string;
	totalAmount: number;
	paidFrom: string;
	paymentMethod: string;
	paymentDateTime: null;
}

export enum BOOKING_STATUS {
	PENDING = 'PENDING',
	APPROVED = 'APPROVED',
	CANCELED = 'CANCELED',
	COMPLETED = 'COMPLETED',
}

export const PAYMENT_STATUS = ['DUE', 'IN_REVIEW_PAID', 'PAID', 'PAID'];

export const STATUS_ARR = ['PENDING', 'APPROVED', 'COMPLETED', 'CANCELED'];

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

export enum PAYMENT_STATUS {
	DUE = 'DUE',
	IN_REVIEW_PAID = 'IN_REVIEW_PAID',
	PAID = 'PAID',
}

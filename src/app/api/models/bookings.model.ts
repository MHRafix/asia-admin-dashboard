import { ITravelPackage } from './travelPackage.model';
import { IUser } from './users.model';

export interface IBooking {
	_id?: string;
	customerDetails: IUser;
	paymentDetails: IPaymentDetails;
	travelerDetails: {
		adult: number;
		child: number;
	};
	street?: string;
	city?: string;
	country?: string;
	packageId?: ITravelPackage;
	status?: string;
	transactionId?: string;
	bookingId?: string;
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

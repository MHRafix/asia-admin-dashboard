export interface IBooking {
	_id?: string;
	customerDetails: { name?: string; email?: string; phone?: string };
	street?: string;
	city?: string;
	country?: string;
	packageId?: string;
	status?: string;
	paymentStatus?: string;
	paymentDateTime?: string;
	amount?: number;
	transactionId?: string;
	paymentMethod?: string;
}

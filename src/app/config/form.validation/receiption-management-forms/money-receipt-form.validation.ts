import * as Yup from 'yup';

export const Money_Receipt_Form_Schema = Yup.object().shape({
	clientName: Yup.string().required().label('Client name'),
	passportNo: Yup.string().required().label('Passport no'),
	paymentType: Yup.string().required().label('Payment type'),
	service: Yup.string().required().label('Service'),
	amountInWords: Yup.string().required().label('Amount'),
	amountInNumber: Yup.number().required().label('Amount'),
	quantity: Yup.number().required().label('Quantity'),
	issueDate: Yup.date().required().label('Issue date'),
	deliveryDate: Yup.date().required().label('Delivery date'),
});

export type Money_Receipt_Form_Type = Yup.InferType<
	typeof Money_Receipt_Form_Schema
>;

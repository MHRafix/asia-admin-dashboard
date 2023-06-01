import * as Yup from 'yup';
import { getDateRange } from '../../logic/getDateRanges';

const dateRange = getDateRange();

export const CREATE_PACKAGE_FORM_DEFAULT_VALUE = {
	packageTitle: '',
	regularPrice: 120,
	salePrice: 99,
	destination: '',
	bookingStart: dateRange[0],
	bookingEnd: dateRange[1],
	shortDescription: '',
};

export const CREATE_PACKAGE_FORM_SCHEMA = Yup.object().shape({
	packageTitle: Yup.string().required().label('Package title'),
	regularPrice: Yup.number().min(1).required().label('Regular price'),
	salePrice: Yup.number()
		.min(0)
		.lessThan(Yup.ref('regularPrice'))
		.label('Sale price'),
	destination: Yup.string().required().label('Destination'),
	bookingStart: Yup.date().required().label('Booking start date'),
	bookingEnd: Yup.date().required().label('Booking close date'),
	shortDescription: Yup.string().required().min(10).label('Short description'),
});

import * as Yup from 'yup';
import { getDateRange } from '../../logic/getDateRanges';

const dateRange = getDateRange();

export const CREATE_PACKAGE_FORM_BASIC_INFO_DEFAULT_VALUE = {
	packageTitle: '',
	regularPrice: 120,
	salePrice: 99,
	destination: '',
	bookingStart: dateRange[0],
	bookingEnd: dateRange[1],
	shortDescription: '',
};

export const CREATE_PACKAGE_FORM_BASIC_INFO_SCHEMA = Yup.object().shape({
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

// departure and destination form configuration
export const DEPARTURE_DESTINATION_FORM_DEFAULT_VALUES = {
	departureFrom: {
		name: 'Dhaka, Bangladesh',
		lat: ' 23.810332',
		lng: '90.41251809999994',
	},
	destination: {
		name: '',
		lat: '',
		lng: '',
	},
};

export const DEPARTURE_DESTINATION_FORM_SCHEMA = Yup.object().shape({
	departureFrom: Yup.object().shape({
		name: Yup.string().required().label('Departure from'),
		lat: Yup.string().required().label('Departure latitude'),
		lng: Yup.string().required().label('Departure longitude'),
	}),
	destination: Yup.object().shape({
		name: Yup.string().required().label('Destination'),
		lat: Yup.string().required().label('Destination latitude'),
		lng: Yup.string().required().label('Destination longitude'),
	}),
});

export interface IDepartureAndDestinationFormStates {
	departureFrom: {
		name: string;
		lat: string;
		lng: string;
	};
	destination: {
		name: string;
		lat: string;
		lng: string;
	};
}

import * as Yup from 'yup';

// departure and destination form configuration
export const APP_SETTINGS_FORM_DEFAULT_VALUES = {
	visaCategories: [
		{
			visaCategory: '',
		},
	],

	countriesVisa: [
		{
			country: '',
			visaCategory: '',
		},
	],

	branches: [
		{
			branchName: '',
			email: '',
			phone: '',
			address: {
				name: '',
				lat: '',
				lng: '',
			},
		},
	],
};

export const APP_SETTINGS_FORM_SCHEMA = Yup.object().shape({
	visaCategories: Yup.array().of(
		Yup.object().shape({
			visaCategory: Yup.string().required().label('Visa category'),
		})
	),

	countriesVisa: Yup.array().of(
		Yup.object().shape({
			country: Yup.string().required().label('Country'),
			visaCategory: Yup.string().required().label('Visa category'),
		})
	),

	branches: Yup.array().of(
		Yup.object().shape({
			branchName: Yup.string().required().label('Branch name'),
			phone: Yup.string().required().label('Branch phone number'),
			email: Yup.string().email().required().label('Branch email'),
			address: Yup.object().shape({
				name: Yup.string().required().label('Address'),
				lat: Yup.string().label('Address latitude'),
				lng: Yup.string().label('Address longitude'),
			}),
		})
	),
});

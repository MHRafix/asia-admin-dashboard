import * as Yup from 'yup';

// departure and destination form configuration
export const APP_SETTINGS_FORM_DEFAULT_VALUES = {
	visaCategories: [''],

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
	visaCategories: Yup.array().of(Yup.string().label('Categories')),

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
			address: Yup.string().required().label('Address'),
		})
	),
});

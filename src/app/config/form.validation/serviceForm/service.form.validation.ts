export const UPDATE_SERVICE_DEFAULT_VALUES = {
	title: '',
	shortDesc: '',
	price: 100,
	isCustomizable: false,
};

import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
	email: Yup.string().required().email().label('Email'),
	password: Yup.string().min(6).label('Password'),
});

export const updateServiceSchema = Yup.object().shape({
	title: Yup.string().nullable().required().label('Service title'),
	shortDesc: Yup.string().nullable().required().label('Short description'),
	price: Yup.string().required().nullable().label('Service price'),
	isCustomizable: Yup.boolean(),
});

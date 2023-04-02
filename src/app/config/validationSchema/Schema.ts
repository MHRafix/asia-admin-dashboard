import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
	email: Yup.string().required().email().label('Email'),
	password: Yup.string().min(6).label('Password'),
});

export const updateServiceSchema = Yup.object().shape({
	title: Yup.string().nullable().required().label('Service title'),
	shortDesc: Yup.string().nullable().required().label('Short description'),
	price: Yup.string().required().nullable().label('Service price'),
	isCustomizeable: Yup.boolean().nullable().label('Service price'),
});

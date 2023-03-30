import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
	email: Yup.string()
		.required('Email is a required field')
		.email('Type a valid email.'),
	password: Yup.string().min(6, 'Password should have atleast 6 charecters!'),
});

export const updateServiceSchema = Yup.object().shape({
	title: Yup.string().nullable().required().label('Service title'),
	shortDesc: Yup.string().nullable().required().label('Short description'),
	price: Yup.string().required().nullable().label('Service price'),
	isCustomizeable: Yup.boolean().nullable().label('Service price'),
});

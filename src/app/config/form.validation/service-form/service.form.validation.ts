export const UPDATE_SERVICE_DEFAULT_VALUES = {
	title: '',
	shortDesc: '',
};

export const UPDATE_BLOG_DEFAULT_VALUES = {
	title: '',
	description: '',
	shortDescription: '',
};

export const UPDATE_REQ_DEFAULT_VALUES = {
	title: '',
	description: '',
	destinationCountry: 'Afghanistan',
	visaType: 'Tourist',
};

import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
	email: Yup.string().required().email().label('Email'),
	password: Yup.string().min(6).label('Password'),
});

export const updateServiceSchema = Yup.object().shape({
	title: Yup.string().nullable().required().label('Service title'),
	shortDesc: Yup.string().nullable().required().label('Short description'),
});

export const updateBlogSchema = Yup.object().shape({
	title: Yup.string().required().label('Title'),
	description: Yup.string().required().label('Description'),
	shortDescription: Yup.string().required().label('Short description'),
});

export const updateReqSchema = Yup.object().shape({
	title: Yup.string().required().label('Title'),
	description: Yup.string().required().label('Description'),
	destinationCountry: Yup.string().required().label('Country'),
	visaType: Yup.string().required().label('Visa type'),
});

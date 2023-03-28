import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
	email: Yup.string()
		.required('Email is a required field')
		.email('Type a valid email.'),
	password: Yup.string().min(6, 'Password should have atleast 6 charecters!'),
});

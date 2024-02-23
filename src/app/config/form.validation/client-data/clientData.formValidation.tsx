import * as Yup from 'yup';

export const Client_Data_Form_Validation_Schema = Yup.object().shape({
	name: Yup.string().required().label('Name'),
	address: Yup.string().required().label('Address'),
	email: Yup.string().required().label('Email'),
	facebook: Yup.string().optional().nullable().label('Social contact'),
	phone: Yup.string().required().label('Phone'),
});

export interface IClientDataFormState {
	name: string;
	address: string;
	email: string;
	facebook: null | undefined | string;
	phone: string;
}

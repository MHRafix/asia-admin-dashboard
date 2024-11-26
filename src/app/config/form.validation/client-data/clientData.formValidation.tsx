import * as Yup from 'yup';

export const Client_Data_Form_Validation_Schema = Yup.object().shape({
	name: Yup.string().required().label('Name'),
	email: Yup.string().required().label('Email'),
	phone: Yup.string().required().label('Phone'),
});

export interface IClientDataFormState {
	name: string;
	email: string;
	phone: string;
}

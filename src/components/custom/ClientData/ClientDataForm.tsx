import { IClient } from '@/app/api/models/client.model';
import { Notify } from '@/app/config/alertNotification/Notification';
import {
	Client_Data_Form_Validation_Schema,
	IClientDataFormState,
} from '@/app/config/form.validation/client-data/clientData.formValidation';
import {
	Create_Client_Data,
	Update_Client_Data,
} from '@/app/config/queries/clientsData.query';
import { useMutation } from '@apollo/client';
import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Input, Space } from '@mantine/core';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

const ClientDataForm: React.FC<{
	onSuccess: () => void;
	operationType: 'create' | 'update';
	operationPayload?: IClient;
}> = ({ onSuccess, operationType, operationPayload }) => {
	// form initiate here
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<IClientDataFormState>({
		resolver: yupResolver(Client_Data_Form_Validation_Schema),
	});

	// create mutation
	const [createClientData, { loading: creating }] = useMutation(
		Create_Client_Data,
		Notify({
			sucTitle: 'Client data created',
			action: () => onSuccess(),
		})
	);

	// update mutation
	const [updateClientData, { loading: updating }] = useMutation(
		Update_Client_Data,
		Notify({
			sucTitle: 'Client data updated',
			action: () => {
				onSuccess();
			},
		})
	);

	// prefill form
	useEffect(() => {
		setValue('name', operationPayload?.name as string);
		setValue('email', operationPayload?.email as string);
		setValue('facebook', operationPayload?.facebook as string);
		setValue('phone', operationPayload?.phone as string);
		setValue('address', operationPayload?.address as string);
	}, [operationPayload]);

	// submit form function
	const onSubmit = (payload: IClientDataFormState) => {
		// if create
		if (operationType === 'create') {
			createClientData({
				variables: {
					payload,
				},
			});
		}
		// else update
		else {
			updateClientData({
				variables: {
					payload: {
						...payload,
						_id: operationPayload?._id,
					},
				},
			});
		}
	};

	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Input.Wrapper
					label='Name'
					error={<ErrorMessage name='name' errors={errors} />}
				>
					<Input {...register('name')} placeholder='Type client name' />
				</Input.Wrapper>

				<Space h={'sm'} />

				<Input.Wrapper
					label='Email'
					error={<ErrorMessage name='email' errors={errors} />}
				>
					<Input {...register('email')} placeholder='Type email' />
				</Input.Wrapper>

				<Space h={'sm'} />

				<Input.Wrapper
					label='Phone'
					error={<ErrorMessage name='phone' errors={errors} />}
				>
					<Input {...register('phone')} placeholder='Type phone' />
				</Input.Wrapper>

				<Space h={'sm'} />

				<Input.Wrapper
					label='Social contact'
					error={<ErrorMessage name='facebook' errors={errors} />}
				>
					<Input {...register('facebook')} placeholder='Type social contact' />
				</Input.Wrapper>

				<Space h={'sm'} />

				<Input.Wrapper
					label='Address'
					error={<ErrorMessage name='address' errors={errors} />}
				>
					<Input {...register('address')} placeholder='Type address' />
				</Input.Wrapper>

				<Space h={'sm'} />

				<Button
					type='submit'
					loading={creating || updating}
					color='teal'
					fullWidth
				>
					Save
				</Button>
			</form>
		</div>
	);
};

export default ClientDataForm;

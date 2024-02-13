import { Payment__Types__Input__Data } from '@/app/api/models/common.model';
import { MoneyReceipt } from '@/app/api/models/money-receipt.model';
import { Notify } from '@/app/config/alertNotification/Notification';
import {
	Money_Receipt_Form_Schema,
	Money_Receipt_Form_Type,
} from '@/app/config/form.validation/receiption-management-forms/money-receipt-form.validation';
import { useGetSession } from '@/app/config/logic/getSession';
import {
	CREATE_MONEY_RECEIPT_MUTATION,
	UPDATE_MONEY_RECEIPT_MUTATION,
} from '@/app/config/queries/money-receipt.query';
import { GET_SERVICES_FOR_INPUT } from '@/app/config/queries/service.query';
import { getSelectInputData } from '@/app/utils/getSelectInputData';
import { useMutation, useQuery } from '@apollo/client';
import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Input, NumberInput, Select, Space } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import dayjs from 'dayjs';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

const MoneyReceiptCreateForm: React.FC<{
	operationType: string;
	receipt?: MoneyReceipt;
	refetch: () => void;
	prevReceipts: MoneyReceipt[];
}> = ({ operationType, refetch, receipt, prevReceipts }) => {
	const { user } = useGetSession();

	// form initiate here
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
		watch,
	} = useForm<Money_Receipt_Form_Type>({
		defaultValues: {
			deliveryDate: new Date(),
			issueDate: new Date(),
		},
		resolver: yupResolver(Money_Receipt_Form_Schema),
		mode: 'onChange',
	});

	// get services
	const { data: SERVICE__DATA, loading: services__fetching } = useQuery(
		GET_SERVICES_FOR_INPUT
	);

	// create receipt api
	const [createReceipt, { loading: creating__receipt }] = useMutation(
		CREATE_MONEY_RECEIPT_MUTATION,
		Notify({
			sucTitle: 'Receipt created successfully!',
			action: () => {
				refetch();
			},
		})
	);

	// update receipt api
	const [updateReceipt, { loading: updating__receipt }] = useMutation(
		UPDATE_MONEY_RECEIPT_MUTATION,
		Notify({
			sucTitle: 'Receipt updated successfully!',
			action: () => {
				refetch();
			},
		})
	);

	// prefill receipt form
	useEffect(() => {
		if (operationType === 'update' && receipt) {
			setValue('clientName', receipt?.clientName);
			setValue('passportNo', receipt?.passportNo);
			setValue('service', receipt?.service?._id);
			setValue('amountInWords', receipt?.amountInWords);
			setValue('amountInNumber', receipt?.amountInNumber);
			setValue('quantity', receipt?.quantity);
			setValue('paymentType', receipt?.paymentType);
			setValue('issueDate', receipt?.issueDate);
			setValue('deliveryDate', receipt?.deliveryDate);
		}
	}, [receipt]);

	// handle submit form
	const submitForm = (values: Money_Receipt_Form_Type) => {
		// console.log(values);
		if (operationType === 'create') {
			createReceipt({
				variables: {
					input: {
						...values,
						authorizeBy: user?._id,
						mrNo: prevReceipts?.length + 1,
						serialNo: prevReceipts?.length + 1,
					},
				},
			});
		} else {
			// updateReceipt({
			// 	variables: {},
			// });
			alert('Api err');
		}
	};

	return (
		<div>
			<form onSubmit={handleSubmit(submitForm)}>
				<Input.Wrapper
					size='md'
					label='Client name'
					error={<ErrorMessage errors={errors} name='clientName' />}
				>
					<Input {...register('clientName')} placeholder='Mehedi H. Rafiz' />
				</Input.Wrapper>

				<Space h={'sm'} />

				<Input.Wrapper
					size='md'
					label='Passport no'
					error={<ErrorMessage errors={errors} name='passportNo' />}
				>
					<Input {...register('passportNo')} placeholder='A10*********' />
				</Input.Wrapper>

				<Space h={'sm'} />

				<Input.Wrapper
					size='md'
					label='Select service'
					error={<ErrorMessage errors={errors} name='service' />}
				>
					<Select
						data={getSelectInputData(SERVICE__DATA?.services?.nodes!)}
						placeholder='Visa Processing'
						disabled={services__fetching}
						value={watch('service')}
						onChange={(e) => setValue('service', e as string)}
					/>
				</Input.Wrapper>

				<Space h={'sm'} />

				<Input.Wrapper
					size='md'
					label='Quantity'
					error={<ErrorMessage errors={errors} name='quantity' />}
				>
					<NumberInput
						min={1}
						placeholder='1'
						value={watch('quantity')}
						onChange={(e) => setValue('quantity', parseInt(e as string))}
					/>
				</Input.Wrapper>

				<Space h={'sm'} />

				<Input.Wrapper
					size='md'
					label='Amount In Number'
					error={<ErrorMessage errors={errors} name='amountInNumber' />}
				>
					<NumberInput
						min={1}
						placeholder='5050'
						value={watch('amountInNumber')}
						onChange={(e) => setValue('amountInNumber', parseInt(e as string))}
					/>
				</Input.Wrapper>

				<Space h={'sm'} />

				<Input.Wrapper
					size='md'
					label='Amount In Words'
					error={<ErrorMessage errors={errors} name='amountInWords' />}
				>
					<Input
						{...register('amountInWords')}
						placeholder='Five Thousand Fifty Taka'
					/>
				</Input.Wrapper>

				<Space h={'sm'} />

				<Input.Wrapper
					size='md'
					label='Payment Type'
					error={<ErrorMessage errors={errors} name='paymentType' />}
				>
					<Select
						data={Payment__Types__Input__Data}
						placeholder='Online'
						onChange={(e) => setValue('paymentType', e!)}
						value={watch('paymentType')}
					/>
				</Input.Wrapper>

				<Space h={'sm'} />

				<Input.Wrapper
					size='md'
					label='Issue Date'
					error={<ErrorMessage errors={errors} name='issueDate' />}
				>
					<DateInput
						placeholder='Pick a Date'
						onChange={(e) => setValue('issueDate', e!)}
						defaultValue={dayjs(watch(`issueDate`) ?? new Date()) as any}
					/>
				</Input.Wrapper>

				<Space h={'sm'} />

				<Input.Wrapper
					size='md'
					label='Delivery Date'
					error={<ErrorMessage errors={errors} name='deliveryDate' />}
				>
					<DateInput
						placeholder='Pick a Date'
						defaultValue={dayjs(watch(`deliveryDate`) ?? new Date()) as any}
						onChange={(date) => setValue(`deliveryDate`, date!)}

						// onChange={(e) => setValue('deliveryDate', e!)}
						// value={watch('deliveryDate').toISOString()}
					/>
				</Input.Wrapper>

				<Space h={'sm'} />

				<Button
					type='submit'
					fullWidth
					loading={creating__receipt || updating__receipt}
				>
					Save
				</Button>
			</form>
		</div>
	);
};

export default MoneyReceiptCreateForm;

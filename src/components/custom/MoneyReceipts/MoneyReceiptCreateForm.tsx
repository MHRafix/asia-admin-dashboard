import {
	CREATE_MONEY_RECEIPT_MUTATION,
	UPDATE_MONEY_RECEIPT_MUTATION,
} from '@/app/api/gql-api-hooks/money-receipt.query';
import { MoneyReceipt } from '@/app/api/models/money-receipt.model';
import { Notify } from '@/app/config/alertNotification/Notification';
import { useMutation } from '@apollo/client';
import React from 'react';

const MoneyReceiptCreateForm: React.FC<{
	operationType: string;
	receipt?: MoneyReceipt;
	refetch: () => void;
}> = ({ operationType, refetch, receipt }) => {
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
	return <div>{operationType}</div>;
};

export default MoneyReceiptCreateForm;

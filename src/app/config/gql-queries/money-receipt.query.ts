import { gql } from '@apollo/client';

export const Money_Receipt_Query = gql`
	query GET_MONEY_RECEIPTS($input: MoneyReceiptListQueryDto) {
		moneyReceipts(input: $input) {
			nodes {
				_id
				clientName
				address
				email
				contactNumber
				passportNo
				paymentType
				service {
					_id
					title
				}
				amountInWords
				amountInNumber
				serialNo
				mrNo
				quantity
				issueDate
				deliveryDate
				authorizeBy {
					_id
					name
					avatar
					email
				}
				createdAt
				updatedAt
			}
			meta {
				totalCount
				currentPage
				hasNextPage
				totalPages
			}
		}
	}
`;

export const CREATE_MONEY_RECEIPT_MUTATION = gql`
	mutation Create_Money_Receipt($input: CreateMoneyReceiptInput!) {
		createMoneyReceipt(input: $input) {
			_id
		}
	}
`;

export const UPDATE_MONEY_RECEIPT_MUTATION = gql`
	mutation UPDATE_MONEY_RECEIPT($input: UpdateMoneyReceiptInput!) {
		updateMoneyReceipt(input: $input) {
			_id
		}
	}
`;

export const DELETE_MONEY_RECEIPT_MUTATION = gql`
	mutation DELETE_MONEY_RECEIPT($input: CommonMatchInput!) {
		removeMoneyReceipt(input: $input)
	}
`;

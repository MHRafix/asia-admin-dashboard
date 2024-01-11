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
				amountInWords
				amountInNumber
				serviceName
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

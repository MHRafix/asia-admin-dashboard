import { gql } from '@apollo/client';

export const Expenses_List_Query = gql`
	query Expenses_List($input: ExpenseListQueryDto) {
		expenseCalculationList(input: $input) {
			nodes {
				# _id
				title
				description
				amount
			}
		}
	}
`;

export const Expense_Remove_Mutation = gql`
	mutation Remove_Expense($_id: String!) {
		removeExpenseCalculation(_id: $_id)
	}
`;

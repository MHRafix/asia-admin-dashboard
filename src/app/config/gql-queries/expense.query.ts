import { gql } from '@apollo/client';

export const Expenses_List_Query = gql`
	query Expenses_List($input: ExpenseListQueryDto) {
		expenseCalculationList(input: $input) {
			nodes {
				_id
				title
				description
				amount
			}
		}
	}
`;

export const Update_Expense_Mutation = gql`
	mutation Update_Expense($input: UpdateExpenseCalculationInput!) {
		updateExpenseCalculation(updateExpenseCalculationInput: $input)
	}
`;

export const Create_Expense_Mutation = gql`
	mutation Create_Expense($input: ExpenseCalculationInput!) {
		createExpenseCalculation(input: $input)
	}
`;

export const Expense_Remove_Mutation = gql`
	mutation Remove_Expense($_id: String!) {
		removeExpenseCalculation(_id: $_id)
	}
`;

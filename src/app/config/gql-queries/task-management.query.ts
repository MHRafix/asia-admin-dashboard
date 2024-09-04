import { gql } from '@apollo/client';

export const Create_Task_Mutation = gql`
	mutation Create_Task($input: CreateTaskManagementInput!) {
		createTask(input: $input) {
			_id
		}
	}
`;

export const Get_Task_List_Query = gql`
	query Get_Task_List($input: TaskListQueryDto) {
		taskList(input: $input) {
			nodes {
				_id
				client {
					_id
					name
					phone
					email
				}
				taskCreatedBy {
					_id
					name
					avatar
				}
				taskDetails {
					taskName
					taskAssignTo {
						_id
						name
						phone
						avatar
					}
					taskDescription
					issuesDescription
				}
				taskId
				progressStatus
				paymentStatus
				totalBillAmount
				paidBillAmount
				dueAmount
				deadLine
				createdAt
			}
		}
	}
`;

export const Get_Single_Task_Query = gql`
	query Get_Single_Task($input: CommonMatchInput!) {
		task(input: $input) {
			_id
			client {
				_id
				name
				email
			}
			taskCreatedBy {
				_id
				name
				avatar
			}
			taskDetails {
				taskName
				taskAssignTo {
					_id
					name
					avatar
				}
				taskDescription
				issuesDescription
			}
			taskId
			progressStatus
			paymentStatus
			totalBillAmount
			paidBillAmount
			dueAmount
			deadLine
			createdAt
		}
	}
`;

export const Update_Task_Mutation = gql`
	mutation Update_Task($input: UpdateTaskManagementInput!) {
		updateTask(input: $input)
	}
`;

export const Remove_Task_Mutation = gql`
	mutation Remove_Task($input: CommonMatchInput!) {
		removeTask(input: $input)
	}
`;

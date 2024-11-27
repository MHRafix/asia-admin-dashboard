import { gql } from '@apollo/client';

/**
 * Users query
 */

// users query
export const USERS_QUERY = gql`
	query USERS_QUERY($input: UserListQueryDto) {
		users(input: $input) {
			nodes {
				_id
				name
				email
				role
				phone
				avatar
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
export const USERS_QUERY_FOR_DROPDOWN = gql`
	query USERS_QUERY($input: UserListQueryDto) {
		users(input: $input) {
			nodes {
				_id
				name
				email
				role
				phone
				avatar
			}
		}
	}
`;

export const Update_User_And_Employee_Role = gql`
	mutation Update_User_And_Employee_Role(
		$input: UpdateUserAndEmployeeRoleInput!
	) {
		updateUserAndEmployeeRole(input: $input)
	}
`;

// remove user
export const REMOVE_USER = gql`
	mutation REMOVE_CUSTOMER($id: String) {
		removeUser(input: { key: "_id", operator: eq, value: $id })
	}
`;

// remove bulk customers
export const BULK_REMOVE_USER = gql`
	mutation REMOVE_BULK_CUSTOMERS($uIds: [String!]!) {
		bulkRemoveUser(uIds: $uIds)
	}
`;

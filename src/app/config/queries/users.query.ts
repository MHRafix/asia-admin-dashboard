import { gql } from '@apollo/client';

/**
 * Users query
 */

// users query
export const USERS_QUERY = gql`
	query USERS_QUERY($page: Int, $limit: Int) {
		users(input: { page: $page, limit: $limit, sort: DESC, sortBy: "_id" }) {
			nodes {
				_id
				name
				email
				role
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

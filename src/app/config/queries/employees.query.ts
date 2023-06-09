import { gql } from '@apollo/client';

export const EMPLOYEES_QUERY = gql`
	query EMPLOYEES_QUERY($page: Int, $limit: Int) {
		teams(input: { page: $page, limit: $limit }) {
			nodes {
				_id
				name
				post
				avatar
				email
				phone
				facebook
				linkedin
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

// remove employee
export const REMOVE_EMPLOYEE = gql`
	mutation REMOVE_EMPLOYEE($id: String) {
		removeTeam(input: { key: "_id", operator: eq, value: $id })
	}
`;

// remove bulk employee
export const BULK_REMOVE_EMPLOYEE = gql`
	mutation BULK_REMOVE_EMPLOYEE($uIds: [String!]!) {
		bulkRemoveTeam(uIds: $uIds)
	}
`;

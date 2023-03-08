import { gql } from '@apollo/client';

/**
 * Booking query
 */
// bookings get query
export const PACAKGE_BOOKINGS_QUERY = gql`
	query PACAKGE_BOOKINGS_QUERY($page: Int, $limit: Int, $sortBy: String) {
		bookings(
			input: { page: $page, limit: $limit, sort: DESC, sortBy: $sortBy }
		) {
			nodes {
				_id
				name
				email
				phone
				packageId
				status
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

// booking delete query
export const DELETE_BOOKING_MUTATION = gql`
	mutation DELETE_BOOKING_MUTATION($id: String!) {
		removeBooking(input: { key: "_id", operator: eq, value: $id })
	}
`;

// bulk booking query
export const BULK_REMOVE_BOOKING = gql`
	mutation BULK_REMOVE_BOOKING($uIds: [String!]!) {
		removeBulkBooking(uIds: $uIds)
	}
`;

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
		removeBulkUser(uIds: $uIds)
	}
`;

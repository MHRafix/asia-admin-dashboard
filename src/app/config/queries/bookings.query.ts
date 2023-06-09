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
				customerDetails {
					name
					email
					phone
				}
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
	mutation REMOVE_BULK_BOOKINGS($uIds: [String!]!) {
		bulkRemoveBooking(uIds: $uIds)
	}
`;

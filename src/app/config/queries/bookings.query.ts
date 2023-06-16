import { gql } from '@apollo/client';

/**
 * Booking query
 */
// bookings get query
export const PACKAGE_BOOKINGS_QUERY = gql`
	query PACKAGE_BOOKINGS_QUERY($page: Int, $limit: Int, $sortBy: String) {
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
				package {
					packageTitle
					regularPrice
					salePrice
					saleStatus
					isPublished
					packageStatus
					countDown {
						bookingStart
						bookingEnd
					}
					thumbnail
					description
					carouselThumbnails
				}
				transactionId
				bookingId
				paymentDetails {
					paymentStatus
					totalAmount
					paidFrom
					paymentMethod
					paymentDateTime
				}
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

// update booking status
export const UPDATE_BOOKING_STATUS = gql`
	mutation UPDATE_BOOKING_STATUS(
		$id: ID
		$status: BOOKING_STATUS
		$paymentDetails: PaymentDetailsInput
	) {
		updateBooking(
			input: { _id: $id, status: $status, paymentDetails: $paymentDetails }
		) {
			_id
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

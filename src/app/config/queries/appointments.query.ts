import { gql } from '@apollo/client';
/**
 * appointments query
 */

export const APPOINTMENTS_QUERY = gql`
	query APPOINTMENTS_QUERY($page: Int, $limit: Int, $sortBy: String) {
		appointments(
			input: { page: $page, limit: $limit, sort: DESC, sortBy: $sortBy }
		) {
			nodes {
				_id
				name
				email
				phone
				serviceId
				status
				subService
				profession
				clientQuestions {
					qTitle
					qDesc
				}
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

export const UPDATE_APPOINTMENT = gql`
	mutation UPDATE_APPOINTMENT($payload: UpdateAppointmentInput!) {
		updateAppointment(input: $payload) {
			_id
		}
	}
`;

// booking delete query
export const DELETE_APPOINTMENT_MUTATION = gql`
	mutation DELETE_APPOINTMENT_MUTATION($id: String!) {
		removeAppointment(input: { key: "_id", operator: eq, value: $id })
	}
`;

// bulk booking query
export const BULK_REMOVE_APPOINTMENT = gql`
	mutation BULK_REMOVE_APPOINTMENT($uIds: [String!]!) {
		bulkRemoveAppointment(uIds: $uIds)
	}
`;

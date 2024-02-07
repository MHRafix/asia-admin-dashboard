import { gql } from '@apollo/client';
/**
 * appointments query
 */

export const APPOINTMENTS_QUERY = gql`
	query APPOINTMENTS_QUERY($input: AppointmentListQueryDto) {
		appointments(input: $input) {
			nodes {
				_id
				name
				email
				phone
				service {
					_id
					title
					thumbnail
				}
				status
				subService
				profession
				clientQuestions {
					qTitle
					qDesc
				}
				createdAt
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

// appointment delete query
export const DELETE_APPOINTMENT_MUTATION = gql`
	mutation DELETE_APPOINTMENT_MUTATION($id: String!) {
		removeAppointment(input: { key: "_id", operator: eq, value: $id })
	}
`;

// bulk appointment query
export const BULK_REMOVE_APPOINTMENT = gql`
	mutation BULK_REMOVE_APPOINTMENT($uIds: [String!]!) {
		bulkRemoveAppointment(uIds: $uIds)
	}
`;

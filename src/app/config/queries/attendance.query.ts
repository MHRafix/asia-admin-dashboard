import { gql } from '@apollo/client';

export const GET_ATTENDANCES_QUERY = gql`
	query Attendances($input: AttendanceQueryDto) {
		Attendances(input: $input) {
			nodes {
				_id
				verifyBy {
					_id
					name
					avatar
				}
				attendee {
					_id
					name
					avatar
				}
				status
				createdAt
				note
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

export const CHECK_IS_ELIGIBLE_FOR_ATTENDANCE = gql`
	query Attendances($input: AttendanceQueryDto) {
		Attendances(input: $input) {
			nodes {
				_id
				createdAt
			}
		}
	}
`;

export const CREATE_ATTENDANCE_MUTATION = gql`
	mutation CreateAttendance($input: CreateAttendanceInput!) {
		createAttendance(input: $input)
	}
`;

export const UPDATE_ATTENDANCE_MUTATION = gql`
	mutation UpdateAttendance($input: UpdateAttendanceInput!) {
		updateAttendance(input: $input)
	}
`;

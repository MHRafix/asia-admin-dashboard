import { gql } from '@apollo/client';

export const LOGIN_QUERY = gql`
	mutation SIGNIN($email: String!, $password: String!) {
		adminSignIn(input: { email: $email, password: $password }) {
			_id
			accessToken
		}
	}
`;

export const GET_LOGGEDIN_USER = gql`
	query GET_LOGGEDIN_USER($userId: String!) {
		user(input: { key: "_id", operator: eq, value: $userId }) {
			_id
			name
			email
			role
			avatar
			accessToken
			phone
		}
	}
`;

import { gql } from '@apollo/client';

export const UPDATE_USER_DETAILS = gql`
	mutation UPDATE_USER_DETAILS(
		$userId: String!
		$name: String
		$avatar: String
		$phone: String
	) {
		updateUser(
			input: { _id: $userId, name: $name, avatar: $avatar, phone: $phone }
		) {
			_id
		}
	}
`;

export const MANAGE_USER_ACCESS_MUTATION = gql`
	mutation MANAGE_USER_ACCESS($input: UpdateUserInput!) {
		updateUser(input: $input) {
			_id
		}
	}
`;

export const CREATE_USER_MUTATION = gql`
	mutation CREATE_USER($input: CreateUserInput!) {
		signUp(input: $input) {
			_id
		}
	}
`;

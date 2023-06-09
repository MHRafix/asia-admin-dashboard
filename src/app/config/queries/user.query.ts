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

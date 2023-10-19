import { gql } from '@apollo/client';

export const GET_CLIENTS_QUERY = gql`
	query Get_Clients($input: ClientDataListQueryDto) {
		Clients(input: $input) {
			nodes {
				_id
				name
				address
				email
				facebook
				phone
			}
		}
	}
`;

import { gql } from '@apollo/client';

export const GET_CLIENTS_QUERY = gql`
	query Get_Clients($input: ClientDataListQueryDto) {
		Clients(input: $input) {
			nodes {
				_id
				name
				email
				phone
			}
		}
	}
`;

export const Create_Client_Data = gql`
	mutation Create_Client_Data($payload: CreateClientDataInput!) {
		createClientData(input: $payload) {
			_id
		}
	}
`;

export const Update_Client_Data = gql`
	mutation Update_Client_Data($payload: UpdateClientDataInput!) {
		updateClientData(input: $payload) {
			_id
		}
	}
`;

export const Remove_Client_Data = gql`
	mutation Delete_Client_Data($payload: CommonMatchInput!) {
		removeClientData(input: $payload)
	}
`;

import { gql } from '@apollo/client';

export const GET_SERVICE_QUERY = gql`
	query GET_SERVICE_QUERY($page: Int!, $limit: Int) {
		services(input: { page: $page, limit: $limit }) {
			nodes {
				_id
				title
				shortDesc
				desc
				preRequirements
				price
				meetTime
			}
		}
	}
`;

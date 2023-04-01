import { gql } from '@apollo/client';

export const CREATE_SERVICE = gql`
	mutation CREATE_SERVICE(
		$title: String!
		$shortDesc: String!
		$desc: String!
		$price: Float!
	) {
		createService(
			input: {
				title: $title
				shortDesc: $shortDesc
				desc: $desc
				price: $price
			}
		) {
			_id
		}
	}
`;

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
				isCustomizeable
			}
		}
	}
`;

export const GET_SINGLE_SERVICE = gql`
	query GET_SINGLE_SERVICE($id: String!) {
		service(input: { key: "_id", operator: eq, value: $id }) {
			_id
			title
			shortDesc
			desc
			preRequirements
			price
			isCustomizeable
		}
	}
`;

export const UPDATE_SERVICE = gql`
	mutation UPDATE_SERVICE(
		$id: String!
		$title: String
		$shortDesc: String
		$desc: String
		$price: Float
		$preRequirements: String
		$isCustomizeable: Boolean
	) {
		updateService(
			input: {
				_id: $id
				title: $title
				shortDesc: $shortDesc
				desc: $desc
				price: $price
				preRequirements: $preRequirements
				isCustomizeable: $isCustomizeable
			}
		) {
			_id
		}
	}
`;

export const DELETE_SERVICE = gql`
	mutation DELETE_SERVICE($id: String!) {
		removeService(input: { key: "_id", operator: eq, value: $id })
	}
`;

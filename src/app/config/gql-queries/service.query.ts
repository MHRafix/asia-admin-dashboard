import { gql } from '@apollo/client';

export const CREATE_SERVICE = gql`
	mutation CREATE_SERVICE($input: CreateServiceInput!) {
		createService(input: $input) {
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
				thumbnail
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
			thumbnail
			banner
		}
	}
`;

export const UPDATE_SERVICE = gql`
	mutation UPDATE_SERVICE(
		$id: String!
		$title: String
		$shortDesc: String
		$desc: String
		$thumbnail: String
		$banner: String
	) {
		updateService(
			input: {
				_id: $id
				title: $title
				shortDesc: $shortDesc
				desc: $desc
				thumbnail: $thumbnail
				banner: $banner
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

export const GET_SERVICES_FOR_INPUT = gql`
	query {
		services(input: { page: 1, limit: 1000 }) {
			nodes {
				_id
				title
			}
		}
	}
`;

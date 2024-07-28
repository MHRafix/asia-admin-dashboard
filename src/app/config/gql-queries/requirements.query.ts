import { gql } from '@apollo/client';

export const CREATE_REQUIREMENT = gql`
	mutation CREATE_REQUIREMENT($input: CreateVisaRequirementInput!) {
		createVisaReq(input: $input) {
			_id
		}
	}
`;
export const UPDATE_REQUIREMENT = gql`
	mutation UPDATE_REQUIREMENT($input: UpdateVisaRequirementInput!) {
		updateVisaReq(input: $input)
	}
`;
export const REMOVE_REQUIREMENT = gql`
	mutation REMOVE_REQUIREMENT($input: CommonMatchInput!) {
		removeVisaReq(input: $input)
	}
`;

export const VISA_REQUIREMENTS = gql`
	query Requirements($input: VisaReqListQueryDto) {
		VisaRequirements(input: $input) {
			nodes {
				_id
				status
				title
				description
				destinationCountry
				image
				cover
				visaType
				createdAt
				updatedAt
				author {
					name
					avatar
				}
			}
		}
	}
`;
export const VISA_REQUIREMENT = gql`
	query Requirement($input: CommonMatchInput!) {
		VisaRequirement(input: $input) {
			_id
			status
			title
			description
			destinationCountry
			image
			cover
			visaType
			createdAt
			updatedAt
			author {
				name
				avatar
			}
		}
	}
`;

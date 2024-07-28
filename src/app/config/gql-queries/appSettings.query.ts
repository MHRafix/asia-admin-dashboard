import { gql } from '@apollo/client';

export const CREATE_APP_SETTINGS = gql`
	mutation CREATE_APP_SETTINGS(
		$logo: String
		$visaCategories: [String!]
		$countriesVisa: [CountriesVisaInput!]
		$branches: [BranchInput!]
	) {
		createAppSetting(
			input: {
				logo: $logo
				visaCategories: $visaCategories
				countriesVisa: $countriesVisa
				branches: $branches
			}
		) {
			_id
		}
	}
`;

export const APP_SETTINGS_QUERY = gql`
	query {
		appSettings(input: { page: 1, limit: 1 }) {
			nodes {
				_id
				logo
				visaCategories
				countriesVisa {
					country
					visaCategory
				}
				branches {
					branchName
					email
					phone
					address
				}
			}
		}
	}
`;

export const UPDATE_APP_SETTINGS = gql`
	mutation UPDATE_APP_SETTINGS(
		$id: String!
		$logo: String
		$visaCategories: [String!]
		$countriesVisa: [CountriesVisaInput!]
		$branches: [BranchInput!]
	) {
		updateAppSettings(
			input: {
				_id: $id
				logo: $logo
				visaCategories: $visaCategories
				countriesVisa: $countriesVisa
				branches: $branches
			}
		) {
			_id
		}
	}
`;

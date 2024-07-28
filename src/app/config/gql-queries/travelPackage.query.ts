import { gql } from '@apollo/client';

export const CREATE_TRAVEL_PACKAGE = gql`
	mutation CREATE_TRAVEL_PACKAGE($input: CreateTravelPackageInput!) {
		createTravelPackage(input: $input) {
			_id
		}
	}
`;

export const GET_TRAVEL_PACKAGES = gql`
	query TRAVEL_PACKAGES($input: TravelPackageListQueryDto) {
		travelPackages(input: $input) {
			nodes {
				_id
				packageTitle
				regularPrice
				salePrice
				saleStatus
				isPublished
				packageStatus
				thumbnail
				countDown {
					bookingStart
					bookingEnd
				}
				destination {
					name
					lat
					lng
				}
			}
		}
	}
`;

export const GET_SINGLE_TRAVEL_PACKAGE = gql`
	query GET_SINGLE_PACKAGE($packageId: String) {
		travelPackage(input: { key: "_id", operator: eq, value: $packageId }) {
			_id
			packageTitle
			regularPrice
			salePrice
			saleStatus
			isPublished
			packageStatus
			thumbnail
			description
			shortDescription
			countDown {
				bookingStart
				bookingEnd
			}
			destination {
				name
				lat
				lng
			}
			departureFrom {
				name
				lat
				lng
			}
			ratingsAndReviews {
				rating
				email
				message
			}
			travelers {
				travelerEmail
			}
			transportation {
				tourBy
				departureDate
				departureTime
				departureStation
				destinationStation
				arrivalTime
				arrivalDate
				transportName
				stops
				journeyBreak
			}
			carouselThumbnails
		}
	}
`;

export const Update_Tour_Package = gql`
	mutation UPDATE_TRAVEL_PACKAGE_MUTATION($input: UpdateTravelPackageInput!) {
		updateTravelPackage(input: $input) {
			_id
		}
	}
`;

export const Delete_Tour_Package = gql`
	mutation Delete_Package($payload: CommonMatchInput!) {
		removeTravelPackage(input: $payload)
	}
`;

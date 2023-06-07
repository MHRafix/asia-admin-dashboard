import { gql } from '@apollo/client';

export const CREATE_TRAVEL_PACKAGE = gql`
	mutation CREATE_TRAVEL_PACKAGE(
		$packageTitle: String!
		$regularPrice: Float!
		$salePrice: Float
		$countDown: CountDownTimerInput
		$thumbnail: String
		$description: String
		$shortDescription: String
		$carouselThumbnails: [String!]
		$saleStatus: SALE_STATUS
		$packageStatus: String
		$isPublished: Boolean!
	) {
		createTravelPackage(
			input: {
				packageTitle: $packageTitle
				regularPrice: $regularPrice
				salePrice: $salePrice
				countDown: $countDown
				thumbnail: $thumbnail
				description: $description
				shortDescription: $shortDescription
				carouselThumbnails: $carouselThumbnails
				saleStatus: $saleStatus
				isPublished: $isPublished
				packageStatus: $packageStatus
			}
		) {
			_id
		}
	}
`;

export const GET_TRAVEL_PACKAGES = gql`
	query TRAVEL_PACKAGES($page: Int!, $limit: Int) {
		travelPackages(
			input: {
				page: $page
				limit: $limit
				sort: DESC
				sortBy: "_id"
				where: { key: "packageStatus", operator: eq, value: "UPCOMING" }
			}
		) {
			nodes {
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
					destination
					lat
					lng
				}
				departureFrom {
					departureFrom
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
					departureFrom
					destination
					startAt
					transportName
					stops
					journeyBreak
					endAt
				}
			}
		}
	}
`;

export const GET_SINGLE_TRAVEL_PACKAGES = gql`
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
		}
	}
`;

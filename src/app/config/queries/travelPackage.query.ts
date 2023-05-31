import { gql } from '@apollo/client';

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
				destination
				countDown {
					bookingStart
					bookingEnd
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
			bookingStart
			bookingEnd
			description
			shortDescription
			destination
			travelOutline {
				departureFrom
				destinationTo
				startAt
				endAt
				packageIn
				description
				breakfast
				lunch
				normalSnacks
				dinner
				otherFeatures
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
`;

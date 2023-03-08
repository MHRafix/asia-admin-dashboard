import { BOOKING_TABLE_DEFAULT_SORTBY } from '@/app/config/configuration';

export const Query_Variable = (
	queryPage: string,
	queryLimit: string,
	page: number,
	limit: number,
	sortBy: string = BOOKING_TABLE_DEFAULT_SORTBY
) => {
	return {
		variables: {
			page: parseInt(queryPage as string) || page,
			limit: parseInt(queryLimit + '') || limit,
			sortBy,
		},
	};
};

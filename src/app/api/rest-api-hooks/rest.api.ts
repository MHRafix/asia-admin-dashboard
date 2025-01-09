import axios from 'axios';
import {
	IGrandRevinewOverviewData,
	ITaskRevinewDataType,
} from '../models/dashboard.model';

export const getCities = async (placeName: string) => {
	const { data } = await axios.get(
		'https://world-geo-data.p.rapidapi.com/countries/Bangladesh',
		{
			headers: {
				'X-Api-Key': process.env.NEXT_PUBLIC_CITIES_API_KEY,
				'X-RapidAPI-Host': 'world-geo-data.p.rapidapi.com',
			},
		}
	);
};

export const useGetDashboardAnalyticsData = () => {
	// const userInfo = Cookies.get('user') && JSON.parse(Cookies.get('user')!);
	// const overViewDataApi = (query: IDashboardOverviewQueryParams) =>
	// 	axios.get<IDashboardOverview>(
	// 		`${process.env.NEXT_PUBLIC_REST_API_URL}/dashboard/overview`,
	// 		{
	// 			params: query,
	// 			headers: {
	// 				Authorization: `Bearer ${userInfo?.accessToken}`,
	// 			},
	// 		}
	// 	);

	// take the date only from date string

	// task revenue by employee
	const taskRevinewByEmployeeApi = (
		body: ITaskRevinewApiBodyType,
		filterDate: Date[]
	) => {
		const startDate = filterDate[0]?.toISOString().split('T')[0];
		const endDate = filterDate[1]?.toISOString().split('T')[0];

		return axios.post<ITaskRevinewDataType[]>(
			`${process.env.NEXT_PUBLIC_REST_API_URL}/dashboard/task-revinew-by-employee?startDate=${startDate}&endDate=${endDate}`,
			body
		);
	};

	// grand revenue api
	const taskGrandRevinewApi = (filterDate: Date[]) => {
		const startDate = filterDate[0]?.toISOString().split('T')[0];
		const endDate = filterDate[1]?.toISOString().split('T')[0];
		return axios.get<IGrandRevinewOverviewData>(
			`${process.env.NEXT_PUBLIC_REST_API_URL}/dashboard/task-grand-revinew?startDate=${startDate}&endDate=${endDate}`
		);
	};
	return { taskRevinewByEmployeeApi, taskGrandRevinewApi };
};

export interface IDashboardOverviewQueryParams {
	firstDate: string;
	lastDate: string;
}

export interface ITaskRevinewApiBodyType {
	employeeIds?: string[];
}

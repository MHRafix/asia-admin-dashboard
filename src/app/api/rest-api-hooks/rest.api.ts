import axios from 'axios';
import Cookies from 'js-cookie';
import {
	IDashboardOverview,
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
	const userInfo = Cookies.get('user') && JSON.parse(Cookies.get('user')!);
	const overViewDataApi = (query: IDashboardOverviewQueryParams) =>
		axios.get<IDashboardOverview>(
			`${process.env.NEXT_PUBLIC_REST_API_URL}/dashboard/overview`,
			{
				params: query,
				headers: {
					Authorization: `Bearer ${userInfo?.accessToken}`,
				},
			}
		);

	const taskRevinewDataApi = (body: ITaskRevinewApiBodyType) =>
		axios.post<ITaskRevinewDataType[]>(
			`${process.env.NEXT_PUBLIC_REST_API_URL}/dashboard/task-revinew`,
			body
		);

	return { overViewDataApi, taskRevinewDataApi };
};

export interface IDashboardOverviewQueryParams {
	firstDate: string;
	lastDate: string;
}

export interface ITaskRevinewApiBodyType {
	employeeIds?: string[];
}

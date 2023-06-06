import axios from 'axios';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { IDashboardOverview } from '../models/dashboard.model';

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
	console.log(data);
};

export const useGetDashboardOverviewData = () => {
	const userInfo = Cookies.get('user') && JSON.parse(Cookies.get('user')!);
	const [isLoading, onChangeLoading] = useState(true);
	const [data, onChangeData] = useState<IDashboardOverview>();
	// if (userInfo?.accessToken) {

	useEffect(() => {
		onChangeLoading(true);
		if (userInfo?.accessToken) {
			axios
				.get(`${process.env.NEXT_PUBLIC_REST_API_URL}/dashboard/overview`, {
					params: {
						firstDate: '2023-05-20',
						lastDate: '2023-06-20',
					},
					headers: {
						Authorization: `Bearer ${userInfo?.accessToken}`,
					},
				})
				.then((response) => {
					onChangeData(response.data);
					onChangeLoading(false);
				});
		}
	}, [userInfo.accessToken]);

	return {
		isLoading,
		data,
	};
};

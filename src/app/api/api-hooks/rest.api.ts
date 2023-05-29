import axios from 'axios';

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

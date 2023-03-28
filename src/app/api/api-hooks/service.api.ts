import { GET_SERVICE_QUERY } from '@/app/config/queries/service.query';
import { useQuery } from '@apollo/client';
import { IService } from '../models/service.model';

export const useGetServices = () => {
	const { data, loading: getingServices } = useQuery<{
		services: { nodes: IService[] };
	}>(GET_SERVICE_QUERY, {
		variables: {
			page: 1,
			limit: 100,
		},
	});
	return { services: data?.services?.nodes, getingServices };
};

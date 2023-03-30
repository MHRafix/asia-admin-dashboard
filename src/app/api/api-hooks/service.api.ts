import {
	GET_SERVICE_QUERY,
	GET_SINGLE_SERVICE,
} from '@/app/config/queries/service.query';
import { useQuery } from '@apollo/client';
import { IService } from '../models/service.model';

export const useGetServices = () => {
	const {
		data,
		loading: getingServices,
		refetch: refetchServices,
	} = useQuery<{
		services: { nodes: IService[] };
	}>(GET_SERVICE_QUERY, {
		variables: {
			page: 1,
			limit: 100,
		},
	});
	return { services: data?.services?.nodes, getingServices, refetchServices };
};

export const useGetService = (id: string) => {
	const {
		data,
		loading: getingService,
		refetch: refetchService,
	} = useQuery<{
		service: IService;
	}>(GET_SINGLE_SERVICE, {
		variables: {
			id,
		},
	});
	return { service: data?.service, getingService, refetchService };
};

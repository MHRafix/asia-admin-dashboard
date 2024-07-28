import { Notify } from '@/app/config/alertNotification/Notification';
import {
	GET_SERVICE_QUERY,
	GET_SINGLE_SERVICE,
} from '@/app/config/gql-queries/service.query';
import { useMutation, useQuery } from '@apollo/client';
import { UPDATE_SERVICE } from '../../config/gql-queries/service.query';
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

export const useUpdateService = (actionFunc: () => void) => {
	const [updateService, { loading: updatingService }] = useMutation(
		UPDATE_SERVICE,
		Notify({
			sucTitle: 'Service details updated successfully!',
			errMessage: 'Try again to update service details.',
			action: actionFunc,
		})
	);
	return { updateService, updatingService };
};

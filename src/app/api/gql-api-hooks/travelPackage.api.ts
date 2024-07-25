import { SortType } from '@/app/config/gql';
import {
	GET_SINGLE_TRAVEL_PACKAGE,
	GET_TRAVEL_PACKAGES,
} from '@/app/config/queries/travelPackage.query';
import { useQuery } from '@apollo/client';
import { ITravelPackage } from '../models/travelPackage.model';

export const useGetTravelPackages = () => {
	const {
		data,
		loading,
		refetch: refetchPackages,
	} = useQuery<{ travelPackages: { nodes: ITravelPackage[] } }>(
		GET_TRAVEL_PACKAGES,
		{
			variables: {
				input: {
					page: 1,
					limit: 100,
					sort: SortType.Desc,
					sortBy: '_id',
				},
			},
		}
	);
	return { packages: data?.travelPackages?.nodes, loading, refetchPackages };
};

export const useGetSinglePackage = (id: string) => {
	const {
		data,
		loading,
		refetch: refetchPackage,
	} = useQuery<{ travelPackage: ITravelPackage }>(GET_SINGLE_TRAVEL_PACKAGE, {
		variables: {
			packageId: id,
		},
	});
	return { singlePackage: data?.travelPackage, loading, refetchPackage };
};

import { Notify } from '@/app/config/alertNotification/Notification';
import {
	UPDATE_REQUIREMENT,
	VISA_REQUIREMENT,
	VISA_REQUIREMENTS,
} from '@/app/config/gql-queries/requirements.query';
import { MatchOperator } from '@/app/config/gql-types';
import { useMutation, useQuery } from '@apollo/client';
import { IVisaReq } from '../models/visaRequirements.model';

export const useGetRequirements = () => {
	const {
		data,
		loading: gettingRequirements,
		refetch: refetchRequirements,
	} = useQuery<{
		VisaRequirements: { nodes: IVisaReq[] };
	}>(VISA_REQUIREMENTS, {
		variables: {
			page: 1,
			limit: 100,
		},
	});
	return {
		requirements: data?.VisaRequirements?.nodes,
		gettingRequirements,
		refetchRequirements,
	};
};

export const useGetRequirement = (id: string) => {
	const {
		data,
		loading: gettingRequirement,
		refetch: refetchRequirement,
	} = useQuery<{
		VisaRequirement: IVisaReq;
	}>(VISA_REQUIREMENT, {
		variables: {
			input: {
				key: '_id',
				operator: MatchOperator.Eq,
				value: id,
			},
		},
	});
	return {
		requirement: data?.VisaRequirement,
		gettingRequirement,
		refetchRequirement,
	};
};

export const useUpdateRequirement = (actionFunc: () => void) => {
	const [updateRequirement, { loading: updatingRequirement }] = useMutation(
		UPDATE_REQUIREMENT,
		Notify({
			sucTitle: 'Visa requirements updated successfully!',
			errMessage: 'Try again to update visa requirements details.',
			action: actionFunc,
		})
	);
	return { updateRequirement, updatingRequirement };
};

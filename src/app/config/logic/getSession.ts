import { useQuery } from '@apollo/client';
import Cookies from 'js-cookie';
import { GET_LOGGEDIN_USER } from '../queries/auth.query';
import { IUser } from '@/app/api/models/users.model';

export const useGetSession = () => {
	const userInfo = Cookies.get('user') && JSON.parse(Cookies.get('user')!);
	const {
		data,
		loading,
		refetch: refetchDetails,
	} = useQuery<{ user: IUser }>(GET_LOGGEDIN_USER, {
		variables: {
			userId: userInfo?._id,
		},
	});
	return { user: data?.user, loading, refetchDetails };
};

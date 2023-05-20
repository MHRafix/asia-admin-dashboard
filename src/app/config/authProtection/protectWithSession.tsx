import { Loader } from '@mantine/core';
import { useRouter } from 'next/router';
import { ComponentType, FC, useEffect } from 'react';
import { useGetSession } from '../logic/getSession';

const protectWithSession = <P extends object>(
	Component: ComponentType<P>
): FC<P> => {
	const WithAuthenticationRequired: FC<P> = (props) => {
		const router = useRouter();

		const { loading, user } = useGetSession();

		useEffect(() => {
			if (user == null && !loading) {
				router.push('/auth/login');
			}
		}, [user, loading, router]);

		if (loading || user == null) {
			return (
				<div className='flex justify-center w-full h-screen items-center'>
					<Loader color='violet' size='sm' />
				</div>
			);
		}

		return <Component {...props} />;
	};

	return WithAuthenticationRequired;
};

export default protectWithSession;
